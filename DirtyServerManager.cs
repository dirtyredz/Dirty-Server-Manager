using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.ComponentModel;
using System.IO.Compression;
using IniParser;
using IniParser.Model;


namespace DSM
{
    class DSM
    {

        public Process myProcess;
        static System.Threading.Timer StatusTimer;
        static System.Threading.Timer SectorTimer;
        static System.Threading.Timer PlayerTimer;
        static System.Threading.Timer AllianceTimer;
        static System.Threading.Timer FactionTimer;
        public Process phpWeb = new Process();
        public ManualResetEvent MRE;
        public Config DSMConfig;

        public static void Main(string[] args)
        {
            Console.Title = "Dirty Server Manager";
            DSM MyProgram = new DSM();
            MyProgram.Start();
        }
        private void Start()
        {
            DSMConfig = new Config("manager-config.ini");
            StartWeb();

            bool Reading = true;
            while (Reading)
            {
                if (Console.KeyAvailable)
                {
                    string inputText = Console.ReadLine();
                    //myProcess.StandardInput.WriteLine(inputText);
                    //myProcess.StandardInput.Flush();
                    if (!inputText.StartsWith("/"))
                    {
                        Console.WriteLine("Type /help for available commands.");
                        //start,quit,help,restart,stop
                        continue;
                    }

                    switch (inputText)
                    {
                        case "/install":
                            {
                                DownloadFile("http://windows.php.net/downloads/releases/php-7.2.0-Win32-VC15-x86.zip", @"php-7.2.0-Win32-VC15-x86.zip","php.exe","php");
                                SteamCmdUpdate();
                                StartWeb();
                                break;
                            }
                        case "/update":
                            {
                                SteamCmdUpdate();
                                break;
                            }
                        case "/start":
                            {
                                StartAvorion();
                                break;
                            }
                        case "/stop":
                            {
                                StopAvorion();
                                break;
                            }
                        case "/restart":
                            {
                                StopAvorion();
                                StartAvorion();
                                break;
                            }
                        case "/quit":
                            {
                                StopAvorion();
                                Reading = false;
                                break;
                            }
                        case "/get_player_data":
                            {
                                RunPHPCommand("get_player_data");
                                break;
                            }
                        case "/get_alliance_data":
                            {
                                RunPHPCommand("get_alliance_data");
                                break;
                            }
                        case "/get_sector_data":
                            {
                                RunPHPCommand("get_sector_data");
                                break;
                            }
                        case "/get_faction_data":
                            {
                                RunPHPCommand("get_faction_data");
                                break;
                            }
                        case "/help":
                            {
                                Console.WriteLine("Available Commands: /status,/stop,/quit,/restart,/help");
                                break;
                            }
                        default:
                            {
                                RconCmd(inputText);
                                break;
                            }
                    }
                }
            }

            phpWeb.CloseMainWindow();
            phpWeb.Kill();
            Console.WriteLine("Dirty Server Manager, has shut down! Press any key to continue.");
            Console.ReadKey();
        }
        
        public void DownloadFile(string URL, string DownloadFileName, string FileName, string FilePath)
        {
            DsmWriteLine("Downloading " + DownloadFileName + " please wait....");

            if (File.Exists(FilePath + "/" + FileName))
            {
                DsmWriteLine(FileName + " already exsists!");
                return;
            }

            MRE = new ManualResetEvent(false);
            MRE.Reset();

            WebClient myWebClient = new WebClient();
            myWebClient.DownloadFileCompleted += new AsyncCompletedEventHandler(DownloadFileCallback);
            myWebClient.DownloadProgressChanged += new DownloadProgressChangedEventHandler(DownloadProgressCallback);
            myWebClient.DownloadFileAsync(new Uri(URL), DownloadFileName);

            MRE.WaitOne();

            ZipFile.ExtractToDirectory(DownloadFileName, FilePath);
        }

