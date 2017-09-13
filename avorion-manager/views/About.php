
<style type="text/css">

</style>

<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-about"></use></svg>ABOUT</span><span class="Time"></span></div>
<br/>
<img src="/resources/img/DSM_Logo.png" alt="DSM"/>
<h1>Dirty Server Manager</h1>
<h2>The Unofficial Avorion Linux Server Manager.</h2>
<div class="Version"><h3>Version: <?php echo $Data['Version']; ?></h3><span><?php echo $Data['UpToDate']; ?></span></div>
<br/>
<a target="_blank" href="https://github.com/dirtyredz/Dirty-Server-Manager/issues">TODO</a>
</br>
<a target="_blank" href="http://www.avorion.net/forum/index.php/topic,3507.0.html">Avorion Forum Post</a>
<br/>
<br/>
<h3>FAQ</h3>
<div class="Question"><span>Q: </span>How are you feeling today?</div><br/>
<div class="Answer"><span>&nbsp;&nbsp;&nbsp;&nbsp;A: </span>Im feeling GREAT!, Thanks for asking.</div><br/>
<br/>
<div class="Question"><span>Q: </span>Another question?</div><br/>
<div class="Answer"><span>&nbsp;&nbsp;&nbsp;&nbsp;A: </span>With another answer.</div><br/>
<br/>
<br/>
<h3>CHANGE LOG:</h3>
<h4>1.2.3</h4>
  Updated Server.ini default config options</br>
  Removed Enablerestart command</br>
  changed disablerestart command to work properly with how the auto restart cronjob works</br>
  new disablerestart feature, `./manager disablerestart 30` this will stop current restart sequence, and re start the sequence for 30 minutes.</br>
  apache_install will now properly stop galaxies running php webserver.</br>
  fixed error message in stop-web when php_server is not running</br>
  apache_intaller will now place backups config files prior to modifying the configs.</br>
  fixed manager always saying its out of date</br>
  help command now displays all available commands in the manager/ directory, with descriptions of each.</br>
  </br>
<h4>1.2.2</h4>
  fixed Player data retrieval script, was not getting all players</br>
  fixed Alliance data retrieval script, was not getting all alliances</br>
  added 3 options to the install script, StopWait,SaveWait, and StopDelay, that was previously missed in last update</br>
  player,alliance, and group scripts now use variables passed by the manager script</br>
  **update_manager now uses the same script for editing configs via web interface, the script will re add any missing comments and any missing options to the configs</br>
  Restart command now displays a message between stopping and Starting</br>
  removed password lockout on server config editor. (until I settup password protection on installation)</br>
  Added DeletePlayer button in console.(server needs to be offline)</br>
  Added -v option to start-web script, will output more information when failing to start webserver</br>
  </br>
  **Note:</br>
  when you update to this version, youll still be using the old Update_manager script, the updated script wont take effect until the next update for you.</br>
  </br>
<h4>1.2.1</h4>
  Fix editing server.ini with web interface, from breaking your server.ini</br>
  Editing any config through the web interface will now create a copy of the config for backup</br>
  Added complete Params to log and echo when starting server with -v</br>
  Fixed bug in stop command that was not updating the status banner</br>
  Added a message to profile parser page, notifing when the server has profiling disabled</br>
  Added StopWait,SaveWait, and StopDelay to stop command and manager-config.ini</br>
  Using the web interface will now add double qoutes around any string containing special charectors.</br>
  Fixed manager logger to display the files its exectuing and not repeating the command that was run.</br>
  </br>
