<?php
class AccountModel {
    public $Login = array();
    public $Secret = 'fnsdkjfnslfmsalkhiuadasas;aifc35498343543598v/.)U(*U)';
    function __construct()
    {
        include __DIR__ .'/Database.php';
        $this->Login = $Login;
        include_once __DIR__ .'/Common.php';
    }
    public function GetUserRole($Username){
      return $this->Login[$Username]['Role'];
    }
    public function CheckCookie($cookie){
        //Get Cookie details
        list ($Key, $token, $mac) = explode(':', $cookie);
        //if Key and Token Hashed equals the third part of the cookie($mac)
        if (hash_hmac('sha256', $Key . ':' . $token, $this->Secret) == $mac) {
          //Loop through users searching for a user with a matching key
          foreach ($this->Login as $Username => $UserArray) {
            if(array_key_exists('Token',$UserArray) && array_key_exists($Key,$UserArray['Token'])){
              //if a user with a token is found check if the token matches whats inside the key
              if($UserArray['Token'][$Key] == $token){
                LogMessage($Username.' Cookie data validated!');
                $this->LogIn($Username,false);
                return true;
              }
            }
          }
        }
        LogMessage('Cookie used to attempt login but was not validated, Destroying cookie.');
        unset($_COOKIE['rememberme']);
        setcookie('rememberme', null, -1, '/');
        return false;
    }
    public function LogIn($Username,$forever){
        LogMessage($Username.' Signed In.');
        session_start();
        $Username = strtoupper($Username);
        if(isset($forever) && ($forever == true)) {
          if (isset($_COOKIE['rememberme'])) {
              unset($_COOKIE['rememberme']);
              setcookie('rememberme', null, -1, '/');
          }
          //Hash the token
          $token = hash_hmac('sha256', random_int(PHP_INT_MIN , PHP_INT_MAX), $this->Secret);
          $key = hash_hmac('sha256', random_int(PHP_INT_MIN , PHP_INT_MAX), $this->Secret);
          $this->_SetToken($Username, $key,$token);
          $cookie = $key . ':' . $token;
          $mac = hash_hmac('sha256', $cookie, $this->Secret);
          $cookie .= ':' . $mac;
          setcookie('rememberme', $cookie,time() + (10 * 365 * 24 * 60 * 60));
        }
        $_SESSION['username'] = $Username;
        $_SESSION['login'] = "true";
        $_SESSION['role'] = $this->GetUserRole($Username);
    }
    public function VerifyPassword($Username,$Password){
        $Username = strtoupper($Username);
        if(password_verify($Password,$this->Login[$Username]['Hash'])) {
          return true;
        }
        return false;
    }
    public function _SetToken($Username,$Key,$Token){
      LogMessage($Username.' Generated Token.');

      if(array_key_exists('Token',$this->Login[$Username])){

        if(count($this->Login[$Username]['Token']) >= 5){
          $newArr = array($key => $Token);
          $this->Login[$Username]['Token'] = array_merge($newArr,$this->Login[$Username]['Token']);
          $this->Login[$Username]['Token'] = array_slice($this->Login[$Username]['Token'], 0, 5);
        }else{
          $this->Login[$Username]['Token'][$Key] = $Token;
        }

      }else{
        $this->Login[$Username]['Token'] = array($Key => $Token);
      }
      $this->StoreDatabase();
    }
    public function LogOut($Username,$AllLocations = false){
        session_start();
        if ($AllLocations || isset($_COOKIE['rememberme'])) {
          unset($this->Login[$Username]['Token']);
          $this->StoreDatabase();
          unset($_COOKIE['rememberme']);
          setcookie('rememberme', null, -1, '/');
        }
        $_SESSION = array();
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
    }
    public function ResetPassword($Username){
      $return = array();
      $Username = strtoupper($Username);
      LogMessage('Password Reset for: '.$Username);
      $this->Login[$Username]['Hash'] = password_hash('123456789', PASSWORD_DEFAULT);
      $this->StoreDatabase();
      return true;
    }
    public function ChangePassword($Username,$OldPass,$NewPass){
      $return = array();
      $Username = strtoupper($Username);
      LogMessage('Password Reset for: '.$Username);
      if(password_verify($OldPass,$this->Login[$Username]['Hash'])) {
          $this->Login[$Username]['Hash'] = password_hash($NewPass, PASSWORD_DEFAULT);
          $this->StoreDatabase();
          return true;
      }else {
        return false;
      }
    }
    public function DeleteUser($Username){
      LogMessage('Account Deleted for user: '.$Username);
      $Username = strtoupper($Username);
      unset($this->Login[$Username]);
      $this->StoreDatabase();
      return true;
    }
    public function ChangeRole($Username,$Role){
      LogMessage('Role changed for user: '.$Username);
      $this->Login[$Username]['Role'] = $Role;
      $this->StoreDatabase();
      return true;
    }
    public function AddUser($Username,$Role = '10'){
      LogMessage('Account Created for user: '.$Username.', With role level: '.$Role);
      $Username = strtoupper($Username);
      $this->Login[$Username]['Hash'] = password_hash('123456789', PASSWORD_DEFAULT);
      $this->Login[$Username]['Role'] = $Role;
      $this->StoreDatabase();
      return true;
    }
    public function UserExsists($Username){
      $Username = strtoupper($Username);
      if(array_key_exists ($Username,$this->Login)){
        return true;
      }
      return false;
    }
    public function ListUsers($Exclude){
        LogMessage('Listing users!');
        $returnArray = array();
        foreach ($this->Login as $Username => $value) {
          if(!in_array($Username,$Exclude)){
            $returnArray[$Username] = $this->GetUserRole($Username);
          }
        }
        return $returnArray;
    }
    private function StoreDatabase(){
      $file = "<?php\n\n\$Login=".var_export($this->Login, TRUE).";";
      file_put_contents(__DIR__ .'/Database.php', $file);
    }
}
