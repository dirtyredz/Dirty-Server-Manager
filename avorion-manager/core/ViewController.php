<?php
/**
 * Prepares data to be displayed to the page and then loads the page
 */
class ViewController extends CommonController
{
  /** @var array $Data All data to be available to the page will be inside this array */
  public $Data;

  /**
   * Prepares Data for every page.
   * @method __construct
   * @return void
   */
  function __construct()
  {
    parent::__construct();

    //An array of errors to display
    $this->Data['ERROR'] = array();
    //is this config option an actuall file on the server?
    if(!is_file($this->Config['ManagerConfig'])){
      $this->Data['ERROR'][] = 'Config Option, ManagerConfig: "'.$this->Config['ManagerConfig'].'" Is not a valid file path.';
    }
    //is this config option an actuall file on the server?
    if(!is_file($this->Config['Manager'])){
      $this->Data['ERROR'][] = 'Config Option, Manager: "'.$this->Config['Manager'].'" Is not a valid file path.';
    }
    //is this config option an actuall directory on the server?
    if(!is_dir($this->Config['LogsDir'])){
      $this->Data['ERROR'][] = 'Config Option, LogsDir: "'.$this->Config['LogsDir'].'" Is not a valid directory path.';
    }
    //is this config option an actuall directory on the server?
    if(!is_dir($this->Config['StatusBannerDir'])){
      $this->Data['ERROR'][] = 'Config Option, StatusBannerDir: "'.$this->Config['StatusBannerDir'].'" Is not a valid directory path.';
    }
    //is this config option an actuall file on the server?
    if(!is_file($this->Config['ConsoleLog'])){
      $this->Data['ERROR'][] = 'Config Option, ConsoleLog: "'.$this->Config['ConsoleLog'].'" Is not a valid file path.';
    }
  }

  /**
   * Logs and loads the file
   * @method LoadView
   * @param  string $View The name of the file to load from the views directory
   */
  private function LoadView($View)
  {
    //Makes the data available
    $Data = $this->Data;
    $this->LogMessage('Loading page: '.$View);
    include __DIR__.'/../views/'.$View.'.php';
  }

