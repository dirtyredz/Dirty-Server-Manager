<?php
/**
 * AccountModel Handles all account related interactions with Database and Cookie's
 */
class AccountModel extends CommonController
{
  /** @var array $Login holds the entire account database */
  public $Login = array();
  function __construct(){
    parent::__construct();

    //Get the database and store it in $Login
    include __DIR__ .'/../Database.php';
    $this->Login = $Login;
    $this->Secret = "";
  }

  /**
   * Gets the users role returns it
   * @method GetUserRole
   * @param  string $Username The username of the role you want returned
   * @return integer The role of the user provided
   */
  public function GetUserRole($Username)
  {
    //need type verification
    //also array key verification
    return $this->Login[$Username]['Role'];
  }

  /**
   * Verifies the cookie provided upon entering the site.
   * @method CheckCookie
   * @param  string $cookie An associtive array recieved from $_COOKIE as a string
   * @return bool
   */
  public function CheckCookie($cookie)
  {
    //Get Cookie details
    list ($Key, $token, $mac) = explode(':', $cookie);
    //if Key and Token Hashed equals the third part of the cookie($mac)
    if (hash_hmac('sha256', $Key . ':' . $token, $this->Secret) == $mac) {
      //Loop through users searching for a user with a matching key
      foreach ($this->Login as $Username => $UserArray) {
        if(array_key_exists('Token',$UserArray) && array_key_exists($Key,$UserArray['Token'])){
          //if a user with a token is found check if the token matches whats inside the key
          if($UserArray['Token'][$Key] == $token){
            //Cookie verified, log user in.
            $this->LogMessage($Username.' Cookie data validated!');
            $this->LogIn($Username,false);
            return true;
          }
        }
      }
    }
    //Cookie was found but failed verification
    $this->LogMessage('Cookie used to attempt login but was not validated, Destroying cookie.');
    //Remove the cookie
    unset($_COOKIE['rememberme']);
    setcookie('rememberme', null, -1, '/');
    return false;
  }

  /**
   * Logs user in, and sets sessions and cookie
   * @method LogIn
   * @param  string $Username The username of the user to login
   * @param  bool $forever  bollean check to set cookie to remember login
   * @return void
   */
  public function LogIn($Username,$forever)
  {
    //Logs message
    $this->LogMessage($Username.' Signed In.');
    //start session
    if(!isset($_SESSION)) { session_start(); };
    //Well store/interact with all usersname in full caps
    $Username = strtoupper($Username);
    //if forever boolean then set up cookie
    if(isset($forever) && ($forever == true)) {
      //destroy old cookie
      if (isset($_COOKIE['rememberme'])) {
          unset($_COOKIE['rememberme']);
          setcookie('rememberme', null, -1, '/');
      }
      //Hash the token
      $token = hash_hmac('sha256', random_int(PHP_INT_MIN, PHP_INT_MAX), $this->Secret);
      $key = hash_hmac('sha256', random_int(PHP_INT_MIN, PHP_INT_MAX), $this->Secret);
      //Store the token into the database
      $this->_SetToken($Username, $key,$token);
      //Generate Cookie
      $cookie = $key . ':' . $token;
      $mac = hash_hmac('sha256', $cookie, $this->Secret);
      $cookie .= ':' . $mac;
      //Set Cookie forever
      setcookie('rememberme', $cookie,time() + (10 * 365 * 24 * 60 * 60));
    }
    //Sets up the session
    $_SESSION['username'] = $Username;
    $_SESSION['login'] = "true";
    //Gets the users role from the database
    $_SESSION['role'] = $this->GetUserRole($Username);
  }

  /**
   * Verifies the provided password against the hashed password for the provided username
   * @method VerifyPassword
   * @param  string $Username The username of the password to fetch
   * @param  string $Password the password to test against
   * @return bool
   */
  public function VerifyPassword($Username,$Password)
  {
    //Upper case Username
    $Username = strtoupper($Username);
    //Verify password
    if(password_verify($Password,$this->Login[$Username]['Hash'])) {
      return true;
    }
    return false;
  }

  /**
   * Stores the token/key into the provided users database
   * @method _SetToken
   * @param  string $Username Username to grab from the database
   * @param  string $Key Generated key string
   * @param  string $Token Generated token string
   * @return void
   */
  public function _SetToken($Username,$Key,$Token)
  {
    //Log message
    $this->LogMessage($Username.' Generated Token.');
    //if user already has a token set.
    if(array_key_exists('Token',$this->Login[$Username])){
      //if the user has more then 5 tokens
      if(count($this->Login[$Username]['Token']) >= 5){
        //push the last token out and put the new one in
        $newArr = array($key => $Token);
        $this->Login[$Username]['Token'] = array_merge($newArr,$this->Login[$Username]['Token']);
        $this->Login[$Username]['Token'] = array_slice($this->Login[$Username]['Token'], 0, 5);
      }else{
        //add the token
        $this->Login[$Username]['Token'][$Key] = $Token;
      }
    }else{
      //Add token/key to users database
      $this->Login[$Username]['Token'] = array($Key => $Token);
    }
    //Store into database
    $this->StoreDatabase();
  }