<h4>1.2.0</h4>
  Moves Apache installer to avorion-manager/manager</br>
  separated commands from manager and added to avorion-manager/manager</br>
  updated todo link on about page to direct to github issues</br>
  fixed grep error when running status command with an offline server.</br>
  send command now checks if a `/command` was sent ie `/say` or `/stop`</br>
  Added Parser scripts to manager commands</br>
  Added parser verbose output when manually running scripts</br>
  Added verbose output for start command, will display additional info if server cant start, and more</br>
  Added (help)  `-h` optional parameter, will display name/description of function</br>
  Added optional parameter `-f` to force specific features, like running update with -f will ignore current version checks, and reinstall</br>
  Added custom names for status banners, in PHPConfig.ini</br>
  Moved Banner Generator script to its own script, removed netstat dependency(will now use last reported /players from console).</br>
  Updated install script, to install all options and comments properly</br>
  Added Timed Broadcast's Options/script</br>
  Added Message Of The Day options</br>
  Added Sorting Option to PHPConfig.ini for players list on home screen</br>
  Added send mail to all members of a group, select the group from the drop down and hit send</br>
  Migrated Admins.xml parser into its own function</br>
  Refined Restart command to attempt restart 10 times, aswell as other improvments in the script</br>
  Added new option GalaxyDirectory, allowing you to set the location of your galaxies directory.</br>
  Fixed bug where redirects would send you to wrong address</br>
  Added Inputs on console page to delete a sector from the galaxies/sectors/ directory</br>
  Extended input on console to show last 100 lines of manager and status log when toggled</br>
  Added Start/Stop/Status buttons on console page, commands sent to the manager not the console.</br>
  Added Backup command: backup_galaxy, which will backup the entire galaxy directory. The command will only keep 10 backups.</br>
  Fixed a bug causing the php-server to crash if there was no playerchatlog available.</br>
  Fixed php-server saying it wasn't starting.</br>
  forced update command to perform the update twice in succession, to catch any thing missed during first update.</br>
  Removed Sudo command prefix from apacheInstall script for VM users.</br>
  </br>
<h4>1.1.7</h4>
  Added custom cronjob config options to manager-config.ini</br>
  removed old not working restart announcment and changed cronjob restart command to announce every 1minute for 15 minutes</br>
  Updated ApacheInstaller to ask for user/group, prior was setting it to root. witch would make the site inaccessible</br>
  Added option to manager-config to keep backups of the player/alliance data. OFF by default.</br>
  Added dropdown for viewing backups of Player data.</br>
  Fixed (i hope) UpdateManager script</br>
  optimized manager-config tab on server config page</br>
  </br>
<h4>1.1.6</h4>
  Moved player count/list to server log</br>
  Added cronjob to refresh server log every 30seconds</br>
  Moved home chat to server log</br>
  Added toggle to console page to switch between console.log and server.log</br>
  Moved ServerINI and ManagerConfig Descriptions to ServerConfigController</br>
  `./manager stop` now uses server log instead of console log</br>
  Added server log location option in PHPConfig</br>
  Updated UpdateManager.sh to not reset or delete previous options in config file_put_contents</br>
  Updated ApacheInstaller to reflect IP address</br>
  Added Profile Parser page, witch parses through profiling_stats.txt</br>
  Added mpm_itk support to ApacheInstall</br>
  </br>
<h4>1.1.5</h4>
Fixed HighScore.php being erased on update</br>
Added commands enablerestart and disablerestart</br>
Added manager options -d, -o, -b, -v</br>
Added Mail parsing to player parser</br>
Added Mail player page net worth to net worth column</br>
Added Mail resources/money to player page</br>
Added file detection to zlib decompressor</br>
Fixed Session not renewing when the browser is left open for a long period of time</br>
Changed display of graphs to include small definitions and better font styles</br>
Changed font styles for configuration page</br>
Updated help output of manager</br>
Changed Alliance Icon</br>
Improved zlib decompression script</br>
Added Scripts memory graphs</br>
</br>
<h4>1.1.6</h4>
  Moved player count/list to server log</br>
  Added cronjob to refresh server log every 30seconds</br>
  Moved home chat to server log</br>
  Added toggle to console page to switch between console.log and server.log</br>
  Moved ServerINI and ManagerConfig Descriptions to ServerConfigController</br>
  `./manager stop` now uses server log instead of console log</br>
  Added server log location option in PHPConfig</br>
  Updated UpdateManager.sh to not reset or delete previous options in config file_put_contents</br>
  Updated ApacheInstaller to reflect IP address</br>
  Added Profile Parser page, witch parses through profiling_stats.txt</br>
  Added mpm_itk support to ApacheInstall</br>
  </br>
<h4>1.1.5</h4>
  Fixed HighScore.php being erased on update</br>
  Added commands enablerestart and disablerestart</br>
  Added manager options -d, -o, -b, -v</br>
  Added Mail parsing to player parser</br>
  Added Mail player page net worth to net worth column</br>
  Added Mail resources/money to player page</br>
  Added file detection to zlib decompressor</br>
  Fixed Session not renewing when the browser is left open for a long period of time</br>
  Changed display of graphs to include small definitions and better font styles</br>
  Changed font styles for configuration page</br>
  Updated help output of manager</br>
  Changed Alliance Icon</br>
  Improved zlib decompression script</br>
  Added Scripts memory graphs</br>
  </br>
