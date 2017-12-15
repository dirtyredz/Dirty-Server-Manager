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
    //is this config option an actuall file on the server?
    if(!is_file($this->Config['ServerLog'])){
      $this->Data['ERROR'][] = 'Config Option, ServerLog: "'.$this->Config['ServerLog'].'" Is not a valid file path.';
    }

    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    //If we already have a session, Prepare page for a logged in user
    if(!$this->SessionLoggedIn() && $cookie) {
      //if we have a cookie, lets validate it
      require_once __DIR__ . '/AccountModel.php';
      $AccountModel = new AccountModel;
      //if the cookie is valid prepare page for a logged in user
      $AccountModel->CheckCookie($cookie);
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
    $this->Data['IPAddress'] = $this->getGameIPAddress();
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
    $this->Data['AccessProfileParserPage'] = 'Disabled';

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
    if($this->RoleAccess($this->Config['AccessAlliancePage'])){//Role required for specific feature
      $this->Data['AccessAlliancePage'] = '';
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
    if($this->RoleAccess($this->Config['AccessSpaceInvadersPage'])){//Role required for specific feature
      $this->Data['AccessSpaceInvadersPage'] = '';
    }
    if($this->RoleAccess($this->Config['AccessProfilePage'])){//Role required for specific feature
      $this->Data['AccessProfileParserPage'] = '';
    }
    //Prepare additional data to put on the page and load the page
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
    $this->Data['IPAddress'] = $this->ManagerConfig['GameIPAddress'];
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
    $this->Data['ServerINIDetails'] = $ServerConfigController::ServerINIOptions;

    $this->Data['ManagerConfig'] = $ServerConfigController->GetManagerConfig();
    //Need to move to config controller
    $this->Data['ManagerConfigDetails'] = $ServerConfigController::ManagerConfigOptions;

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

    $this->Data['OnlineStatus'] = $this->onlineStatus();
    if($this->Data['OnlineStatus'] == "Online"){
      $this->Data['OnlineStatus'] = true;
      $this->Data['OnlineOnly'] = 'This Config can only be edited while the server is OFFLINE!';
    }else {
      $this->Data['OnlineStatus'] = false;
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
    //If user has access to the Delete Sector controls
    if($this->RoleAccess($this->Config['DeleteSector'])){//Role required for specific feature
      $this->Data['DeleteSector'] = true;
    }else{
      $this->Data['DeleteSector'] = false;
    }
    if($this->RoleAccess($this->Config['DeletePlayer'])){//Role required for specific feature
      $this->Data['DeletePlayer'] = true;
    }else{
      $this->Data['DeletePlayer'] = false;
    }
    //Include player data for the send mail form to use
    include __DIR__ ."/../PlayerData.php";
    //Load page
    $this->Data['PlayerData'] = $PlayerData;
    $this->Data['GroupsList'] = explode(",", shell_exec($this->Config['Manager'].' get_groups -o PHP'));
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
    require __DIR__ . '/../core/ViewModel.php';
    $ViewModel = new ViewModel();
    $Factions = $ViewModel->GetAllSectorData();
    $this->Data['SectorData'] = json_encode($Factions);
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
    require __DIR__ . '/../core/ViewModel.php';
    $ViewModel = new ViewModel();
    $Factions = $ViewModel->GetAllFactionData();
    $this->Data['FactionData'] = $Factions;

    foreach ($Factions as $value) {
      foreach ($value as $key => $val) {
        echo $key . ' => ' . $val . '</br>';
      }
    }
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
    require __DIR__ . '/../core/ViewModel.php';
    $ViewModel = new ViewModel();
    $Factions = $ViewModel->GetAllSectorData();
    $this->Data['SectorData'] = json_encode($Factions);
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
    $this->Data['ScriptMemoryGraph'] = false;
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['ServerLoadGraph'])){//Role required for specific feature
      $this->Data['ServerLoadGraph'] = true;
    }
    //role is required to be greater then config option, otherwise do not display
    if($this->RoleAccess($this->Config['ScriptMemoryGraph'])){//Role required for specific feature
      $this->Data['ScriptMemoryGraph'] = true;
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

    if($this->ManagerConfig['DailyRestart'] == 'true'){//Role required for specific feature
      $this->Data['DailyRestart'] = true;
    }else{
      $this->Data['DailyRestart'] = false;
    }

    //Prepare data to be displayed
    $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
    $this->Data['CustomMessageOne'] = $this->Config['HomeCustomMessageOne'];
    $this->Data['CustomMessageTwo'] = $this->Config['HomeCustomMessageTwo'];
    $this->Data['CustomMessageThree'] = $this->Config['HomeCustomMessageThree'];
    $this->Data['CustomMessageFour'] = $this->Config['HomeCustomMessageFour'];
    $this->Data['GalaxyName'] = $this->ManagerConfig['GALAXY'];
    $this->Data['OnlineStatus'] = $this->onlineStatus();
    if($this->Data['ShowDiskUsage']){
      $this->Data['DiskUsage'] = `df -h --total | awk '{print $5}' | tail -n 1 | sed -e 's/%//g'`;
    }

    if($this->Data['OnlineStatus'] == "Online"){
      //if online get the players list
      $OnlinePlayers = `tac {$this->Config['ServerLog']} | grep 'online players (' | head -n 1 | sed -e 's/.*://g' -e 's/^.//g'`;
      $OnlinePlayers = explode(", ",$OnlinePlayers);
      //if there are players online

      if(strlen($OnlinePlayers[0]) > 1){
        //we have players do we want to list them?
        if($this->Data['ShowOnlinePlayers']){
          $NewOnlinePlayers = array();
          //Grab all Player IP's connected to server during this uptime of server
          $ConnectionList = `awk "/Connection accepted from/,/joined the galaxy/" {$this->Config['ServerLog']} | grep 'accepted\|joined' | sed -e 's/.*> //g' -e 's/ joined.*//g' -e 's/.*from //g' -e 's/:.*//g'`;
          $ConnectionList = explode(PHP_EOL, $ConnectionList);
          //assign Online Players to IP address and connect with geoplugin to detect country status
          foreach ($OnlinePlayers as $key => $value) {
            $Name = str_replace("\n", '', $value);
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

          if($this->Config['HomeSortPlayerList'] == 'Name'){
            uksort($NewOnlinePlayers, function($a, $b) {
              return strtolower($a['Name']) <=> strtolower($b['Name']);
            });
          }elseif($this->Config['HomeSortPlayerList'] == 'Flag'){
            uasort($NewOnlinePlayers, function($a, $b) {
              return $a['CountryName'] <=> $b['CountryName'];
            });
          }

          $this->Data['OnlinePlayers']  = $NewOnlinePlayers;
        }
        //we have players do we want to show the count?
        if($this->Config['ShowOnlinePlayerCount']){
          $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
          $this->Data['OnlinePlayerCount'] = sizeof($OnlinePlayers);//`netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
        }
      }else{
        if($this->Config['ShowOnlinePlayerCount']){
          $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
          $this->Data['OnlinePlayerCount'] = 0;//`netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
        }
      }
    }else{
      if($this->Config['ShowOnlinePlayerCount']){
        $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
        $this->Data['OnlinePlayerCount'] = 0;//`netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
      }
    }


    $this->Data['IPAddress'] = $this->getGameIPAddress();
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
    require __DIR__ . '/../core/ViewModel.php';
    $ViewModel = new ViewModel();
    $Alliances = $ViewModel->GetAllAllianceData();
    $this->Data['AllianceData'] = $Alliances;
    //Loads the page
    $this->LoadView('Alliances');
  }

  /**
   * Loads and displays the players page
   * @method Players
   * @return void
   */
  public function Players($PHPFile = null)
  {
    $dir = __DIR__ .DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."databackups";
    $NewArr = array();
    
    if(is_dir($dir)){
      $files1 = $this->scan_dir($dir);
      if ($files1 && count($files1) > 0){
          $files1 = array_values($files1);
          array_unshift($files1, 'Current');
          foreach ($files1 as $key => $value) {
            if($value == 'Current'){
              if($PHPFile){
                $NewArr[] = array('FileName' => $value,'Date'=> date('d-m-Y_H-00-00'),'Selected' => false);
              }else{
                $NewArr[] = array('FileName' => $value,'Date'=> date('d-m-Y_H-00-00'),'Selected' => true);
              }
            }else{
              if($PHPFile && ($PHPFile.'.db') == $value){
                $NewArr[] = array('FileName' => preg_replace('/.db/','',$value),'Date'=> preg_replace('/_DSM|.db/','',$value),'Selected' => true);
              }else{
                $NewArr[] = array('FileName' => preg_replace('/.db/','',$value),'Date'=> preg_replace('/_DSM|.db/','',$value),'Selected' => false);
              }
            }
          }
          function date_compare($a, $b)
          {
              return date_timestamp_get(date_create_from_format('d-m-Y_H-i-s', $a['Date'])) < date_timestamp_get(date_create_from_format('d-m-Y_H-i-s', $b['Date']));
          }
          usort($NewArr, 'date_compare');
      }
    }

    $this->Data['DataList'] = $NewArr;
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
    //Loads the requested DB and grabs all the PlayerData
    require __DIR__ . '/../core/ViewModel.php';
    if($PHPFile and is_file(__DIR__ ."/../databackups/".$PHPFile.".db")){
      $ViewModel = new ViewModel(__DIR__ ."/../databackups/".$PHPFile.".db");
      $Players = $ViewModel->GetAllPlayerData();
      $this->Data['PlayerData'] = $Players;
    }else{
      $ViewModel = new ViewModel();
      $Players = $ViewModel->GetAllPlayerData();
      $this->Data['PlayerData'] = $Players;
    }
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
    $this->Data['IPAddress'] = $this->ManagerConfig['GameIPAddress'];
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
      $this->Data['IPAddress'] = $this->ManagerConfig['GameIPAddress'];
      $this->Data['GalaxyName'] = $this->ManagerConfig['GALAXY'];//`grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
      $this->Data['OnlineStatus'] = $this->onlineStatus();
      $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
      //if the config allows showing online player count
      if($this->Config['ShowOnlinePlayerCount']){
        if($this->Data['OnlineStatus'] == "Online"){
          //if online get the players list
          $OnlinePlayers = `tac {$this->Config['ConsoleLog']} | grep 'online players (' | head -n 1 | sed -e 's/.*://g' -e 's/^.//g' -e 's/.$//g'`;
          $OnlinePlayers = explode(", ",$OnlinePlayers);
          //if there are players online
          if(strlen($OnlinePlayers[0]) > 1){
            //we have players do we want to show the count?
            if($this->Config['ShowOnlinePlayerCount']){
              $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
              $this->Data['OnlinePlayerCount'] = sizeof($OnlinePlayers);//`netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
            }
          }
        }else{
          if($this->Config['ShowOnlinePlayerCount']){
            $this->Data['MaxPlayers'] = $this->ManagerConfig['MAX_PLAYERS'];//`grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
            $this->Data['OnlinePlayerCount'] = 0;//`netstat -tlunp 2> /dev/null | grep -iv ':270' | grep -i "[0-9]/Avorion" | wc -l | tr -d "[:space:]"`;
          }
        }
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


  private function getBetweenChar($string,$start,$end)
  {
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '0';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    $between = substr($string, $ini, $len);
    //$deleted = substr($string, stripos($string,$between.$end) + strlen($between.$end));
    return $between;//array($between,$deleted);
  }


  /**
   * Loads Profiling parsed page
   * @method ProfilePage
   * @return void
   */
  public function ProfileParser()
  {
    //If page access is not available, redirect to home page
    $this->RoleRequired($this->Config['AccessProfilePage']);

    //Load config controller
    require_once  __DIR__ .'/ServerConfigController.php';
    $ServerConfigController = new ServerConfigController();
    //Grab all INI configuration files data
    $ServerINI = $ServerConfigController->GetServerINI();

    if($ServerINI['profiling'] == 'true'){
      include __DIR__ .'/../core/ProfileParser.php';
      $ProfileParser = new ProfileParser(__DIR__.'/../../serverfiles/profiling_stats.txt');

      $Sectors = explode('########################################################', strstr($ProfileParser->ParsedData,'########################################################'));
      $Galaxy = [];
      function rootSort($a,$b){
        if ($a['root'] == $b['root']) {
          return 0;
        }
        return ($a['root'] > $b['root']) ? -1 : 1;
      };
      foreach ($Sectors as $key => $sector) {
        $Original = $sector;
        $coords = $this->getBetweenChar($Original,'(',')');
        if($coords != '0'){
          $Galaxy[$coords]['coords'] = preg_replace('/:/', ' : ', $coords);
          $Galaxy[$coords]['players'] = $this->getBetweenChar($Original,') (',' players');
          $Galaxy[$coords]['entities'] = $this->getBetweenChar($Original,'Entities: ',',');
          $Galaxy[$coords]['awake'] = $this->getBetweenChar($Original,', awake: ',PHP_EOL);
          $Galaxy[$coords]['none'] = $this->getBetweenChar($Original,'None: ',PHP_EOL);
          $Galaxy[$coords]['ship'] = $this->getBetweenChar($Original,'Ship: ',PHP_EOL);
          $Galaxy[$coords]['turret'] = $this->getBetweenChar($Original,'Turet: ',PHP_EOL);
          $Galaxy[$coords]['asteroid'] = $this->getBetweenChar($Original,'Asteroid: ',PHP_EOL);
          $Galaxy[$coords]['wreckage'] = $this->getBetweenChar($Original,'Wreckage: ',PHP_EOL);
          $Galaxy[$coords]['loot'] = $this->getBetweenChar($Original,'Loot: ',PHP_EOL);
          $Galaxy[$coords]['wormhole'] = $this->getBetweenChar($Original,'Wormhole: ',PHP_EOL);
          $Galaxy[$coords]['fighter'] = $this->getBetweenChar($Original,'Fighter: ',PHP_EOL);
          $Galaxy[$coords]['station'] = $this->getBetweenChar($Original,'Station: ',PHP_EOL);
          $Galaxy[$coords]['rootArrays'] = array();
          $Root = false;
          $RootIndex = 0;
          foreach (explode(PHP_EOL,$Original) as $key2 => $value2) {
            //if root assign new array
            if(preg_match('/(root:)/', $value2)){
              $Galaxy[$coords]['rootArrays'][$RootIndex]['root']=$this->getBetweenChar($value2,': ',' ms');
              $Root = true;
            }elseif($Root && $value2 != ''){
              $Galaxy[$coords]['rootArrays'][$RootIndex][]=$value2;
            }elseif($Root){
              $RootIndex += 1;
              $Root = false;
            }
          }
          usort($Galaxy[$coords]['rootArrays'],'rootSort');
        }
      }
      function sortAll($a,$b){
        if ($a['rootArrays'][0]['root'] == $b['rootArrays'][0]['root']) {
          return 0;
        }
        return ($a['rootArrays'][0]['root'] > $b['rootArrays'][0]['root']) ? -1 : 1;
      };
      usort($Galaxy,'sortAll');
      $this->Data['ParsedData'] = $Galaxy;
    }else{
      $this->Data['ParsedData'] = 'Pofiling for the server is disabled, edit server.ini to use the profile parser.';
    }

    //Load the page
    $this->LoadView('ProfileParser');
  }
}