        public void SteamCmdUpdate()
        {

            bool Beta = DSMConfig.GetBool("Avorion Config", "BETA");

            Process SteamCmd = new Process();
            SteamCmd.StartInfo.UseShellExecute = false;
            //myProcess.StartInfo.RedirectStandardOutput = true;
            //myProcess.StartInfo.RedirectStandardInput = false;
            //.StartInfo.RedirectStandardError = true;
            if (!File.Exists(@"steamcmd\\steamcmd.exe"))
            {
                DownloadFile("https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip","steamcmd.zip","steamcmd.exe","steamcmd");
            }

            SteamCmd.StartInfo.FileName = "steamcmd\\steamcmd.exe";
            if (Beta)
            {
                SteamCmd.StartInfo.Arguments = "+login anonymous +force_install_dir ..\\serverfiles +app_update 565060 -beta beta validate +quit";
                DsmWriteLine("Installing/Updating Avorion Beta");
            }
            else
            {
                SteamCmd.StartInfo.Arguments = "+login anonymous +force_install_dir ..\\serverfiles +app_update 565060 validate +quit";
                DsmWriteLine("Installing/Updating Avorion");
            }
            //myProcess.OutputDataReceived += AvorionCaptureOutput;
            SteamCmd.StartInfo.CreateNoWindow = false;
            //myProcess.ErrorDataReceived += AvorionCaptureError;
            //myProcess.EnableRaisingEvents = true;
            //myProcess.Exited += new EventHandler(ProcessOnExited);
            SteamCmd.Start();
            //myProcess.BeginOutputReadLine();
            //myProcess.BeginErrorReadLine();
            SteamCmd.WaitForExit();
            SteamCmd.Close();
        }

        public void DownloadFileCallback(object sender, AsyncCompletedEventArgs e)
        {
            DsmWriteLine("SteamCmd finished downloading.");
            System.Threading.Thread.Sleep(5000);
            MRE.Set();
        }

        public void DownloadProgressCallback(object sender, DownloadProgressChangedEventArgs e)
        {
            // Displays the operation identifier, and the transfer progress.
            DsmWriteLine("    downloaded {0} of {1} bytes. {2} % complete...",
                e.BytesReceived,
                e.TotalBytesToReceive,
                e.ProgressPercentage);
        }

        public void StopTimers()
        {
            DsmWriteLine("Stopping DSM Timers.");
            StatusTimer.Dispose();
            SectorTimer.Dispose();
            PlayerTimer.Dispose();
            AllianceTimer.Dispose();
            FactionTimer.Dispose();
        }

        public void StartTimers()
        {
            DsmWriteLine("Initializing DSM Timers.");
            StatusTimer = new System.Threading.Timer(new System.Threading.TimerCallback(StatusTimer_Elapsed), null, GetInterval(5), Timeout.Infinite);
            SectorTimer = new System.Threading.Timer(new System.Threading.TimerCallback(SectorTimer_Elapsed), null, GetInterval(60), Timeout.Infinite);
            PlayerTimer = new System.Threading.Timer(new System.Threading.TimerCallback(PlayerTimer_Elapsed), null, GetInterval(30), Timeout.Infinite);
            AllianceTimer = new System.Threading.Timer(new System.Threading.TimerCallback(AllianceTimer_Elapsed), null, GetInterval(30), Timeout.Infinite);
            FactionTimer = new System.Threading.Timer(new System.Threading.TimerCallback(FactionTimer_Elapsed), null, GetInterval(30), Timeout.Infinite);
        }

        public void StartAvorion()
        {
            DsmWriteLine("Starting Avorion.");
            Directory.SetCurrentDirectory(@"serverfiles");
            myProcess = new Process();
            myProcess.StartInfo.UseShellExecute = false;
            myProcess.StartInfo.RedirectStandardOutput = true;
            myProcess.StartInfo.RedirectStandardInput = false;
            myProcess.StartInfo.RedirectStandardError = true;
            myProcess.StartInfo.FileName = "bin\\AvorionServer.exe";
            myProcess.StartInfo.Arguments = "--galaxy-name GalaxyName --public true --same-start-sector false --rcon-password password --rcon-ip 192.168.1.245";
            myProcess.OutputDataReceived += AvorionCaptureOutput;
            myProcess.StartInfo.CreateNoWindow = false;
            myProcess.ErrorDataReceived += AvorionCaptureError;
            //myProcess.EnableRaisingEvents = true;
            //myProcess.Exited += new EventHandler(ProcessOnExited);
            myProcess.Start();
            myProcess.BeginOutputReadLine();
            myProcess.BeginErrorReadLine();

            StartTimers();
        }

        public void StopAvorion()
        {
            StopTimers();

            DsmWriteLine("Stopping Avorion");

            RconCmd("/stop");
            myProcess.WaitForExit();
            myProcess.CancelOutputRead();
        }

        static int GetInterval(int delay)
        {
            return 1000 * 60 * delay;
        }

        public void StatusTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RconCmd("/status", true);

            StatusTimer.Change(GetInterval(5), Timeout.Infinite);
        }

