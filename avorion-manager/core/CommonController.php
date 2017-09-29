<?php

use xPaw\SourceQuery\SourceQuery;
/**
 * Common methods and variables to all controllers
 */
class CommonController
{
  /** @var array $Config array built by parsing PHPConfig.ini making it accesible to all controllers */
  public $Config;
  /** @var array $ManagerConfig array built by parsing manager-config.ini making it accesible to all controllers */
  public $ManagerConfig;
  /**
   * Settup controller and builds $Config
   * @method __construct
   */
  function __construct()
  {
    //include __DIR__ . '/../Config.php';
    //$this->Config = $Config;
    //Parse PHPConfig.ini
    $this->Config = parse_ini_file(__DIR__ . '/../PHPConfig.ini', true, INI_SCANNER_TYPED);//$Config;
    //prepend these config options to reflect current directory in relation to PHPConfig.ini and not this file
    $this->Config['ConsoleLog'] = __DIR__.'/..'.$this->Config['ConsoleLog'];
    $this->Config['ServerLog'] = __DIR__.'/..'.$this->Config['ServerLog'];
    $this->Config['Manager'] = __DIR__.'/..'.$this->Config['Manager'];
    $this->Config['ManagerConfig'] = __DIR__.'/..'.$this->Config['ManagerConfig'];
    $this->Config['LogsDir'] = __DIR__.'/..'.$this->Config['LogsDir'];
    $this->Config['StatusBannerDir'] = __DIR__.'/..'.$this->Config['StatusBannerDir'];
    //Parse manager-config.ini
    $this->ManagerConfig = parse_ini_file($this->Config['ManagerConfig'], true, INI_SCANNER_TYPED);//$Config;

    if(empty($this->ManagerConfig['GalaxyDirectory'])){
      $this->ManagerConfig['GalaxyDirectory'] = __DIR__.'/../../.avorion/galaxies';
    }
  }


  public function scan_dir($dir) {
      $ignored = array('.', '..', '.svn', '.htaccess');

      $files = array();
      foreach (scandir($dir) as $file) {
          if(!is_file($dir . '/' . $file)) continue;
          if (in_array($file, $ignored)) continue;
          $files[$file] = filemtime($dir . '/' . $file);
      }

      arsort($files);
      $files = array_keys($files);

      return ($files) ? $files : false;
  }

  public function preg_grep_keys($pattern, $input, $flags = 0) {
      return array_intersect_key($input, array_flip(preg_grep($pattern, array_keys($input), $flags)));
  }

  public function BackupDB(){
    if($this->ManagerConfig['BackupDB']){
      if (!file_exists(__DIR__.'/../databackups')) {
        mkdir(__DIR__.'/../databackups', 0777, true);
      }
      $this->LogMessage("Backing Up DB",true);
      echo "Backing Up DB" . PHP_EOL;
      $date = new DateTime();
      if (!copy(__DIR__.'/../DSM.db', __DIR__.'/../databackups/'.$date->format('d-m-Y_H-00-00').'_DSM.db')) {
        echo "failed to copy $file...\n";
      }
      $files = $this->scan_dir(__DIR__.'/../databackups');
      $now   = time();

      foreach ($files as $file) {
        if (is_file($file)) {
          if ($now - filemtime($file) >= 60 * 60 * 24 * $this->ManagerConfig['BackupDBDays']) {
            unlink($file);
          }
        }
      }
    }
  }

  /**
   * Checks if a Session "login" Exsists if not echos redirect script
   * @method SessionRequired
   */
  public function SessionRequired()
  {
    if(!isset($_SESSION)) { session_start(); };
    if(!isset($_SESSION['login'])) {
      session_destroy();
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location.reload();</script>";
      exit;
    }
  }

