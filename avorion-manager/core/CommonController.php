<?php
class CommonController{
  public $Config;
  function __construct(){
    //include __DIR__ . '/../Config.php';
    //$this->Config = $Config;
    $this->Config = parse_ini_file(__DIR__ . '/../PHPConfig.ini', true, INI_SCANNER_TYPED);//$Config;
    $this->Config['GalaxiesDir'] = __DIR__.'/..'.$this->Config['GalaxiesDir'];
    $this->Config['ConsoleLog'] = __DIR__.'/..'.$this->Config['ConsoleLog'];
    $this->Config['Manager'] = __DIR__.'/..'.$this->Config['Manager'];
    $this->Config['ManagerConfig'] = __DIR__.'/..'.$this->Config['ManagerConfig'];
    $this->Config['LogsDir'] = __DIR__.'/..'.$this->Config['LogsDir'];
    $this->Config['StatusBannerDir'] = __DIR__.'/..'.$this->Config['StatusBannerDir'];
  }
  public function SessionRequired(){
    if(!isset($_SESSION)) { session_start(); };
    if(!isset($_SESSION['login'])) {
      session_destroy();
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
      exit;
    }
  }
  public function SignedInUsername(){
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['username'])){
      return $_SESSION['username'];
    }
    return false;
  }
  public function SessionLoggedIn(){
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['login']) && $_SESSION["login"] == "true") {
      return true;
    }
    return false;
  }
  public function SessionRole(){
    if(!isset($_SESSION)) { session_start(); };
    if(isset($_SESSION['role'])){
      return $_SESSION['role'];
    }
    return 0;
  }
  public function RoleAccess($Role){
    if($this->SessionRole() >= $Role){//Role required for specific feature
      return true;
    }
    return false;
  }
  public function GreaterRole($Role){
    if($this->SessionRole() > $Role){//Role required for specific feature
      return true;
    }
    return false;
  }
  public function RoleRequired($Role){
    if($this->SessionRole() < $Role){
      if(!isset($_SESSION)) { session_start(); };
      session_destroy();
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
      exit;
    }
  }

  public function getUserIP() {
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
     return $ipaddress;
 }

 public function LogMessage($str){
   if(is_file(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log')){
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP().': '.$str."\r\n", FILE_APPEND);
   }else{
     file_put_contents(dirname(__FILE__).'/../logs/'.date('d-m-Y').'_manager.log', date('Y-m-d H-i-s').'|[PHP]: '.$this->getUserIP().': '.$str."\r\n");
   }
 }
}
?>