        public void SectorTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_sector_data", true);

            SectorTimer.Change(GetInterval(60), Timeout.Infinite);
        }

        public void PlayerTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_player_data", true);

            PlayerTimer.Change(GetInterval(30), Timeout.Infinite);
        }

        public void AllianceTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_alliance_data", true);

            AllianceTimer.Change(GetInterval(30), Timeout.Infinite);
        }

        public void FactionTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_faction_data", true);

            FactionTimer.Change(GetInterval(30), Timeout.Infinite);
        }

        public void RconCmd(string Cmd, bool Dsm = false)
        {
            Process php = new Process();
            php.StartInfo.UseShellExecute = false;
            php.StartInfo.RedirectStandardOutput = true;
            php.StartInfo.FileName = @"C:\php\php.exe";
            php.StartInfo.Arguments = "-f \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\core\\test.php\" \"" + Cmd + "\"";
            php.StartInfo.CreateNoWindow = true;
            php.Start();

            while (!php.StandardOutput.EndOfStream)
            {
                string line = php.StandardOutput.ReadLine();
                if (Dsm)
                {
                    DsmWriteLine(line);
                }
                else
                {
                    Console.WriteLine(line);
                }
            }

            php.WaitForExit();
            php.Close();
        }

        public void StartWeb()
        {
            if (!File.Exists(@"php\php.exe"))
            {
                DsmWriteLine("PHP not installed, run /install to install php and avorion!");
                return;
            }
            DsmWriteLine("Starting Web Panel.");
            phpWeb.StartInfo.UseShellExecute = false;
            phpWeb.StartInfo.RedirectStandardOutput = true;
            phpWeb.StartInfo.RedirectStandardInput = true;
            phpWeb.StartInfo.FileName = @"php\php.exe";
            phpWeb.StartInfo.Arguments = "-S localhost:8080 -t \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\webroot\" \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\webroot\\index.php\"";
            phpWeb.StartInfo.CreateNoWindow = false;
            //phpWeb.OutputDataReceived += PHPCaptureOutput;

            phpWeb.Start();
            //phpWeb.BeginOutputReadLine();

            //while (!phpWeb.StandardOutput.EndOfStream) {
            //    string line = phpWeb.StandardOutput.ReadLine();
            //    Console.WriteLine(line);
            //}
            //phpWeb.WaitForExit();
        }

        public void RunPHPCommand(string Cmd, bool Dsm = false)
        {
            Process php = new Process();
            php.StartInfo.UseShellExecute = false;
            php.StartInfo.RedirectStandardOutput = true;
            php.StartInfo.FileName = @"php\php.exe";
            php.StartInfo.Arguments = "-f \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\manager\\" + Cmd + ".php\"";
            php.StartInfo.CreateNoWindow = false;

            php.Start();

            while (!php.StandardOutput.EndOfStream)
            {
                string line = php.StandardOutput.ReadLine();
                if (Dsm)
                {
                    DsmWriteLine(line);
                }
                else
                {
                    Console.WriteLine(line);
                }
            }

            php.WaitForExit();
            php.Close();
        }

        static void AvorionCaptureOutput(object sender, DataReceivedEventArgs e)
        {
            if (e.Data != null)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Avorion: {0}", e.Data);
                Console.ForegroundColor = ConsoleColor.White;
            }
        }

        static void AvorionCaptureError(object sender, DataReceivedEventArgs e)
        {
            if (e.Data != null)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Avorion: {0}", e.Data);
                Console.ForegroundColor = ConsoleColor.White;
            }
        }

        static void DsmWriteLine(string message, params object[] arg)
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.Write("DSM:");
            Console.WriteLine(message, arg);
            Console.ForegroundColor = ConsoleColor.White;
        }

        public void ProcessOnExited(object sender, System.EventArgs e)
        {
            Console.WriteLine("Exit time:    {0}\r\nExit code:    {1}", myProcess.ExitTime, myProcess.ExitCode);
        }


    }

    class Config
    {
        public IniData ConfigData;
        public Config(string file)
        {
            if (!File.Exists(file))
            {
                throw new ArgumentException("manager-config.ini does not exsist!");
            }
            var parser = new FileIniDataParser();
            ConfigData = parser.ReadFile(file);
        }

        public bool GetBool(string section, string key)
        {
            string useFullScreenStr = GetString(section,key);
            return bool.Parse(useFullScreenStr);
        }

        public string GetString(string section, string key)
        {
            return ConfigData[section][key];
        }
    }
}