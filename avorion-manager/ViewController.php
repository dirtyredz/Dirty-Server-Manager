<?php
class ViewController {
  public $Data;
  public $Config;
  function __construct(){
    include_once __DIR__ . '/Common.php';
    include_once __DIR__ . '/Config.php';
    $this->Config = $Config;
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
  private function SessionRequired(){
    if(!isset($_SESSION)) { session_start(); };
    if(!isset($_SESSION['login'])) {
      session_destroy();
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
      exit;
    }
  }
  private function SessionLoggedIn(){
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['login']) && $_SESSION["login"] == "true") {
      return true;
    }
    return false;
  }
  private function SessionRole(){
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['role'])){
      return $_SESSION['role'];
    }
    return 0;
  }
  private function RoleRequired($Role){
    if($this->SessionRole() < $Role){
      if(!isset($_SESSION)) { session_start(); };
      session_destroy();
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
      exit;
    }
  }
  private function LoadView($View){
    $Data = $this->Data;
    LogMessage('Loading page: '.$View);
    include __DIR__.'/views/'.$View.'.php';
  }
  public function Index(){
    $IPAddress = exec("hostname -I | awk '{print $1}'");
    $this->Data['ConsoleAccess'] = 'Disabled';
    $this->Data['UserManagmentAccess'] = 'Disabled';
    $this->Data['AccessPlayerPage'] = 'Disabled';
    $this->Data['AccessFactionsPage'] = 'Disabled';
    $this->Data['AccessGraphsPage'] = 'Disabled';
    $this->Data['AccessDiscoveredMapPage'] = 'Disabled';
    $this->Data['AccessFactionsMapPage'] = 'Disabled';
    if($this->SessionRole() >= $this->Config['AccessConsolePage']){//Role required for specific feature
      $this->Data['ConsoleAccess'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessUserManagmentPage']){//Role required for specific feature
      $this->Data['UserManagmentAccess'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessPlayerPage']){//Role required for specific feature
      $this->Data['AccessPlayerPage'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessFactionsPage']){//Role required for specific feature
      $this->Data['AccessFactionsPage'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessGraphsPage']){//Role required for specific feature
      $this->Data['AccessGraphsPage'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessDiscoveredMapPage']){//Role required for specific feature
      $this->Data['AccessDiscoveredMapPage'] = '';
    }
    if($this->SessionRole() >= $this->Config['AccessFactionsMapPage']){//Role required for specific feature
      $this->Data['AccessFactionsMapPage'] = '';
    }

    $this->Data['Username'] = '';
    $this->Data['LoggedIn'] = false;
    $this->Data['LoggedInClass'] = 'Disabled';
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    if($this->SessionLoggedIn()) {
      $this->Data['LoggedInClass'] = '';
      $this->Data['LoggedIn'] = true;
      LogMessage('Accessed Web Interface with valid session.');
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
    $this->Data['IPAddress'] = exec("hostname -I | awk '{print $1}'");

    $this->LoadView('index');
  }
  public function About(){
    $AvailableVersion = `wget -O - -o /dev/null https://raw.githubusercontent.com/dirtyredz/Dirty-Server-Manager/master/VERSION`;
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
  public function Console(){
    $this->SessionRequired();
    $this->RoleRequired($this->Config['AccessConsolePage']);//Role required to view page
    if($this->SessionLoggedIn() && $this->SessionRole() >= $this->Config['ConsoleCommandsAccess']){//Role required for specific feature
      LogMessage('Extra Console Access Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    $this->LoadView('Console');
  }
  public function DiscoveredMap(){
    $this->RoleRequired($this->Config['AccessDiscoveredMapPage']);//Role required to view page
    include __DIR__ ."/SectorData.php";
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('DiscoveredMap');
  }
  public function Factions(){
    $this->RoleRequired($this->Config['AccessFactionsPage']);//Role required to view page
    include __DIR__ ."/SectorData.php";
    $this->Data['SectorData'] = $SectorData;
    $this->LoadView('Factions');
  }
  public function FactionsMap(){
    $this->RoleRequired($this->Config['AccessFactionsMapPage']);//Role required to view page
    include __DIR__ ."/SectorData.php";
    $this->Data['SectorData'] = json_encode( $SectorData );
    $this->LoadView('FactionsMap');
  }
  public function Graphs(){
    $this->RoleRequired($this->Config['AccessGraphsPage']);//Role required to view page
    if($this->SessionLoggedIn() && $this->SessionRole() >= $this->Config['ExtraGraphs']){//Role required for specific feature
      LogMessage('Extra Graphs Data Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    $this->Data['MaxPlayers'] = `grep MAX {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $this->LoadView('Graphs');
  }
  public function Home(){
    $this->Data['ShowOnlinePlayers'] = $this->Config['ShowOnlinePlayers'];
    $this->Data['ShowOnlinePlayerCount'] = $this->Config['ShowOnlinePlayerCount'];
    $this->Data['ShowDiskUsage'] = $this->Config['ShowDiskUsage'];
    $this->Data['ShowChatLog'] = $this->Config['ShowChatLog'];
    $this->Data['CustomMessageOne'] = $this->Config['HomeCustomMessageOne'];
    $this->Data['CustomMessageTwo'] = $this->Config['HomeCustomMessageTwo'];
    $this->Data['CustomMessageThree'] = $this->Config['HomeCustomMessageThree'];
    $this->Data['CustomMessageFour'] = $this->Config['HomeCustomMessageFour'];
    $this->Data['GalaxyName'] = `grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $this->Data['OnlineStatus'] = `if [ $(pidof $(grep SERVER= {$this->Config['Manager']} | sed -e 's/.*=//g')) > /dev/null ]; then echo 'Online'; else echo 'Offline'; fi  | tr -d '[:space:]'`;
    if($this->Config['ShowDiskUsage']){
      $this->Data['DiskUsage'] = `df -h --total | awk '{print $5}' | tail -n 1 | sed -e 's/%//g'`;
    }
    if($this->Config['ShowOnlinePlayers'] && $this->Data['OnlineStatus'] == "Online"){
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
    if($this->SessionLoggedIn() && $this->SessionRole() >= $this->Config['AccessDetailedPlayerData']){//Role required for specific feature
      LogMessage('Extra Player Data Granted.');
      $this->Data['AccessGranted'] = true;
    }else{
      $this->Data['AccessGranted'] = false;
    }
    include __DIR__ ."/PlayerData.php";
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
      include __DIR__ .'/RefreshModel.php';
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
