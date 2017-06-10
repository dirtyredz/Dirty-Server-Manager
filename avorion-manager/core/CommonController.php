<?php
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
    $this->Config['GalaxiesDir'] = __DIR__.'/..'.$this->Config['GalaxiesDir'];
    $this->Config['ConsoleLog'] = __DIR__.'/..'.$this->Config['ConsoleLog'];
    $this->Config['Manager'] = __DIR__.'/..'.$this->Config['Manager'];
    $this->Config['ManagerConfig'] = __DIR__.'/..'.$this->Config['ManagerConfig'];
    $this->Config['LogsDir'] = __DIR__.'/..'.$this->Config['LogsDir'];
    $this->Config['StatusBannerDir'] = __DIR__.'/..'.$this->Config['StatusBannerDir'];
    //Parse manager-config.ini
    $this->ManagerConfig = parse_ini_file($this->Config['ManagerConfig'], true, INI_SCANNER_TYPED);//$Config;
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
      /** @var string $IPAddress performs a command line execution to retrieve servers IP address */
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":".$this->ManagerConfig['WEBPORT']."';</script>";
      exit;
    }
  }

  /**
   * [SignedInUsername description]
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
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      //echo's a redirect script back to page
      echo "<script>parent.self.location='http://".$IPAddress.":".$this->ManagerConfig['WEBPORT']."';</script>";
      exit;
    }
  }

  /**
   * Gets clients IP address using standard practive of checking multple SERVER variables
   * @method getUserIP
   * @return string Clients IPAddress
   */
  public function getUserIP()
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
 public function LogMessage($str)
 {
   //need to seperate message construction to validate IPAppres, getUserIP() can return UNKOWN
   //if todays manager.log already exsists then append message
   if(is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log')){
     //append todays manager.log with message
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP().': '.$str."\r\n", FILE_APPEND);
   }else{
     //Create todays manager.log with message
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP().': '.$str."\r\n");
   }
 }
}