  /**
   * Logs uers out
   * @method LogOut
   * @param  string $Username Username of user to log out
   * @param  boolean $AllLocations Removes all tokens from database upon logout
   * @return void
   */
  public function LogOut($Username,$AllLocations = false)
  {
    //start session
    if(!isset($_SESSION)) { session_start(); };
    //if loging out when signed in with a cookie
    if ($AllLocations || isset($_COOKIE['rememberme'])) {
      //remove all tokens
      unset($this->Login[$Username]['Token']);
      //store database
      $this->StoreDatabase();
      //destroy cookie
      unset($_COOKIE['rememberme']);
      setcookie('rememberme', null, -1, '/');
    }
    //destroy sessions
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

  /**
   * Resets password to "12345678" for provided username
   * @method ResetPassword
   * @param  string $Username username of user to reset password
   * @return boolean always true
   */
  public function ResetPassword($Username)
  {
    /** @var string $Username Username of user force all Caps */
    $Username = strtoupper($Username);
    //Log message
    $this->LogMessage('Password Reset for: '.$Username);
    //Sets users password to the hashed version of "123456789"
    $this->Login[$Username]['Hash'] = password_hash('123456789', PASSWORD_DEFAULT);
    //Store it in the database
    $this->StoreDatabase();
    return true;
  }

  /**
   * Changes the password of provided user to provided password after verifing old password
   * @method ChangePassword
   * @param  string $Username Username of user to change password
   * @param  string $OldPass  Users old password
   * @param  string $NewPass  users new password
   * @return boolean false if password verification failed
   */
  public function ChangePassword($Username,$OldPass,$NewPass)
  {
    /** @var string $Username Username of user force all Caps */
    $Username = strtoupper($Username);
    //logs message
    $this->LogMessage('Password Reset for: '.$Username);
    //Verifies $OldPass
    if(password_verify($OldPass,$this->Login[$Username]['Hash'])) {
        //if password is verifies then hash $NewPass
        $this->Login[$Username]['Hash'] = password_hash($NewPass, PASSWORD_DEFAULT);
        //Store Database
        $this->StoreDatabase();
        return true;
    }else {
      return false;
    }
  }

  /**
   * Deletes the provided username from the database
   * @method DeleteUser
   * @param  string $Username provided username of the user
   * @return boolean always true
   */
  public function DeleteUser($Username)
  {
    //Logs message
    $this->LogMessage('Account Deleted for user: '.$Username);
    /** @var string $Username Force username to all caps */
    $Username = strtoupper($Username);
    //remove username from database array
    unset($this->Login[$Username]);
    //store database
    $this->StoreDatabase();
    return true;
  }

  /**
   * Changes role of the provided username to the provided role
   * @method ChangeRole
   * @param  string $Username username string of user to change role
   * @param  mixed $Role New role for user can be integer or string
   * @return boolean always true
   */
  public function ChangeRole($Username,$Role)
  {
    //logs message
    $this->LogMessage('Role changed for user: '.$Username);
    //Sets the role to the database array
    $this->Login[$Username]['Role'] = $Role;
    //Stores the database
    $this->StoreDatabase();
    return true;
  }

  /**
   * Addes user to the database
   * @method AddUser
   * @param  string $Username Username string of the user to add
   * @param  string $Role role of the new user
   * @return boolean always true
   */
  public function AddUser($Username,$Role = '10')
  {
    //logs message
    $this->LogMessage('Account Created for user: '.$Username.', With role level: '.$Role);
    /** @var string $Username Force username to all caps */
    $Username = strtoupper($Username);
    //hashes default password "123456789"
    //Consider a config option for default password
    //Sets password and role to the database array
    $this->Login[$Username]['Hash'] = password_hash('123456789', PASSWORD_DEFAULT);
    $this->Login[$Username]['Role'] = $Role;
    //stores the database
    $this->StoreDatabase();
    return true;
  }

  /**
   * Checks if a user already exsists in the database array
   * @method UserExsists
   * @param  string $Username username string of the user to check
   * @return boolean
   */
  public function UserExsists($Username)
  {
    /** @var string $Username Force username to all caps */
    $Username = strtoupper($Username);
    //if the user exsists return true
    if(array_key_exists ($Username,$this->Login)){
      return true;
    }
    //if the user does not exsists
    return false;
  }

  /**
   * Lists all users except for those in the exclude array
   * @method ListUsers
   * @param  array $Exclude array of usernames to not include in the return array
   * @return array list of users
   */
  public function ListUsers(array $Exclude)
  {
    //logs message
    $this->LogMessage('Listing users!');
    /** @var array $returnArray Sets up the return list */
    $returnArray = array();
    //foreach user in the database user
    foreach ($this->Login as $Username => $value) {
      //if user is not in the $Exclude array
      if(!in_array($Username,$Exclude)){
        //add username as key and role as value to return array
        $returnArray[$Username] = $this->GetUserRole($Username);
      }
    }
    return $returnArray;
  }

  /**
   * Takes the Database array and stores the variable into Database.php
   * @method StoreDatabase
   * @return void
   */
  private function StoreDatabase()
  {
    //Generates file contents
    $file = "<?php\n\n\$Login=".var_export($this->Login, TRUE).";";
    //Put the contents into the file
    file_put_contents(__DIR__ .'/../Database.php', $file);
  }
}