<h4>1.1.4</h4>
  Fixed player flags</br>
  Replaced grep command with php for loop in player list of home page</br>
  Added timestamp to home screen chatlog of Current server session(since last restart)</br>
  Added a "Send To All" button on the mail form.</br>
  Added Alliance Parsing</br>
  Added Alliance page</br>
  Added Alliance config options to PHPConfig.ini</br>
  Added Alliance to Players page</br>
  Added Alliance To players parser</br>
  Added Alliance Parser to cron job</br>
  Added manager-config options to adjust cronjob times for data parser scripts</br>
  </br>
<h4>1.1.3</h4>
  Fixed Variable name in manager for default IPAddress</br>
  </br>
<h4>1.1.2</h4>
  Removed Hostname from manager</br>
  </br>
<h4>1.1.1</h4>
  Disabled links on the sidebar are now set to have no display instead of just being greyed out</br>
  Added chatlog input to use username as prefix to chat</br>
  Removed inputs for configuration page for users with role access not high enough to change the values.</br>
  changed sign out all button text</br>
  Added IP Address to installation and manager-config.ini</br>
  </br>
<h4>1.1.0</h4>
  Added zlib_Uncompress.php to handle decompressing data file_put_contents</br>
  *Changed GetSectorData to handle the new data structure</br>
  *Changed GetSectorData to handle the new data structure</br>
  *Changed server.ini configuration deffinitions</br>
  </br>
  *WARNING: Compatible with avorion build 0.12 r8487</br>
  </br>
<h4>1.0.10</h4>
  Added Groups detection into GetPlayerData script (parses admin.xml for players groups)</br>
  Added Debian support for ApacheInstaller script.</br>
  Fixed Maps scrolling issues.</br>
  Added modal confirmation to password change.</br>
  Added /run detection to console input.</br>
  Added Chat Input to home page chat log.</br>
  Added manager-config.ini parsing to CommonController, making it so we dont have to grep for commenly used options like Galaxy Name</br>
  fixed error when starting server for first time and there is no console.log present.</br>
  </br>
<h4>1.0.9</h4>
  Added Apache web server support</br>
  changed Router.php to index.php</br>
  Changed PHPPort to WEBPORT in manager-config.ini</br>
  Added 'ampersand' charecter escaping in UpdateManager</br>
  Updated manager to use unique tmux identifier</br>
  Added Memory Usage graph</br>
  </br>
<h4>1.0.8</h4>
  Added Last Seen support for players, GetPlayerData will track the last time it saw the player in the console</br>
  Changed SendMail script so that the console sendmail form can now send long messages (previously not possible due to max characters in commands)</br>
  Updated/fixed failed GetPlayerData.sh and GetSectorData.sh</br>
  Fixed send mail sending wrong resource when not filling in all the resources in the form</br>
  Added "version" command to manager</br>
  </br>
<h4>1.0.7</h4>
  Fixed wrong number of online players on home page.</br>
  Added Space Invaders page, because why not?</br>
  Updated Definitions for PHPConfig.ini</br>
  Moved Resources files to individual directories (Youll need to manually delete the exsisting files)</br>
  fixed bottom padding of #Main</br>
  Changed Font styles</br>
  Added % to cpu/serverload Graphs</br>
  </br>
<h4>1.0.6</h4>
  Added Support for configuration updates</br>
  </br>
<h4>1.0.5</h4>
  Added sendmail.lua to handle mail form.</br>
  </br>
<h4>1.0.4</h4>
  adjusted session requirments for console  and config page.</br>
  </br>
<h4>1.0.3</h4>
  Fixed Bug in manager install command</br>
  </br>
<h4>1.0.2</h4>
  Added Custom message support for Banners</br>
  Added more dialog to installation and update</br>
  </br>
<h4>1.0.1</h4>
  Updated README</br>
  added Database.php to the update exclusion</br>
  Added Notes to Config page</br>
  Updated default custom messages in PHPConfig.ini</br>
  Updated Database.php default</br>
</br>
<h4>1.0.0</h4>
  Initial Release</br>
<script type="text/javascript">

</script>
