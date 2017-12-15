using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Diagnostics;
using System.IO;


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

        public static void Main(string[] args)
        {
            Console.Title = "Dirty Server Manager";
            DSM MyProgram = new DSM();
            MyProgram.Start();
        }

        private void Start()
        {
            StartAvorion();
            StartWeb();

            StatusTimer = new System.Threading.Timer(new System.Threading.TimerCallback(StatusTimer_Elapsed),null,GetInterval(5),Timeout.Infinite);
            SectorTimer = new System.Threading.Timer(new System.Threading.TimerCallback(SectorTimer_Elapsed),null,GetInterval(60),Timeout.Infinite);
            PlayerTimer = new System.Threading.Timer(new System.Threading.TimerCallback(PlayerTimer_Elapsed),null,GetInterval(30),Timeout.Infinite);
            AllianceTimer = new System.Threading.Timer(new System.Threading.TimerCallback(AllianceTimer_Elapsed),null,GetInterval(30),Timeout.Infinite);
            FactionTimer = new System.Threading.Timer(new System.Threading.TimerCallback(FactionTimer_Elapsed),null,GetInterval(30),Timeout.Infinite);

            bool Reading = true;
            while (Reading)
            {
                if (Console.KeyAvailable)
                {
                    string inputText = Console.ReadLine();
                    //myProcess.StandardInput.WriteLine(inputText);
                    //myProcess.StandardInput.Flush();
                    if (! inputText.StartsWith("/"))
                    {
                        Console.WriteLine("Type /help for available commands.");
                        //start,quit,help,restart,stop
                        continue;
                    }

                    switch (inputText)
                    {
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

            StatusTimer.Dispose();
            SectorTimer.Dispose();
            PlayerTimer.Dispose();
            AllianceTimer.Dispose();
            FactionTimer.Dispose();

            phpWeb.CloseMainWindow();
            phpWeb.Kill();
            Console.WriteLine("Dirty Server Manager, has shut down! Press any key to continue.");
            Console.ReadKey();
        }


        public void StartAvorion()
        {
            myProcess = new Process();
            myProcess.StartInfo.UseShellExecute = false;
            myProcess.StartInfo.RedirectStandardOutput = true;
            myProcess.StartInfo.RedirectStandardInput = false;
            //myProcess.StartInfo.RedirectStandardError = true;
            myProcess.StartInfo.FileName = "bin\\AvorionServer.exe";
            myProcess.StartInfo.Arguments = "--galaxy-name GalaxyName --public true --same-start-sector false --rcon-password password --rcon-ip 192.168.1.245";
            myProcess.OutputDataReceived += CaptureOutput;
            myProcess.StartInfo.CreateNoWindow = false;
            //myProcess.ErrorDataReceived += CaptureError;
            //myProcess.EnableRaisingEvents = true;
            //myProcess.Exited += new EventHandler(ProcessOnExited);
            myProcess.Start();
            myProcess.BeginOutputReadLine();
            //myProcess.BeginErrorReadLine();

            //StreamWriter myStreamWriter = myProcess.StandardInput;
            //String inputText = Console.ReadLine();
            //myStreamWriter.WriteLine(inputText);
            //myStreamWriter.Close();

            //myProcess.WaitForExit();
            //myProcess.Close();
        }

        public void StopAvorion()
        {
            Console.WriteLine("Stopping Avorion");
            RconCmd("/stop");
            myProcess.WaitForExit();
            myProcess.CancelOutputRead();
            //myProcess.Kill();
        }

        static int GetInterval(int delay)
        {
            return 1000 * 60 * delay;
        }

        public void StatusTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RconCmd("/status",true);

            StatusTimer.Change(GetInterval(5),Timeout.Infinite);
        }

        public void SectorTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_sector_data",true);

            SectorTimer.Change(GetInterval(60),Timeout.Infinite);
        }

        public void PlayerTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_player_data",true);

            PlayerTimer.Change(GetInterval(30),Timeout.Infinite);
        }

        public void AllianceTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_alliance_data",true);

            AllianceTimer.Change(GetInterval(30),Timeout.Infinite);
        }

        public void FactionTimer_Elapsed(Object stateInfo)
        {
            Console.WriteLine(DateTime.Now.ToString("o"));

            RunPHPCommand("get_faction_data",true);

            FactionTimer.Change(GetInterval(30),Timeout.Infinite);
        }

        public void RconCmd(string Cmd, bool Dsm = false)
        {
            Process php = new Process();
            php.StartInfo.UseShellExecute = false;
            php.StartInfo.RedirectStandardOutput = true;
            php.StartInfo.FileName = @"C:\php\php.exe";
            php.StartInfo.Arguments = "-f \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\core\\test.php\" \""+Cmd+"\"";
            php.StartInfo.CreateNoWindow = true;
            php.Start();

            while (!php.StandardOutput.EndOfStream) {
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
            phpWeb.StartInfo.UseShellExecute = false;
            phpWeb.StartInfo.RedirectStandardOutput = true;
            phpWeb.StartInfo.RedirectStandardInput = true;
            phpWeb.StartInfo.FileName = @"C:\php\php.exe";
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
            php.StartInfo.FileName = @"C:\php\php.exe";
            php.StartInfo.Arguments = "-f \"D:\\My Files\\DirtyRedz\\Avorion Mods\\DirtyServerManager\\avorion-manager\\manager\\"+Cmd+".php\"";
            php.StartInfo.CreateNoWindow = false;

            php.Start();

            while (!php.StandardOutput.EndOfStream) {
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


        static void CaptureOutput(object sender, DataReceivedEventArgs e)
        {
            if (e.Data != null)
            {
                ConsoleColor oldColor = Console.ForegroundColor;
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("Avorion: {0}", e.Data);
                Console.ForegroundColor = oldColor;
            }
        }

        static void DsmWriteLine(string message)
        {
            ConsoleColor oldColor = Console.ForegroundColor;
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("DSM: {0}", message);
            Console.ForegroundColor = oldColor;
        }

        public void ProcessOnExited(object sender, System.EventArgs e)
        {
            Console.WriteLine("Exit time:    {0}\r\nExit code:    {1}", myProcess.ExitTime, myProcess.ExitCode);
        }
    }
}