  /**
   * The initial page to be loaded.
   * @method Index
   * @return void
   */
  public function Index()
  {
    $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
    //Default all links to be disabled
    $this->Data['ConsoleAccess'] = 'Disabled';
    $this->Data['AccessServerConfigPage'] = 'Disabled';
    $this->Data['UserManagmentAccess'] = 'Disabled';
    $this->Data['AccessPlayerPage'] = 'Disabled';
    $this->Data['AccessFactionsPage'] = 'Disabled';
    $this->Data['AccessGraphsPage'] = 'Disabled';
    $this->Data['AccessDiscoveredMapPage'] = 'Disabled';
    $this->Data['AccessFactionsMapPage'] = 'Disabled';
    $this->Data['AccessSpaceInvadersPage'] = 'Disabled';
    $this->Data['AccessAlliancePage'] = 'Disabled';


    $this->Data['Username'] = '';
    $this->Data['LoggedIn'] = false;
    $this->Data['LoggedInClass'] = 'Disabled';
    //Checks for a cookie
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    //If we already have a session, Prepare page for a logged in user
    if($this->SessionLoggedIn()) {
      $this->Data['LoggedInClass'] = '';
      $this->Data['LoggedIn'] = true;
      $this->LogMessage('Accessed Web Interface with valid session.');
      $this->Data['Username'] = 'Logged in as: <span>'.$_SESSION['username'].'</span>';
    }elseif ($cookie) {
      //if we have a cookie, lets validate it
      require_once __DIR__ . '/AccountModel.php';
      $AccountModel = new AccountModel;
      //if the cookie is valid prepare page for a logged in user
      if($AccountModel->CheckCookie($cookie)){
        $this->Data['Username'] = 'Logged in as: <span>'.$_SESSION['username'].'</span>';
        $this->Data['LoggedInClass'] = '';
        $this->Data['LoggedIn'] = true;
      }
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessConsolePage'])){//Role required for specific feature
      $this->Data['ConsoleAccess'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessAlliancePage'])){//Role required for specific feature
      $this->Data['AccessAlliancePage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessServerConfigPage'])){//Role required for specific feature
      $this->Data['AccessServerConfigPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessUserManagmentPage'])){//Role required for specific feature
      $this->Data['UserManagmentAccess'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessPlayerPage'])){//Role required for specific feature
      $this->Data['AccessPlayerPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessFactionsPage'])){//Role required for specific feature
      $this->Data['AccessFactionsPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessGraphsPage'])){//Role required for specific feature
      $this->Data['AccessGraphsPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessDiscoveredMapPage'])){//Role required for specific feature
      $this->Data['AccessDiscoveredMapPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessFactionsMapPage'])){//Role required for specific feature
      $this->Data['AccessFactionsMapPage'] = '';
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['AccessSpaceInvadersPage'])){//Role required for specific feature
      $this->Data['AccessSpaceInvadersPage'] = '';
    }
    //Prepare additional data to put on the page and load the page
    $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
    $DefaultPage = $this->Config['DefaultPage'];
    $AllowedPages = array('Home','Factions','Players','DiscoveredMap','FactionsMap','Graphs','SignIn','About');
    if($this->Config['DefaultPage'] == 'SignIn' && $this->Data['LoggedIn'] || !in_array($DefaultPage,$AllowedPages)){
      $DefaultPage = 'Home';
    }
    $this->Data['DefaultPage'] = $DefaultPage;
    $this->LoadView('index');
  }

  /**
   * Prepares and Loads the about page
   * @method About
   * @return void
   */
  public function About()
  {
    //Get the current available version from github
    $AvailableVersion = `wget -O - -o /dev/null https://api.github.com/repos/dirtyredz/Dirty-Server-Manager/releases/latest | grep tag_name | sed -e 's/.*://g' -e 's/"//g' -e 's/,//g' | tr -d '[:blank:]'`;
    //Get the installed version from the manager
    $InstalledVersion = `{$this->Config['Manager']} version`;//`grep VERSION {$this->Config['Manager']} | head -n1 | sed -e 's/.*=//g'`;
    //Load the installed version to the page
    $this->Data['Version'] = $InstalledVersion;
    //Compare the versions and display the appropriate message
    if($InstalledVersion != $AvailableVersion){
      $this->Data['UpToDate'] = 'Dirty Server Manager is not up to date!';
    }else{
      $this->Data['UpToDate'] = 'Dirty Server Manager up to date!';
    }
    //Loads the page
    $this->LoadView('About');
  }

  /**
   * Prepares and loads the account page
   * @method Account
   * @return void
   */
  public function Account()
  {
    $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
    //No need to check for role here, if they dont have a session at all redirect them
    $this->SessionRequired();
    //Loads the page
    $this->LoadView('Account');
  }

  /**
   * Prepares and loads config page
   * @method ServerConfig
   * @return void
   */
  public function ServerConfig()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessServerConfigPage']);//Role required to view page
    //Load config controller
    require_once  __DIR__ .'/ServerConfigController.php';
    $ServerConfigController = new ServerConfigController();
    //Grab all INI configuration files data
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
      array('name' => 'SafePlayerInput ',
            'Definition' => 'Unkown',
            'Type' => 'select',
            'Values' => array('True'=>'true','False'=>'false')),
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
      array('name' => 'aliveSectorsPerPlayer',
            'Definition' => 'Number of sectors for each player to keep alive, based on a ranking system.(the more ships/stations of yours, the higher the priority)',
            'Type' => 'input'),
      array('name' => 'weakUpdate',
            'Definition' => 'When enabled sectors that have no players are updated in a more lightweight and simplified way, without huge physics calculations, which saves performance.',
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
    //Need to move to config controller
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
    $this->Data['PHPConfig'] = $ServerConfigController->GetPHPConfig();
    //need to move to config controller
    $this->Data['PHPConfigDetails'] = $ServerConfigController::PHPConfigDetails;
    //Set the ability to edit the options to false
    $this->Data['ChangeServerINI'] = false;
    $this->Data['ChangeManagerConfigINI'] = false;
    $this->Data['ChangePHPConfigINI'] = false;
    //If logged in user has access to change the server INI
    //We should also check here if the serve is offline
    if($this->RoleAccess($this->Config['ChangeServerINI'])){//Role required for specific feature
      $this->Data['ChangeServerINI'] = true;
    }
    //If logged in user has access to change the server INI
    //We should also check here if the serve is offline
    if($this->RoleAccess($this->Config['ChangeManagerConfigINI'])){//Role required for specific feature
      $this->Data['ChangeManagerConfigINI'] = true;
    }
    //If logged in user has access to change the server INI
    if($this->RoleAccess($this->Config['ChangePHPConfigINI'])){//Role required for specific feature
      $this->Data['ChangePHPConfigINI'] = true;
    }
    //Load the page
    $this->LoadView('ServerConfig');
  }

  /**
   * Prepares and Loads Console page
   * @method Console
   * @return void
   */
  public function Console()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessConsolePage']);//Role required to view page
    //If logged in user has access to the commands bar
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){//Role required for specific feature
      $this->LogMessage('Extra Console Access Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    //If user has access to the send mail form
    if($this->RoleAccess($this->Config['SendMail'])){//Role required for specific feature
      $this->Data['SendMail'] = true;
    }else{
      $this->Data['SendMail'] = false;
    }
    //Include player data for the send mail form to use
    include __DIR__ ."/../PlayerData.php";
    //Load page
    $this->Data['PlayerData'] = $PlayerData;
    $this->LoadView('Console');
  }

  /**
   * Prepares and Loads Discovered Map
   * @method DiscoveredMap
   * @return void
   */
  public function DiscoveredMap()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessDiscoveredMapPage']);//Role required to view page
    //Loades Sector Data into php for parsing
    include __DIR__ ."/../SectorData.php";
    //Send sector data to JS so it can manipulate it
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('DiscoveredMap');
  }

  /**
   * Prepares and Loads Factions page
   * @method Factions
   * @return void
   */
  public function Factions()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessFactionsPage']);//Role required to view page
    //Loades Sector Data into php for parsing
    include __DIR__ ."/../SectorData.php";
    //Send sector data to page so it can manipulate it
    $this->Data['SectorData'] = $SectorData;
    $this->LoadView('Factions');
  }

  /**
   * Prepares and loads the Factions Map Page
   * @method FactionsMap
   * @return void
   */
  public function FactionsMap()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessFactionsMapPage']);//Role required to view page
    //Loades Sector Data into php for parsing
    include __DIR__ ."/../SectorData.php";
    //Send sector data to JS so it can manipulate it
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('FactionsMap');
  }

  /**
   * Prepares data for the graphs page and loads it
   * @method Graphs
   * @return void
   */
  public function Graphs()
  {
    //Role is required to be greater then config option, otherwise redirect
    $this->RoleRequired($this->Config['AccessGraphsPage']);//Role required to view page
    //default the graphs to false display
    $this->Data['ServerLoadGraph'] = false;
    $this->Data['OnlinePlayersGraph'] = false;
    $this->Data['InMemoryGraph'] = false;
    $this->Data['UpdatesGraph'] = false;
    $this->Data['CpuUsageGraph'] = false;
    $this->Data['MemoryUsageGraph'] = false;
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['ServerLoadGraph'])){//Role required for specific feature
      $this->Data['ServerLoadGraph'] = true;
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['OnlinePlayersGraph'])){//Role required for specific feature
      $this->Data['OnlinePlayersGraph'] = true;
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['InMemoryGraph'])){//Role required for specific feature
      $this->Data['InMemoryGraph'] = true;
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['UpdatesGraph'])){//Role required for specific feature
      $this->Data['UpdatesGraph'] = true;
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['CpuUsageGraph'])){//Role required for specific feature
      $this->Data['CpuUsageGraph'] = true;
    }
    if($this->RoleAccess($this->Config['MemoryUsageGraph'])){//Role required for specific feature
      $this->Data['MemoryUsageGraph'] = true;
    }
    //Prepare Data and load
    $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $this->LoadView('Graphs');
  }

  /**
   * Prepares data for Home page and Load the page
   * @method Home
   * @return void
   */
  public function Home()
  {
    //if role comparison with config options is successfull, Display Chat Log
    if($this->RoleAccess($this->Config['HomeChatLog'])){//Role required for specific feature
      $this->Data['ShowChatLog'] = true;
    }else{
      $this->Data['ShowChatLog'] = false;
    }
    //if role comparison with config options is successfull, add chat log input
    if($this->RoleAccess($this->Config['ChatLogInput'])){//Role required for specific feature
      $this->Data['ChatLogInput'] = true;
    }else{
      $this->Data['ChatLogInput'] = false;
    }
    //if role comparison with config options is successfull, Display Players List
    if($this->RoleAccess($this->Config['HomePlayerList'])){//Role required for specific feature
      $this->Data['ShowOnlinePlayers'] = true;
    }else{
      $this->Data['ShowOnlinePlayers'] = false;
    }
    //if role comparison with config options is successfull, Display Disk Usage
    if($this->RoleAccess($this->Config['HomeDiskUsage'])){//Role required for specific feature
      $this->Data['ShowDiskUsage'] = true;
    }else{
      $this->Data['ShowDiskUsage'] = false;
    }
    //Prepare data to be displayed
    $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
    $this->Data['CustomMessageOne'] = $this->Config['HomeCustomMessageOne'];
    $this->Data['CustomMessageTwo'] = $this->Config['HomeCustomMessageTwo'];
    $this->Data['CustomMessageThree'] = $this->Config['HomeCustomMessageThree'];
    $this->Data['CustomMessageFour'] = $this->Config['HomeCustomMessageFour'];
    $this->Data['GalaxyName'] = $this->ManagerConfig['GALAXY'];
    //Check if pid status is available, display online if pid is available
    $this->Data['OnlineStatus'] = `if [ $(pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g')) > /dev/null ]; then echo 'Online'; else echo 'Offline'; fi  | tr -d '[:space:]'`;
    if($this->Data['ShowDiskUsage']){
      $this->Data['DiskUsage'] = `df -h --total | awk '{print $5}' | tail -n 1 | sed -e 's/%//g'`;
    }
    if($this->Data['ShowOnlinePlayers'] && $this->Data['OnlineStatus'] == "Online"){
      //Grab last Online Players report
      $OnlinePlayers = explode(", ",`tac {$this->Config['ConsoleLog']} | grep 'online players (' | head -n 1 | sed -e 's/.*://g' -e 's/^.//g' -e 's/.$//g'`);
      $NewOnlinePlayers = array();
      $PID = `pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g') | tr -d '\n'`;
      //Grab all Player IP's connected to server during this uptime of server
      $ConnectionList = `awk "/Connection accepted from/,/joined the galaxy/" /proc/"{$PID}"/fd/3 | grep 'accepted\|joined' | sed -e 's/.*> //g' -e 's/ joined.*//g' -e 's/.*from //g' -e 's/:.*//g'`;
      $ConnectionList = explode(PHP_EOL, $ConnectionList);

      if(strlen($OnlinePlayers[0]) > 1){
        //assign Online Players to IP address and connect with geoplugin to detect country status
        foreach ($OnlinePlayers as $key => $value) {
          $Name = str_replace("\n", '', $value);
          //$TempName = quotemeta(str_replace("\n", '', $value));
          //$IP = `echo "{$ConnectionList}" | grep -B1 -e "{$TempName}" | head -n1 | tr -d '\n'`;
          foreach ($ConnectionList as $key => $value) {
            if($Name == $value){
              //error_log($Name.' - '.$ConnectionList[$key-1]);
              $IP = $ConnectionList[$key-1];
            }
          }
          $NewOnlinePlayers[$Name]['IP'] = $IP;
          $GEO = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$IP));
          if($GEO['geoplugin_status'] == '404'){
            $NewOnlinePlayers[$Name]['CountryCode'] = '';
            $NewOnlinePlayers[$Name]['CountryName'] = '';
          }else{
            $NewOnlinePlayers[$Name]['CountryCode'] = 'flag flag-'.strtolower($GEO['geoplugin_countryCode']);
            $NewOnlinePlayers[$Name]['CountryName'] = strtolower($GEO['geoplugin_countryName']);
          }
        }
        $this->Data['OnlinePlayers']  = $NewOnlinePlayers;
      }
    }
    if($this->Config['ShowOnlinePlayerCount']){
      $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
      $this->Data['OnlinePlayerCount'] = `netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
    }
    $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
    //Loads page
    $this->LoadView('Home');
  }

  /**
   * Loads and displays the alliance page
   * @method Alliances
   * @return void
   */
  public function Alliances()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessAlliancePage']);
    //if config option is accessible via config
    if($this->RoleAccess($this->Config['AccessDetailedAllianceData'])){
      //Log and assigns boolean to page to display more data
      $this->LogMessage('Extra Alliance Data Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    include __DIR__ ."/../PlayerData.php";
    $this->Data['PlayerData'] = $PlayerData;
    //Includes the AllianceData.php page, and pass to the page
    include __DIR__ ."/../AllianceData.php";
    $this->Data['AllianceData'] = $AllianceData;
    //Loads the page
    $this->LoadView('Alliances');
  }

  /**
   * Loads and displays the players page
   * @method Players
   * @return void
   */
  public function Players()
  {
    //Role required in comparison to the config, if not redirect
    $this->RoleRequired($this->Config['AccessPlayerPage']);
    //if config option is accessible via config
    if($this->RoleAccess($this->Config['AccessDetailedPlayerData'])){
      //Log and assigns boolean to page to display more data
      $this->LogMessage('Extra Player Data Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    //Includes the PlayerData.php page, and pass to the page
    include __DIR__ ."/../PlayerData.php";
    $this->Data['PlayerData'] = $PlayerData;
    //Includes the AllianceData.php page, and pass to the page
    include __DIR__ ."/../AllianceData.php";
    $this->Data['AllianceData'] = $AllianceData;
    //Loads the page
    $this->LoadView('Players');
  }

  /**
   * Loads and displays Sign In page
   * @method SignIn
   * @return void
   */
  public function SignIn()
  {
    $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
    $this->LoadView('SignIn');
  }

  /**
   * Loads and displays User Managment page
   * @method UserManagment
   * @return void
   */
  public function UserManagment()
  {
    //session required
    $this->SessionRequired();
    //Role level required to access page
    $this->RoleRequired($this->Config['AccessUserManagmentPage']);
    //Loads User Managment page
    $this->LoadView('UserManagment');
  }

  /**
   * Loads and displays Rss page
   * @method RSS
   * @return void
   */
  public function RSS()
  {
    //if the config allows RSS
    if($this->Config['EnableRSS']){
      //Access RefreshModel directly
      include __DIR__ .'/../core/RefreshModel.php';
      $RefreshModel = new RefreshModel;
      //Settup data for page to display
      $this->Data['ServerLoad'] = $RefreshModel->GetCurrentServerLoad();
      $this->Data['IPAddress'] = $this->ManagerConfig['IPAddress'];
      $this->Data['GalaxyName'] = $this->ManagerConfig['GALAXY'];//`grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
      $this->Data['OnlineStatus'] = `if [ $(pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g')) > /dev/null ]; then echo 'Online'; else echo 'Offline'; fi`;
      $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
      //if the config allows showing online player count
      if($this->Config['ShowOnlinePlayerCount']){
        $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
        $this->Data['OnlinePlayerCount'] = `netstat -tlunp 2> /dev/null | grep -iv ':270'|grep -i avorion|wc -l|tr -d "[:space:]"`;
      }
      //display rss page
      $this->LoadView('rss');
    }
  }

  /**
   * Loads Space Invaders page
   * @method SpaceInvaders
   * @return void
   */
  public function SpaceInvaders()
  {
    //If page access is not available, redirect to home page
    $this->RoleRequired($this->Config['AccessSpaceInvadersPage']);
    //Get IPAddress for Spaceinvaders JS to use
    $this->Data['IPAddress'] = $this->getUserIP();
    //Load the page
    $this->LoadView('SpaceInvaders');
  }
}
