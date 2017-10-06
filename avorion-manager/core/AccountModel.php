<?php
/**
 * AccountModel Handles all account related interactions with Database and Cookie's
 */
class AccountModel extends CommonController
{
  public $DB;

  function __construct(){
    parent::__construct();

    $this->Secret = "";

    $AccountsColumns = array(
      'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
      'Name' => 'TEXT',
      'Hash' => 'TEXT',
      'Role' => 'INTEGER'
    );

    $TokensColumns = array(
      'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
      'UserID' => 'INTEGER',
      'Token' => 'TEXT',
      'Key' => 'TEXT'
    );

    //Database setup
    require_once __DIR__ . '/../core/MySQLite.php';
    $this->DB = new MySQLite();
    //Create dynamic table so if future updates adds a new field
    $this->DB->create_dynamic_table('accounts', $AccountsColumns);
    $this->DB->create_dynamic_table('tokens', $TokensColumns);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE ID=:ID');
    $stmt->bindValue(':ID', 1, SQLITE3_INTEGER);
    $result = $stmt->execute();
    if (!$result->fetchArray()) {
      $this->DB->insert('accounts', array('ID' => 1, 'Name' => 'ADMIN', 'Hash' => '$2y$10$MoNHGw.CAeDClZfttf5ykutDh1wws/M82EAz704lSYqqrfDe6GTCu', 'Role' => 100));
    }
  }

  /**
   * Gets the users role returns it
   * @method GetUserRole
   * @param  string $Username The username of the role you want returned
   * @return integer The role of the user provided
   */
  public function GetUserRole($Username)
  {
    if(!is_string($Username)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT Role FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      return $User['Role'];
    }
    return false;
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

      $stmt = $this->DB->prepare('SELECT accounts.Name FROM tokens INNER JOIN accounts ON tokens.UserID = accounts.ID WHERE tokens.Token=:Token');
      $stmt->bindValue(':Token', $token, SQLITE3_TEXT);
      $result = $stmt->execute();
      $User = $result->fetchArray(SQLITE3_ASSOC);
      if ($User) {
        $this->LogMessage($User['Name'].' Cookie data validated!');
        $this->LogIn($User['Name'],false);
        return true;
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
      $this->LogMessage($Username.' Signed In. with Forever option.');

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
    if(!is_string($Username) and !is_string($Password)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT Hash FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      if(password_verify($Password,$User['Hash'])) {
        return true;
      }
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

    if(!is_string($Username)){
      $this->LogMessage('SetToken Failed.');
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      $this->DB->insert('tokens', array('UserID' => $User['ID'], 'Key' => $Key, 'Token' => $Token));
    }
    return false;
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
      if(is_string($Username)){
        $Username = strtoupper($Username);
        $Username = htmlspecialchars($Username);

        $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
        $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
        $result = $stmt->execute();
        $User = $result->fetchArray(SQLITE3_ASSOC);
        if ($User) {
          $stmt = $this->DB->prepare('DELETE FROM tokens WHERE UserID=:UserID');
          $stmt->bindValue(':UserID', $User['ID'], SQLITE3_TEXT);
          $stmt->execute();
        }
      }
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
    if(!is_string($Username)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      $this->DB->update('accounts', array('ID' => $User['ID']), array('Hash' => password_hash('123456789', PASSWORD_DEFAULT)));
      return true;
    }
    return false;
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
    if(!is_string($Username) and !is_string($OldPass) and !is_string($NewPass)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID, Hash FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      if(password_verify($OldPass,$User['Hash'])){
        $this->DB->update('accounts', array('ID' => $User['ID']), array('Hash' => password_hash($NewPass, PASSWORD_DEFAULT)));
        return true;
      }
    }
    return false;
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
    if(!is_string($Username)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('DELETE FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $stmt->execute();
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

    if(!is_string($Username) and !is_numeric($Role)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      $this->DB->update('accounts', array('ID' => $User['ID']), array('Role' => $Role));
      return true;
    }
    return false;
  }

  /**
   * Addes user to the database
   * @method AddUser
   * @param  string $Username Username string of the user to add
   * @param  string $Role role of the new user
   * @return boolean always true
   */
  public function AddUser($Username,$Role = 10)
  {
    //logs message
    $this->LogMessage('Account Created for user: '.$Username.', With role level: '.$Role);

    if(!is_string($Username) and !is_int($Role)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if (!$User) {
      $this->DB->insert('accounts', array('Name' => $Username, 'Hash' => password_hash('123456789', PASSWORD_DEFAULT), 'Role' => $Role));
      return true;
    }
    return false;
  }

  /**
   * Checks if a user already exsists in the database array
   * @method UserExsists
   * @param  string $Username username string of the user to check
   * @return boolean
   */
  public function UserExsists($Username)
  {
    if(!is_string($Username)){
      return false;
    }
    $Username = strtoupper($Username);
    $Username = htmlspecialchars($Username);

    $stmt = $this->DB->prepare('SELECT ID FROM accounts WHERE Name=:Name');
    $stmt->bindValue(':Name', $Username, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      return true;
    }
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

    $returnArray = array();

    $stmt = $this->DB->prepare('SELECT Name, Role FROM accounts');
    $result = $stmt->execute();
    while ($User = $result->fetchArray(SQLITE3_ASSOC)) {
        if(!in_array($User['Name'],$Exclude)){
          $returnArray[$User['Name']] = $User['Role'];
        }
    }
    return $returnArray;
  }
}
