<?php
class ViewController extends CommonController{
  public $Data;

  function __construct(){
    parent::__construct();

    $this->Data['ERROR'] = array();
    if(!is_file($this->Config['ManagerConfig'])){
      $this->Data['ERROR'][] = 'Config Option, ManagerConfig: "'.$this->Config['ManagerConfig'].'" Is not a valid file path.';
    }
    if(!is_file($this->Config['Manager'])){
      $this->Data['ERROR'][] = 'Config Option, Manager: "'.$this->Config['Manager'].'" Is not a valid file path.';
    }
    if(!is_dir($this->Config['LogsDir'])){
      $this->Data['ERROR'][] = 'Config Option, LogsDir: "'.$this->Config['LogsDir'].'" Is not a valid directory path.';
    }
    if(!is_dir($this->Config['StatusBannerDir'])){
      $this->Data['ERROR'][] = 'Config Option, StatusBannerDir: "'.$this->Config['StatusBannerDir'].'" Is not a valid directory path.';
    }
    if(!is_file($this->Config['ConsoleLog'])){
      $this->Data['ERROR'][] = 'Config Option, ConsoleLog: "'.$this->Config['ConsoleLog'].'" Is not a valid file path.';
    }
  }

  private function LoadView($View){
    $Data = $this->Data;
    $this->LogMessage('Loading page: '.$View);
    include __DIR__.'/../views/'.$View.'.php';
  }
  public function Index(){
    $IPAddress = exec("hostname -I | awk '{print $1}'");
    $this->Data['ConsoleAccess'] = 'Disabled';
    $this->Data['AccessServerConfigPage'] = 'Disabled';
    $this->Data['UserManagmentAccess'] = 'Disabled';
    $this->Data['AccessPlayerPage'] = 'Disabled';
    $this->Data['AccessFactionsPage'] = 'Disabled';
    $this->Data['AccessGraphsPage'] = 'Disabled';
    $this->Data['AccessDiscoveredMapPage'] = 'Disabled';
    $this->Data['AccessFactionsMapPage'] = 'Disabled';


    $this->Data['Username'] = '';
    $this->Data['LoggedIn'] = false;
    $this->Data['LoggedInClass'] = 'Disabled';
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    if($this->SessionLoggedIn()) {
      $this->Data['LoggedInClass'] = '';
      $this->Data['LoggedIn'] = true;
      $this->LogMessage('Accessed Web Interface with valid session.');
      $this->Data['Username'] = 'Logged in as: <span>'.$_SESSION['username'].'</span>';
    }elseif ($cookie) {
      require_once __DIR__ . '/AccountModel.php';
      $AccountModel = new AccountModel;
      if($AccountModel->CheckCookie($cookie)){
        $this->Data['Username'] = 'Logged in as: <span>'.$_SESSION['username'].'</span>';
        $this->Data['LoggedInClass'] = '';
        $this->Data['LoggedIn'] = true;
      }
    }
    if($this->RoleAccess($this->Config['AccessConsolePage'])){//Role required for specific feature
      $this->Data['ConsoleAccess'] = '';
    }
    if($this->RoleAccess($this->Config['AccessServerConfigPage'])){//Role required for specific feature
      $this->Data['AccessServerConfigPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessUserManagmentPage'])){//Role required for specific feature
      $this->Data['UserManagmentAccess'] = '';
    }
    if($this->RoleAccess($this->Config['AccessPlayerPage'])){//Role required for specific feature
      $this->Data['AccessPlayerPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessFactionsPage'])){//Role required for specific feature
      $this->Data['AccessFactionsPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessGraphsPage'])){//Role required for specific feature
      $this->Data['AccessGraphsPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessDiscoveredMapPage'])){//Role required for specific feature
      $this->Data['AccessDiscoveredMapPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessFactionsMapPage'])){//Role required for specific feature
      $this->Data['AccessFactionsMapPage'] = '';
    }
    $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");
    $DefaultPage = $this->Config['DefaultPage'];
    $AllowedPages = array('Home','Factions','Players','DiscoveredMap','FactionsMap','Graphs','SignIn','About');
    if($this->Config['DefaultPage'] == 'SignIn' && $this->Data['LoggedIn'] || !in_array($DefaultPage,$AllowedPages)){
      $DefaultPage = 'Home';
    }
    $this->Data['DefaultPage'] = $DefaultPage;

    $this->LoadView('index');
  }
  public function About(){
    $AvailableVersion = `wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest | grep tag_name | sed -e 's/.*://g' -e 's/"//g' -e 's/,//g' | tr -d '[:blank:]'`;
    $InstalledVersion = `grep VERSION {$this->Config['Manager']} | head -n1 | sed -e 's/.*=//g'`;
    $this->Data['Version'] = $InstalledVersion;
    if($InstalledVersion != $AvailableVersion){
      $this->Data['UpToDate'] = 'Dirty Server Manager is not up to date!';
    }else{
      $this->Data['UpToDate'] = 'Dirty Server Manager up to date!';
    }

    $this->LoadView('About');
  }
  public function Account(){
    $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");
    $this->SessionRequired();
    $this->LoadView('Account');
  }
  public function ServerConfig(){
    $this->SessionRequired();
    $this->RoleRequired($this->Config['AccessServerConfigPage']);//Role required to view page

    require_once  __DIR__ .'/ServerConfigController.php';
    $ServerConfigController = new ServerConfigController();

    $this->Data['ServerINI'] = $ServerConfigController->GetServerINI();
    $this->Data['ServerINIDetails'] = array(
      array('name' => 'Seed',
            'Definition' => 'seed of the server',
            'Type' => 'input'),
      array('name' => 'Difficulity',
            'Definition' => 'difficulty of the server, allowed values are: -3, -2, -1, 0, 1, 2, 3 Default: 0',
            'Type' => 'select',
            'Values' => array('Beginner'=>'-3','Easy'=>'-2','Normal'=>'-1','Veteran'=>'0','Difficult'=>'1','Hard'=>'2','Insane'=>'3')),
      array('name' => 'InfiniteResources',
            'Definition' => 'enable infinite resources for all players',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'CollisionDamage',
            'Definition' => 'amount of damage done to an object on collision, from 0 to 1. 0: no damage, 1: full damage. default: 1',
            'Type' => 'input'),
      array('name' => 'BigWreckageDespawnTime',
            'Definition' => 'Time for wrecks with 10 or more blocks to despawn.',
            'Type' => 'input'),
      array('name' => 'SmallWreckageDespawnTime',
            'Definition' => 'Time for wrecks with less then 10 blocks to despawn.',
            'Type' => 'input'),
      array('name' => 'LootDiminishingFactor',
            'Definition' => 'Amount of loot dropped from mining/salvaging, higher equals less material.',
            'Type' => 'input'),
      array('name' => 'ResourceDropChance',
            'Definition' => 'Effect unknown (chance of resources dropping from destroyed wreckage pieces?)',
            'Type' => 'input'),
      array('name' => 'TurretDropChanceFromTurret',
            'Definition' => 'The chance that a turret will drop from an NPC space craft when the turret is destroyed',
            'Type' => 'input'),
      array('name' => 'TurretDropChanceFromCraft',
            'Definition' => 'The chance that a turret will drop from an NPC space craft when the craft is destroyed',
            'Type' => 'input'),
      array('name' => 'TurretDropChanceFromBlock',
            'Definition' => 'The chance that a turret will drop from a block of wreckage when it is destroyed',
            'Type' => 'input'),
      array('name' => 'SystemDropChanceFromCraft',
            'Definition' => 'The chance that a ship system will drop from an NPC space craft when the craft is destroyed	',
            'Type' => 'input'),
      array('name' => 'SystemDropChanceFromBlock',
            'Definition' => 'The chance that a ship system will drop from a block of wreckage when it is destroyed',
            'Type' => 'input'),
      array('name' => 'ColorDropChanceFromCraft',
            'Definition' => 'The chance that a color will drop from a space craft when the craft is destroyed',
            'Type' => 'input'),
      array('name' => 'ColorDropChanceFromBlock',
            'Definition' => 'The chance that a color will drop from a block of wreckage when it is destroyed',
            'Type' => 'input'),
      array('name' => 'sameStartSector',
            'Definition' => 'Indicates if all players should start in the same sector. If false, a random empty sector on the outer rim is populated and used as the home sector for each new player.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'startUpScript',
            'Definition' => 'Specifies a Lua script to run on server startup.',
            'Type' => 'input'),
      array('name' => 'startSectorScript',
            'Definition' => 'Specifies a Lua script to run when generating a start sector for a player.',
            'Type' => 'input'),
      array('name' => 'saveInterval',
            'Definition' => 'The time between server saves, in seconds.',
            'Type' => 'input'),
      array('name' => 'sectorUpdateTimeLimit',
            'Definition' => 'This is the time in seconds (by default 300, ie. 5 minutes) that the server will update a sector once it detects that no players are present. (including connected players through gates/wormholes)',
            'Type' => 'input'),
      array('name' => 'emptySectorUpdateInterval',
            'Definition' => 'Update interval in seconds that will be used for sectors without players. (lower value equals faster simulation/lower performance)',
            'Type' => 'input'),
      array('name' => 'workerThreads',
            'Definition' => 'Number of threads handling normal updates accross all active sectors.',
            'Type' => 'input'),
      array('name' => 'generatorThreads',
            'Definition' => 'Number of threads handling sector generation. ie When calculating a jump or in a sector with wormholes/gates. (These are temporary/unlimited and run at full load to perform computations quickly.)',
            'Type' => 'input'),
      array('name' => 'weakUpdate',
            'Definition' => 'When enabled sectors that have no players are updated in a more lightweight and simplified way, without huge physics calculations, which saves performance.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'immediateWriteout',
            'Definition' => 'immediately writes data to the players .dat file, disabling will save on performance. (Unkown interval when disabled)',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'profiling',
            'Definition' => 'Analysis of last 20 frames is printed out when profiling is enabled and /status command is used. (Profiling measures time for actions to complete.)',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'port',
            'Definition' => 'The default port to access the server on. Does not affect the TCP/UDP game traffic port or the query ports.',
            'Type' => 'input'),
      array('name' => 'broadcastInterval',
            'Definition' => 'The time between server activity broadcasts (in seconds?)',
            'Type' => 'input'),
      array('name' => 'isPublic',
            'Definition' => 'indicate if the server should allow other players to join',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'isListed',
            'Definition' => 'indicate if the server should show up on public server lists',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'isAuthenticated',
            'Definition' => 'Effect unknown. (Presumably identical to the ingame setting "Authenticate Users" which toggles steam authentication)',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'useSteam',
            'Definition' => 'Determines whether the server can be joined via Steam, using options like "join game".',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'maxPlayers',
            'Definition' => 'The max number of players allowed on the server at one time',
            'Type' => 'input'),
      array('name' => 'name',
            'Definition' => 'The name of the server, shown in the server list.',
            'Type' => 'input'),
      array('name' => 'description',
            'Definition' => 'A description for the server, shown in the server list.',
            'Type' => 'input'),
      array('name' => 'password',
            'Definition' => 'Password requirment for the server.',
            'Type' => 'input'),
      array('name' => 'accessListMode',
            'Definition' => 'Determines whether the server uses a blacklist or a whitelist to restrict access.',
            'Type' => 'select',
            'Values' => array('Blacklist'=>'Blacklist','Whitelist'=>'Whitelist')),
    );
    $this->Data['ManagerConfig'] = $ServerConfigController->GetManagerConfig();
    $this->Data['ManagerConfigDetails'] = array(
      array('name' => 'MAX_PLAYERS',
            'Definition' => 'Max number of players on the server at once. Used here so the manager has easy access to this value.',
            'Type' => 'input'),
      array('name' => 'GALAXY',
            'Definition' => 'Name of the Galaxy, needed here aswell so the manager and the web interface knows which galaxy directory were working with.',
            'Type' => 'input'),
      array('name' => 'PARAMS',
            'Definition' => 'The parameters used to start the server.',
            'Type' => 'input'),
      array('name' => 'PORT',
            'Definition' => 'The port the server listens to.',
            'Type' => 'input'),
      array('name' => 'LOG_ROTATION',
            'Definition' => 'The number of days to maintain manager logs.',
            'Type' => 'input'),
      array('name' => 'AutoRestart',
            'Definition' => 'If enabled will attempt to restart the server if a crash is detected.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'DailyRestart',
            'Definition' => 'If enabled will restart the server twice a day at midnight and noon server time, Time configurations to come soon.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'BETA',
            'Definition' => 'If enabled will install/update the server with the Beta version of the game.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'PHPPORT',
            'Definition' => 'The port the web interface will listen to.',
            'Type' => 'input'),
    );
    $TempConfig = $ServerConfigController->GetPHPConfig();


    $this->Data['PHPConfig'] = $TempConfig;
    $this->Data['PHPConfigDetails'] = array(
      array('name' => 'HomeCustomMessageOne',
            'Definition' => 'Custom message for home page, can accept html or plain text.',
            'Type' => 'input'),
      array('name' => 'HomeCustomMessageTwo',
            'Definition' => 'Custom message for home page, can accept html or plain text.',
            'Type' => 'input'),
      array('name' => 'HomeCustomMessageThree',
            'Definition' => 'Custom message for home page, can accept html or plain text.',
            'Type' => 'input'),
      array('name' => 'HomeCustomMessageFour',
            'Definition' => 'Custom message for home page, can accept html or plain text.',
            'Type' => 'input'),
      array('name' => 'ShowOnlinePlayerCount',
            'Definition' => 'If enabled will show the online players count on the home page.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'AccessConsolePage',
            'Definition' => 'The role level required to view the Console page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessServerConfigPage',
            'Definition' => 'The role level required to view the Configuration page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessFactionsPage',
            'Definition' => 'The role level required to view the Factions page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessPlayerPage',
            'Definition' => 'The role level required to view the Players page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessDiscoveredMapPage',
            'Definition' => 'The role level required to view the Discovered Map page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessFactionsMapPage',
            'Definition' => 'The role level required to view the Factions Map page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessGraphsPage',
            'Definition' => 'The role level required to view the Graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessUserManagmentPage',
            'Definition' => 'The role level required to view the User Management page. (0=public)',
            'Type' => 'input'),
      array('name' => 'HomeChatLog',
            'Definition' => 'The role level required to view the Chat log on the home page. (0=public)',
            'Type' => 'input'),
      array('name' => 'HomePlayerList',
            'Definition' => 'The role level required to view the Players list on the home page. (0=public)',
            'Type' => 'input'),
      array('name' => 'HomeDiskUsage',
            'Definition' => 'The role level required to view the Disk Usage on the home page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ServerLoadGraph',
            'Definition' => 'The role level required to view the Server Load graph on the graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'OnlinePlayersGraph',
            'Definition' => 'The role level required to view the Online players graph on the graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'InMemoryGraph',
            'Definition' => 'The role level required to view the In Memory graph on the graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'UpdatesGraph',
            'Definition' => 'The role level required to view the Updates graph on the graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'CpuUsageGraph',
            'Definition' => 'The role level required to view the Cpu Usage graph on the graphs page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ConsoleCommandsAccess',
            'Definition' => 'The role level required to run commands in the console page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ConsoleStopCommand',
            'Definition' => 'The role level required to run the /stop command in the console page. (0=public)',
            'Type' => 'input'),
      array('name' => 'AccessDetailedPlayerData',
            'Definition' => 'The role level required to view extra details on the players page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ChangeServerINI',
            'Definition' => 'The role level required to change the server.ini file via the config page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ChangeManagerConfigINI',
            'Definition' => 'The role level required to change the manager-config.ini file via the config page. (0=public)',
            'Type' => 'input'),
      array('name' => 'ChangePHPConfigINI',
            'Definition' => 'The role level required to change the PHPConfig.ini file via the config page. (0=public)',
            'Type' => 'input'),
      array('name' => 'EnableRSS',
            'Definition' => 'If enabled will allow access to the /rss page, which provides details in an easy format for third party software.',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
      array('name' => 'DefaultPage',
            'Definition' => 'The default page to load. (Home/SignIn/Factions/Players/DiscoveredMap/FactionsMap/Graphs/About)',
            'Type' => 'input'),
      array('name' => 'GalaxiesDir',
            'Definition' => 'The directory the galaxies directories resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
      array('name' => 'ConsoleLog',
            'Definition' => 'The file path the console.log file resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
      array('name' => 'Manager',
            'Definition' => 'The file path the manager file resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
      array('name' => 'ManagerConfig',
            'Definition' => 'The file path the manager-config.ini file resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
      array('name' => 'LogsDir',
            'Definition' => 'The directory where the log directory resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
      array('name' => 'StatusBannerDir',
            'Definition' => 'The directory where the status banner resides. (This path is relative to the PHPConfig.ini location)',
            'Type' => 'input'),
    );
    $this->LoadView('ServerConfig');
  }
  public function Console(){
    $this->SessionRequired();
    $this->RoleRequired($this->Config['AccessConsolePage']);//Role required to view page
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){//Role required for specific feature
      $this->LogMessage('Extra Console Access Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    $this->LoadView('Console');
  }
  public function DiscoveredMap(){
    $this->RoleRequired($this->Config['AccessDiscoveredMapPage']);//Role required to view page
    include __DIR__ ."/../SectorData.php";
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('DiscoveredMap');
  }
  public function Factions(){
    $this->RoleRequired($this->Config['AccessFactionsPage']);//Role required to view page
    include __DIR__ ."/../SectorData.php";
    $this->Data['SectorData'] = $SectorData;
    $this->LoadView('Factions');
  }
  public function FactionsMap(){
    $this->RoleRequired($this->Config['AccessFactionsMapPage']);//Role required to view page
    include __DIR__ ."/../SectorData.php";
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('FactionsMap');
  }
  public function Graphs(){
    $this->RoleRequired($this->Config['AccessGraphsPage']);//Role required to view page
    $this->Data['ServerLoadGraph'] = false;
    $this->Data['OnlinePlayersGraph'] = false;
    $this->Data['InMemoryGraph'] = false;
    $this->Data['UpdatesGraph'] = false;
    $this->Data['CpuUsageGraph'] = false;

    if($this->RoleAccess($this->Config['ServerLoadGraph'])){//Role required for specific feature
      $this->Data['ServerLoadGraph'] = true;
    }
    if($this->RoleAccess($this->Config['OnlinePlayersGraph'])){//Role required for specific feature
      $this->Data['OnlinePlayersGraph'] = true;
    }
    if($this->RoleAccess($this->Config['InMemoryGraph'])){//Role required for specific feature
      $this->Data['InMemoryGraph'] = true;
    }
    if($this->RoleAccess($this->Config['UpdatesGraph'])){//Role required for specific feature
      $this->Data['UpdatesGraph'] = true;
    }
    if($this->RoleAccess($this->Config['CpuUsageGraph'])){//Role required for specific feature
      $this->Data['CpuUsageGraph'] = true;
    }

    $this->Data['MaxPlayers'] = `grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $this->LoadView('Graphs');
  }
  public function Home(){
    if($this->RoleAccess($this->Config['HomeChatLog'])){//Role required for specific feature
      $this->Data['ShowChatLog'] = true;
    }else{
      $this->Data['ShowChatLog'] = false;
    }

    if($this->RoleAccess($this->Config['HomePlayerList'])){//Role required for specific feature
      $this->Data['ShowOnlinePlayers'] = true;
    }else{
      $this->Data['ShowOnlinePlayers'] = false;
    }

    if($this->RoleAccess($this->Config['HomeDiskUsage'])){//Role required for specific feature
      $this->Data['ShowDiskUsage'] = true;
    }else{
      $this->Data['ShowDiskUsage'] = false;
    }

    $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
    $this->Data['CustomMessageOne'] = $this->Config['HomeCustomMessageOne'];
    $this->Data['CustomMessageTwo'] = $this->Config['HomeCustomMessageTwo'];
    $this->Data['CustomMessageThree'] = $this->Config['HomeCustomMessageThree'];
    $this->Data['CustomMessageFour'] = $this->Config['HomeCustomMessageFour'];
    $this->Data['GalaxyName'] = `grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $this->Data['OnlineStatus'] = `if [ $(pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g')) > /dev/null ]; then echo 'Online'; else echo 'Offline'; fi  | tr -d '[:space:]'`;
    if($this->Data['ShowDiskUsage']){
      $this->Data['DiskUsage'] = `df -h --total | awk '{print $5}' | tail -n 1 | sed -e 's/%//g'`;
    }
    if($this->Data['ShowOnlinePlayers'] && $this->Data['OnlineStatus'] == "Online"){
      $OnlinePlayers = explode(", ",`tac {$this->Config['ConsoleLog']} | grep 'online players (' | head -n 1 | sed -e 's/.*://g' -e 's/^.//g' -e 's/.$//g'`);
      $NewOnlinePlayers = array();
      $PID = `pidof AvorionServer | tr -d '\n'`;
      $ConnectionList = `awk "/Connection accepted from/,/joined the galaxy/" /proc/"{$PID}"/fd/3 | grep 'accepted\|joined' | sed -e 's/.*> //g' -e 's/ joined.*//g' -e 's/.*from //g' -e 's/:.*//g'`;
      if(strlen($OnlinePlayers[0]) > 1){
        foreach ($OnlinePlayers as $key => $value) {
          $Name = str_replace("\n", '', $value);
          $IP = `echo "{$ConnectionList}" | grep -B1 "{$Name}" | head -n1 | tr -d '\n'`;
          $NewOnlinePlayers[$Name]['IP'] = $IP;
          $GEO = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$IP));
          $NewOnlinePlayers[$Name]['CountryCode'] = strtolower($GEO['geoplugin_countryCode']);
          $NewOnlinePlayers[$Name]['CountryName'] = strtolower($GEO['geoplugin_countryName']);
        }
        $this->Data['OnlinePlayers']  = $NewOnlinePlayers;
      }
    }
    if($this->Config['ShowOnlinePlayerCount']){
      $this->Data['MaxPlayers'] = `grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
      $this->Data['OnlinePlayerCount'] = `netstat -tlunp 2> /dev/null | grep -iv ':270'|grep -i avorion|wc -l|tr -d "[:space:]"`;
    }
    $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");
    $this->LoadView('Home');
  }
  public function Players(){
    $this->RoleRequired($this->Config['AccessPlayerPage']);//Role required to view page
    if($this->RoleAccess($this->Config['AccessDetailedPlayerData'])){//Role required for specific feature
      $this->LogMessage('Extra Player Data Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    include __DIR__ ."/../PlayerData.php";
    $this->Data['PlayerData'] = $PlayerData;
    $this->LoadView('Players');
  }
  public function SignIn(){
    $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");
    $this->LoadView('SignIn');
  }
  public function UserManagment(){
    $this->SessionRequired();
    $this->RoleRequired($this->Config['AccessUserManagmentPage']);//Role required to view page
    $this->LoadView('UserManagment');
  }
  public function RSS(){
    if($this->Config['EnableRSS']){
      include __DIR__ .'/../core/RefreshModel.php';
      $RefreshModel = new RefreshModel;
      $this->Data['ServerLoad'] = $RefreshModel->GetCurrentServerLoad();
      $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");
      $this->Data['GalaxyName'] = `grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
      $this->Data['OnlineStatus'] = `if [ $(pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g')) > /dev/null ]; then echo 'Online'; else echo 'Offline'; fi`;
      $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
      if($this->Config['ShowOnlinePlayerCount']){
        $this->Data['MaxPlayers'] = `grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
        $this->Data['OnlinePlayerCount'] = `netstat -tlunp 2> /dev/null | grep -iv ':270'|grep -i avorion|wc -l|tr -d "[:space:]"`;
      }
      $this->LoadView('rss');
    }
  }
}