  /**
   * Returns the username of the currently logged in user.
   * @method SignedInUsername
   */
  public function SignedInUsername()
  {
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['username'])){
      return $_SESSION['username'];
    }
    return false;
  }

  /**
   * [SessionLoggedIn description]
   * @method SessionLoggedIn
   */
  public function SessionLoggedIn()
  {
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['login']) && $_SESSION["login"] == "true") {
      return true;
    }
    return false;
  }

  /**
   * [SessionRole description]
   * @method SessionRole
   */
  public function SessionRole()
  {
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['role'])){
      return $_SESSION['role'];
    }
    return 0;
  }

  /**
   * [RoleAccess description]
   * @method RoleAccess
   * @param  [type]     $Role [description]
   */
  public function RoleAccess($Role)
  {
    if($this->SessionRole() >= $Role){//Role required for specific feature
      return true;
    }
    return false;
  }

  /**
   * [GreaterRole description]
   * @method GreaterRole
   * @param  [type]      $Role [description]
   */
  public function GreaterRole($Role)
  {
    if($this->SessionRole() > $Role){//Role required for specific feature
      return true;
    }
    return false;
  }

  /**
   * compares current logged in user's role against provided role
   * redirects if provided role is greater then logged in users role
   * @method RoleRequired
   * @param  mixed $Role string or int to be tested against
   */
  public function RoleRequired($Role)
  {
    //if logged in users role is less then provided role
    //need to verify Role to an integer
    if($this->SessionRole() < $Role){
      if(!isset($_SESSION)) { session_start(); };
      session_destroy();
      //header("Location: http://".$IPAddress.":8080");
      //echo's a redirect script back to page
      echo "<script>parent.self.location.reload();</script>";
      exit;
    }
  }

  /**
   * Gets clients IP address using standard practive of checking multple SERVER variables
   * @method getUserIP
   * @return string Clients IPAddress
   */
  public function getUserIP($console = false)
  {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
       $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
       $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
       $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
       $ipaddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
       $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
       $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
       $ipaddress = $_SERVER['REMOTE_ADDR'];
   else if($console)
      $ipaddress = 'Console';
    else
       $ipaddress = 'UNKNOWN';

    //I need to remember that this has a potential to return 'UNKOWN'
   return $ipaddress;
 }

 /**
  * Logs the provided message to todays manager.log file
  * @method LogMessage
  * @param  string $str Message to log to manager.log
  */
 public function LogMessage($str,$console = false)
 {
   //need to seperate message construction to validate IPAppres, getUserIP() can return UNKOWN
   //if todays manager.log already exsists then append message
   if(is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log')){
     //append todays manager.log with message
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP($console).': '.$str."\r\n", FILE_APPEND);
   }else{
     //Create todays manager.log with message
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP($console).': '.$str."\r\n");
   }
 }

 /**
  * Gets the active games IP address
  * @method getGameIPAddress
  * @return string IPAddress
  */
  public function getGameIPAddress(){

    if(empty($this->ManagerConfig['GameIPAddress'])){
      if(defined('CurledIP')){
        return CurledIP;
      }
      $curl_handle=curl_init();
      curl_setopt($curl_handle, CURLOPT_URL,'http://checkip.dyndns.com/');
      curl_setopt($curl_handle, CURLOPT_HEADER, 0);
      curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
      curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Dirty Server Manager');
      $query = curl_exec($curl_handle);
      curl_close($curl_handle);
      preg_match('/Current IP Address: \[?([:.0-9a-fA-F]+)\]?/', $query, $m);
      $externalIp = $m[1];

      if (!defined('CurledIP')) define('CurledIP', $externalIp);
      return $externalIp;
    }

    return $this->ManagerConfig['GameIPAddress'];
  }

  /**
   * Gets the Rcon IP address
   * @method getRconIPAddress
   * @return string IPAddress
   */
   public function getRconIPAddress(){
     if(empty($this->ManagerConfig['RconIPAddress'])){ return $this->getGameIPAddress(); }
     return $this->ManagerConfig['RconIPAddress'];
   }

  /**
   * Gets steasm qeury port set at runtime
   * @method getSteamQueryPort
   * @return string port
   */
   public function getSteamQueryPort(){
     if(empty($this->ManagerConfig['SteamQueryPort'])){ return 27020; }
     return $this->ManagerConfig['SteamQueryPort'];
   }

   /**
    * Gets the RCON port set at runtime
    * @method getRconPort
    * @return string port
    */
    public function getRconPort(){
      if(empty($this->ManagerConfig['RconPort'])){ return 27015; }
      return $this->ManagerConfig['RconPort'];
    }

 /**
  * gets the online/offline status of the process
  * @method onlineStatus
  * @return string online/offline
  */
  public function onlineStatus(){
    $rtn = 'Offline';
    require __DIR__ . '/../SourceQuery/bootstrap.php';

    $Query = new SourceQuery( );

    try{
      $Query->Connect( $this->getGameIPAddress(), $this->getSteamQueryPort(), 1, SourceQuery::SOURCE );
      $Info = $Query->GetInfo( );
      error_log('INFO');
      foreach ($Info as $key => $value) {
        error_log($key.' => '.$value);
      }

      $rtn = 'Online';
    }
    catch( Exception $e ){
      error_log($e->getMessage( ));

      try{
        $Query->Disconnect( );
        $Query->Connect( $this->getRconIPAddress(), $this->getRconPort(), 1, SourceQuery::SOURCE );
        $Query->SetRconPassword( 'Testing' );

        error_log($Query->Rcon( 'status' ));
        $rtn = 'Online';
      }
      catch( Exception $a ){
        error_log($a->getMessage( ));
      }

    }
    finally{
      $Query->Disconnect( );
    }

    return $rtn;
  }
}
