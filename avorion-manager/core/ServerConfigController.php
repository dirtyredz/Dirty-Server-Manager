<?php
/**
 * Handles request for the config page
 */
class ServerConfigController extends CommonController
{
  /** @var object $ConfigParser Hold the config Parser class object */
  private $ConfigParser;
  /** @var array $PHPConfigDetails Contains all the deffinitions and input type info */
  const PHPConfigDetails = array(
    'HomeCustomMessageOne' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageTwo' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageThree' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageFour' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'BannerCustomMessageOne' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'BannerCustomMessageTwo' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'BannerCustomMessageThree' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'BannerNameOne' => array(
          'Definition' => 'Custom name for the banner (Top Left), can accept plain text only. Default blank = Galaxy Name',
          'Type' => 'text'),
    'BannerNameTwo' => array(
          'Definition' => 'Custom name for the banner (Bottom Left), can accept plain text only. Default blank = IP Address',
          'Type' => 'text'),
    'ShowOnlinePlayerCount' => array(
          'Definition' => 'If enabled will show the online players count on the home page.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'AccessConsolePage' => array(
          'Definition' => 'The role level required to view the Console page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessServerConfigPage' => array(
          'Definition' => 'The role level required to view the Configuration page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessFactionsPage' => array(
          'Definition' => 'The role level required to view the Factions page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessPlayerPage' => array(
          'Definition' => 'The role level required to view the Players page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessDiscoveredMapPage' => array(
          'Definition' => 'The role level required to view the Discovered Map page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessFactionsMapPage' => array(
          'Definition' => 'The role level required to view the Factions Map page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessGraphsPage' => array(
          'Definition' => 'The role level required to view the Graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessProfilePage' => array(
          'Definition' => 'The role level required to view the Profile page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessUserManagmentPage' => array(
          'Definition' => 'The role level required to view the User Management page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessSpaceInvadersPage' => array(
          'Definition' => 'The role level required to view the Space Invaders page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessAlliancePage' => array(
          'Definition' => 'The role level required to view the Alliances page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'HomeChatLog' => array(
          'Definition' => 'The role level required to view the Chat log on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'HomePlayerList' => array(
          'Definition' => 'The role level required to view the Players list on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'HomeSortPlayerList' => array(
          'Definition' => 'Sorts the players list on the home page. (Name/Flag)',
          'Type' => 'select',
          'Values' => array('Name'=>'Name','Flag'=>'Flag')),
    'HomeDiskUsage' => array(
          'Definition' => 'The role level required to view the Disk Usage on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ServerLoadGraph' => array(
          'Definition' => 'The role level required to view the Server Load graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'OnlinePlayersGraph' => array(
          'Definition' => 'The role level required to view the Online players graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'InMemoryGraph' => array(
          'Definition' => 'The role level required to view the In Memory graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'UpdatesGraph' => array(
          'Definition' => 'The role level required to view the Updates graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'CpuUsageGraph' => array(
          'Definition' => 'The role level required to view the Cpu Usage graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'MemoryUsageGraph' => array(
          'Definition' => 'The role level required to view the Server Memory Usage graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ScriptMemoryGraph' => array(
          'Definition' => 'The role level required to view the Script Memory Usage graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ConsoleCommandsAccess' => array(
          'Definition' => 'The role level required to run commands in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ConsoleStopCommand' => array(
          'Definition' => 'The role level required to run the /stop command in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ChatLogInput' => array(
          'Definition' => 'The role level required to send chat message from home. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessDetailedPlayerData' => array(
          'Definition' => 'The role level required to view extra details on the players page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'AccessDetailedAllianceData' => array(
          'Definition' => 'The role level required to view extra details on the alliance page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ChangeServerINI' => array(
          'Definition' => 'The role level required to change the server.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ChangeManagerConfigINI' => array(
          'Definition' => 'The role level required to change the manager-config.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'ChangePHPConfigINI' => array(
          'Definition' => 'The role level required to change the PHPConfig.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'SendMail' => array(
          'Definition' => 'The role level required to Send Mail via Form. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'DeleteSector' => array(
          'Definition' => 'The role level required to Delete a sector via console page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'DeletePlayer' => array(
          'Definition' => 'The role level required to Delete a player file via console page. (0=public)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>99)),
    'EnableRSS' => array(
          'Definition' => 'If enabled will allow access to the /rss page, which provides details in an easy format for third party software.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'DefaultPage' => array(
          'Definition' => 'The default page to load. (Home / SignIn / Factions / Players / DiscoveredMap / FactionsMap / Graphs / About)',
          'Type' => 'select',
          'Values' => array('Home'=>'Home','SignIn'=>'SignIn','Factions'=>'Factions','Players'=>'Players','DiscoveredMap'=>'DiscoveredMap','FactionsMap'=>'FactionsMap','Graphs'=>'Graphs','About'=>'About')),
    'GalaxiesDir' => array(
          'Definition' => 'Obsolete Option',
          'Type' => 'text'),
    'ConsoleLog' => array(
          'Definition' => 'The file path the console.log file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'ServerLog' => array(
          'Definition' => 'The file path the server.log file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'Manager' => array(
          'Definition' => 'The file path the manager file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'ManagerConfig' => array(
          'Definition' => 'The file path the manager-config.ini file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'LogsDir' => array(
          'Definition' => 'The directory where the log directory resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'StatusBannerDir' => array(
          'Definition' => 'The directory where the status banner resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
  );

  /** @var array ServerINIOptions Contains all the deffinitions and input type info */
  const ServerINIOptions = array(
    'Seed' => array(
          'Definition' => 'seed of the server',
          'Type' => '(Editing Seed is not supported!)'),
    'Difficulity' => array(
          'Definition' => 'difficulty of the server, allowed values are: -3, -2, -1, 0, 1, 2, 3 Default: 0',
          'Type' => 'select',
          'Values' => array('Beginner'=>'-3','Easy'=>'-2','Normal'=>'-1','Veteran'=>'0','Difficult'=>'1','Hard'=>'2','Insane'=>'3')),
    'InfiniteResources' => array(
          'Definition' => 'enable infinite resources for all players',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'CollisionDamage' => array(
          'Definition' => 'amount of damage done to an object on collision, from 0 to 1. 0: no damage, 1: full damage. default: 1',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'SafePlayerInput' => array(
          'Definition' => 'Unkown',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'BigWreckageDespawnTime' => array(
          'Definition' => 'Time for wrecks with 10 or more blocks to despawn.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'SmallWreckageDespawnTime' => array(
          'Definition' => 'Time for wrecks with less then 10 blocks to despawn.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'LootDiminishingFactor' => array(
          'Definition' => 'Amount of loot dropped from mining/salvaging, higher equals less material.',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'ResourceDropChance' => array(
          'Definition' => 'Effect unknown (chance of resources dropping from destroyed wreckage pieces?)',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'TurretDropChanceFromTurret' => array(
          'Definition' => 'The chance that a turret will drop from an NPC space craft when the turret is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'TurretDropChanceFromCraft' => array(
          'Definition' => 'The chance that a turret will drop from an NPC space craft when the craft is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'TurretDropChanceFromBlock' => array(
          'Definition' => 'The chance that a turret will drop from a block of wreckage when it is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'SystemDropChanceFromCraft' => array(
          'Definition' => 'The chance that a ship system will drop from an NPC space craft when the craft is destroyed	',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'SystemDropChanceFromBlock' => array(
          'Definition' => 'The chance that a ship system will drop from a block of wreckage when it is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'ColorDropChanceFromCraft' => array(
          'Definition' => 'The chance that a color will drop from a space craft when the craft is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'ColorDropChanceFromBlock' => array(
          'Definition' => 'The chance that a color will drop from a block of wreckage when it is destroyed',
          'Type' => 'number',
          'Range' => array('step'=>'0.01','min'=>0,'max'=>1)),
    'MaximumFightersPerSectorAndPlayer' => array(
          'Definition' => 'Number of allowed fighters per player in a sector, -1 = unlimited.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>-1,'max'=>100000)),
    'sameStartSector' => array(
          'Definition' => 'Indicates if all players should start in the same sector. If false, a random empty sector on the outer rim is populated and used as the home sector for each new player.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'startUpScript' => array(
          'Definition' => 'Specifies a Lua script to run on server startup.',
          'Type' => 'text'),
    'startSectorScript' => array(
          'Definition' => 'Specifies a Lua script to run when generating a start sector for a player.',
          'Type' => 'text'),
    'saveInterval' => array(
          'Definition' => 'The time between server saves, in seconds.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'sectorUpdateTimeLimit' => array(
          'Definition' => 'This is the time in seconds (by default 300, ie. 5 minutes) that the server will update a sector once it detects that no players are present. (including connected players through gates/wormholes)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'emptySectorUpdateInterval' => array(
          'Definition' => 'Update interval in seconds that will be used for sectors without players. (lower value equals faster simulation/lower performance)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'workerThreads' => array(
          'Definition' => 'Number of threads handling normal updates accross all active sectors.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100)),
    'generatorThreads' => array(
          'Definition' => 'Number of threads handling sector generation. ie When calculating a jump or in a sector with wormholes/gates. (These are temporary/unlimited and run at full load to perform computations quickly.)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100)),
    'scriptBackgroundThreads' => array(
          'Definition' => 'Number of threads handling scripts in the background.)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100)),
    'aliveSectorsPerPlayer' => array(
          'Definition' => 'Number of sectors for each player to keep alive, based on a ranking system.(the more ships/stations of yours, the higher the priority)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>50)),
    'weakUpdate' => array(
          'Definition' => 'When enabled sectors that have no players are updated in a more lightweight and simplified way, without huge physics calculations, which saves performance.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'profiling' => array(
          'Definition' => 'Analysis of last 20 frames is printed out when profiling is enabled and /status command is used. (Profiling measures time for actions to complete.)',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'port' => array(
          'Definition' => 'The default port to access the server on. Does not affect the TCP/UDP game traffic port or the query ports.',
          'Type' => 'text'),
    'broadcastInterval' => array(
          'Definition' => 'The time between server activity broadcasts (in seconds?)',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>0,'max'=>100000)),
    'isPublic' => array(
          'Definition' => 'indicate if the server should allow other players to join',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'isListed' => array(
          'Definition' => 'indicate if the server should show up on public server lists',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'isAuthenticated' => array(
          'Definition' => 'Effect unknown. (Presumably identical to the ingame setting "Authenticate Users" which toggles steam authentication)',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'sendStatsToAdmins' => array(
          'Definition' => 'True will allow server stats to be sent to the admin when using f3 on the client',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'useSteam' => array(
          'Definition' => 'Determines whether the server can be joined via Steam, using options like "join game".',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'rconIp' => array(
          'Definition' => 'IP address the RCON interface will use.',
          'Type' => 'text'),
    'rconPassword' => array(
          'Definition' => 'Password needed to access RCON',
          'Type' => 'text'),
    'rconPort' => array(
          'Definition' => 'Port that RCON will listen on',
          'Type' => 'text'),
    'maxPlayers' => array(
          'Definition' => 'The max number of players allowed on the server at one time.',
          'Type' => '(Change this in ManagerConfig)'),
    'name' => array(
          'Definition' => 'The name of the server, shown in the server list.',
          'Type' => 'text'),
    'description' => array(
          'Definition' => 'A description for the server, shown in the server list.',
          'Type' => 'text'),
    'password' => array(
          'Definition' => 'Password requirment for the server.',
          'Type' => 'text'),
    'accessListMode' => array(
          'Definition' => 'Determines whether the server uses a blacklist or a whitelist to restrict access.',
          'Type' => 'select',
          'Values' => array('Blacklist'=>'Blacklist','Whitelist'=>'Whitelist')),
  );

  /** @var array ManagerConfigOptions Contains all the deffinitions and input type info */
  const ManagerConfigOptions = array(
    'MAX_PLAYERS' => array(
          'Definition' => 'Max number of players on the server at once. Used here so the manager has easy access to this value.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>9999)),
    'GALAXY' => array(
          'Definition' => 'Name of the Galaxy, needed here aswell so the manager and the web interface knows which galaxy directory were working with.',
          'Type' => 'text'),
    'GalaxyDirectory' => array(
          'Definition' => 'File path to where your galaxy will be stored. GALAXY will be appended after path: [GalaxyDirectory][/GALAXY]  Blank will be default to ~/.avorion/galaxies/',
          'Type' => 'text'),
    'PARAMS' => array(
          'Definition' => 'The parameters used to start the server.',
          'Type' => 'text'),
    'PORT' => array(
          'Definition' => 'The port the server listens to. Defaults to 27000',
          'Type' => 'text'),
    'Listed' => array(
          'Definition' => 'True means server is listed on the servers list, and allows for server queries. [Warning, if set to false may lose functionality with DSM See WIKI for more info]',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'SteamQueryPort' => array(
          'Definition' => 'The port that steam and other queries can access [required]. defaults to 27020',
          'Type' => 'text'),
    'SteamMasterPort' => array(
          'Definition' => 'The port that steam uses [required]. defaults to 27021',
          'Type' => 'text'),
    'GameIPAddress' => array(
          'Definition' => 'The server address used to connect players to your server. Defaults to standard network IP address, only needed for multiple instances of avorion on same machine.',
          'Type' => 'text'),
    'RconIPAddress' => array(
          'Definition' => 'The server address this servres RCON will listen on.',
          'Type' => 'text'),
    'RconPassword' => array(
          'Definition' => 'Password to use RCON.',
          'Type' => 'text'),
    'RconPort' => array(
          'Definition' => 'The port that RCON listens to.',
          'Type' => 'text'),
    'LOG_ROTATION' => array(
          'Definition' => 'The number of days to maintain manager logs.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>10)),
    'AutoRestart' => array(
          'Definition' => 'If enabled will attempt to restart the server if a crash is detected.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'DailyRestart' => array(
          'Definition' => 'If enabled will restart the server twice a day at midnight and noon server time, Time configurations to come soon.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'BETA' => array(
          'Definition' => 'If enabled will install/update the server with the Beta version of the game.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'WebPort' => array(
          'Definition' => 'The port the web interface will listen to.',
          'Type' => 'text'),
    'WebIPAddress' => array(
          'Definition' => 'IP Address to be used for the web interface.',
          'Type' => 'text'),
    'GetSectorDataInterval' => array(
          'Definition' => 'String added to the Hour section of the cronjob for the sector parser.',
          'Type' => 'text'),
    'GetPlayerDataInterval' => array(
          'Definition' => 'String added to the Minute section of the cronjob for the player parser.',
          'Type' => 'text'),
    'GetAllianceDataInterval' => array(
          'Definition' => 'String added to the Minute section of the cronjob for the alliance parser.',
          'Type' => 'text'),
    'CustomCronjob_1' => array(
          'Definition' => 'Custom Cronjob to be started/stopped with the server.',
          'Type' => 'text'),
    'CustomCronjob_2' => array(
          'Definition' => 'Custom Cronjob to be started/stopped with the server.',
          'Type' => 'text'),
    'CustomCronjob_3' => array(
          'Definition' => 'Custom Cronjob to be started/stopped with the server.',
          'Type' => 'text'),
    'CustomCronjob_4' => array(
          'Definition' => 'Custom Cronjob to be started/stopped with the server.',
          'Type' => 'text'),
    'CustomCronjob_5' => array(
          'Definition' => 'Custom Cronjob to be started/stopped with the server.',
          'Type' => 'text'),
    'KeepDataFiles' => array(
          'Definition' => 'Optional feature to store the parsed data files into a seperate direcctory, to later be reviewed by the web interface. (This is not a players.dat backup feature)',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'KeepDataFilesDays' => array(
          'Definition' => 'How many days of backed up Parsed data to keep',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>10)),
    'KeepDataFilesPlayers' => array(
          'Definition' => 'To back up the parsed player file. KeepDataFiles - needs to be true',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'KeepDataFilesAlliances' => array(
          'Definition' => 'To back up the parsed alliance file. KeepDataFiles - needs to be true',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'MOTD' => array(
          'Definition' => 'Disable or Enable MOTD on server startup.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'MOTDMessage' => array(
          'Definition' => 'MOTD Message to broadcast to player when they enter the galaxy',
          'Type' => 'text'),
    'MessageOne' => array(
          'Definition' => 'A message to broadcast to the server, use MessageInterval and MessageOrder to set when to brodcast.',
          'Type' => 'text'),
    'MessageTwo' => array(
          'Definition' => 'A message to broadcast to the server, use MessageInterval and MessageOrder to set when to brodcast.',
          'Type' => 'text'),
    'MessageThree' => array(
          'Definition' => 'A message to broadcast to the server, use MessageInterval and MessageOrder to set when to brodcast.',
          'Type' => 'text'),
    'MessageFour' => array(
          'Definition' => 'A message to broadcast to the server, use MessageInterval and MessageOrder to set when to brodcast.',
          'Type' => 'text'),
    'MessageFive' => array(
          'Definition' => 'A message to broadcast to the server, use MessageInterval and MessageOrder to set when to brodcast.',
          'Type' => 'text'),
    'MessageInterval' => array(
          'Definition' => 'An interval in minutes to broadcast a message to the server.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>120)),
    'StopDelay' => array(
          'Definition' => 'Time in seconds for the stop command to wait BETWEEN saving and stoping the server.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>120)),
    'SaveWait' => array(
          'Definition' => 'Time in seconds for the stop command to wait if a successful SAVE message is not retrieved.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>120)),
    'StopWait' => array(
          'Definition' => 'Time in seconds for the stop command to wait if a successful STOP message is not retrieved.',
          'Type' => 'number',
          'Range' => array('step'=>'1','min'=>1,'max'=>120)),
  );
  /**
   * Settup class and requires ConfigParser.php
   * @method __construct
   */
  function __construct()
  {
    parent::__construct();
    require_once  __DIR__ .'/ConfigParser.php';
  }

  /**
   * Parses through Server.ini
   * @method GetServerINI
   * @return array
   */
  public function GetServerINI()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    /** @var string $GalaxyName GalaxyName in manager-config */
    $GalaxyName = $this->ManagerConfig['GALAXY'];//`grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    /** @var string $File server.ini file location */
    $File = $this->ManagerConfig['GalaxyDirectory']."/".trim($GalaxyName)."/server.ini";

    // Parses the file and return an array
    if($this->ParseINI($File)){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Parses the INI file provided and returns true for success
   * @method ParseINI
   * @param  string $File File location to parse
   * @return boolean
   */
  private function ParseINI($File)
  {
    //Parse the file
    $this->ConfigParser->ParseINI($File);
    //if parsing was successful or not
    return $this->ConfigParser->Success;
  }

  /**
   * Parses the manager-config.ini
   * @method GetManagerConfig
   * @return array
   */
  public function GetManagerConfig()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    // Parses the file and return an array
    if($this->ParseINI($this->Config['ManagerConfig'])){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Parses the PHPConfig.ini
   * @method GetPHPConfig
   * @return array
   */
  public function GetPHPConfig()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    //Parses the file and returns the array
    if($this->ParseINI(__DIR__ . '/../PHPConfig.ini')){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Validates and cleans form data for server.ini
   * Updates and writes to file with comments
   * @method UpdateServerConfig
   * @return string json_encoded success message
   */
  public function UpdateServerConfig()
  {
    if(!$this->RoleAccess($this->Config['ChangeServerINI'])){
      $return['success'] = false;
      $return['message'] = 'Role level not high enough.';
      echo json_encode($return);
      exit;
    }
    /** @var array $return Builds response array */
    $return = array();
    /** @var array $NewPHPConfig array with updated values */
    $NewConfig = array();
    /** @var array $Defaults PHPConfig.ini current values from file */
    $Defaults = $this->GetServerINI();
    //foreach value in the form data
    foreach ($_POST['FormData'] as $key => $value) {
      /** @var mixed $RtnValue form value to be validated and update the file with */
      $RtnValue = $value['value'];
      //if this INI option requires a number
      if(self::ServerINIOptions[$value['name']]['Type'] == 'number'){
        //Cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if its not a number restore default
        if(!is_numeric($RtnValue)){
          $RtnValue = $Defaults[$value['name']];
        }
      //if INI option is a text field
      }elseif(self::ServerINIOptions[$value['name']]['Type'] == 'text'){
        //Client can use HTML here so lets only strip  out script tags
        $RtnValue = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $RtnValue);
      //if INI option is a select input
      }elseif(self::ServerINIOptions[$value['name']]['Type'] == 'select'){
        //cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if value is not one of the allowed values then restore it
        if(!in_array($RtnValue,self::ServerINIOptions[$value['name']]['Values'])){
          $RtnValue = $Defaults[$value['name']];
        }
      }
      //add the value to the array to be updated
      $NewConfig[$value['name']] = $RtnValue;
    }

    //Update the class array with our new array
    $this->ConfigParser->update($NewConfig);
    //Write the class array to the file include our comments with it so they are written in as well
    $GalaxyName = $this->ManagerConfig['GALAXY'];
    $File = $this->ManagerConfig['GalaxyDirectory']."/".trim($GalaxyName)."/server.ini";
    if($this->ConfigParser->write()){
      shell_exec("sed -i '1s/^/[Game]\\n/' {$File}");
      shell_exec("sed -i '0,/^saveInterval.*/s/^saveInterval.*/[System]\\n&/' {$File}");
      shell_exec("sed -i '0,/^port.*/s/^port.*/[Networking]\\n&/' {$File}");
      shell_exec("sed -i '0,/^maxPlayers.*/s/^maxPlayers.*/[Administration]\\n&/' {$File}");
      $return['success'] = true;
      $return['message'] = 'Server config ini';
    }else{
      $return['success'] = false;
      $return['message'] = 'Error in updating file';
    }

    echo json_encode($return);
  }

  /**
   * Validates and cleans form data for Manager-config.ini
   * Updates and writes to file with comments
   * @method UpdateManagerConfig
   * @return string json_encoded success message
   */
  public function UpdateManagerConfig()
  {
    if(!$this->RoleAccess($this->Config['ChangeManagerConfigINI'])){
      $return['success'] = false;
      $return['message'] = 'Role level not high enough.';
      echo json_encode($return);
      exit;
    }
    /** @var array $return Builds response array */
    $return = array();
    /** @var array $NewPHPConfig array with updated values */
    $NewPHPConfig = array();
    /** @var array $Defaults PHPConfig.ini current values from file */
    $Defaults = $this->GetManagerConfig();
    //foreach value in the form data
    foreach ($_POST['FormData'] as $key => $value) {
      /** @var mixed $RtnValue form value to be validated and update the file with */
      $RtnValue = $value['value'];
      //if this INI option requires a number
      if(self::ManagerConfigOptions[$value['name']]['Type'] == 'number'){
        //Cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if its not a number restore default
        if(!is_numeric($RtnValue)){
          $RtnValue = $Defaults[$value['name']];
        }
      //if INI option is a text field
    }elseif(self::ManagerConfigOptions[$value['name']]['Type'] == 'text'){
        //Client can use HTML here so lets only strip  out script tags
        $RtnValue = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $RtnValue);
      //if INI option is a select input
    }elseif(self::ManagerConfigOptions[$value['name']]['Type'] == 'select'){
        //cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if value is not one of the allowed values then restore it
        if(!in_array($RtnValue,self::ManagerConfigOptions[$value['name']]['Values'])){
          $RtnValue = $Defaults[$value['name']];
        }
      }
      //add the value to the array to be updated
      $NewPHPConfig[$value['name']] = $RtnValue;
    }

    //Update the class array with our new array
    $this->ConfigParser->update($NewPHPConfig);
    //Write the class array to the file include our comments with it so they are written in as well
    $this->ConfigParser->write(self::ManagerConfigOptions,' ');

    //return success message
    $return['success'] = true;
    $return['message'] = 'Manager Config Updated';
    echo json_encode($return);
  }

  /**
   * Validates and cleans form data for PHPConfig.ini
   * Updates and writes to file with comments
   * @method UpdatePHPConfig
   * @return string json_encoded success message
   */
  public function UpdatePHPConfig()
  {
    if(!$this->RoleAccess($this->Config['ChangePHPConfigINI'])){
      $return['success'] = false;
      $return['message'] = 'Role level not high enough.';
      echo json_encode($return);
      exit;
    }
    /** @var array $return Builds response array */
    $return = array();
    /** @var array $NewPHPConfig array with updated values */
    $NewPHPConfig = array();
    /** @var array $Defaults PHPConfig.ini current values from file */
    $Defaults = $this->GetPHPConfig();
    //foreach value in the form data
    foreach ($_POST['FormData'] as $key => $value) {
      /** @var mixed $RtnValue form value to be validated and update the file with */
      $RtnValue = $value['value'];
      //if this INI option requires a number
      if(self::PHPConfigDetails[$value['name']]['Type'] == 'number'){
        //Cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if its not a number restore default
        if(!is_numeric($RtnValue)){
          $RtnValue = $Defaults[$value['name']];
        }
      //if INI option is a text field
      }elseif(self::PHPConfigDetails[$value['name']]['Type'] == 'text'){
        //Client can use HTML here so lets only strip  out script tags
        $RtnValue = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $RtnValue);
      //if INI option is a select input
      }elseif(self::PHPConfigDetails[$value['name']]['Type'] == 'select'){
        //cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if value is not one of the allowed values then restore it
        if(!in_array($RtnValue,self::PHPConfigDetails[$value['name']]['Values'])){
          $RtnValue = $Defaults[$value['name']];
        }
      }
      //add the value to the array to be updated
      $NewPHPConfig[$value['name']] = $RtnValue;
    }

    //Update the class array with our new array
    $this->ConfigParser->update($NewPHPConfig);
    //Write the class array to the file include our comments with it so they are written in as well
    $this->ConfigParser->write(self::PHPConfigDetails,' ');

    //return success message
    $return['success'] = true;
    $return['message'] = 'PHP Config Updated';
    echo json_encode($return);
  }

}
