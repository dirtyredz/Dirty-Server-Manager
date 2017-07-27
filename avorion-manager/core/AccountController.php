<?php
/**
 * AccountController
 * Handles incoming POST and GET request for account related functions
 * ie. login, logout, password change, role change, cookie validation
 *
 */
class AccountController extends CommonController
{
  /** @var class Handles DB connections and cookie validation */
  private $AccountModel;

  /**
   * Construct for class, calls extension construct and sets up AccountModel class
   * @method __construct
   * @return void
   */
  function __construct()
  {
    parent::__construct();

    require_once  __DIR__ .'/AccountModel.php';
    $this->AccountModel = new AccountModel();
  }

  /**
   * Resets password for username to default "123456789"
   * @method ResetPassword
   * @return string json encoded array
   */
  public function ResetPassword()
  {
    /** @var string $Username username of user to reset password */
    $Username = htmlspecialchars($_POST['ResetPass']);

    /** @var array Settup array to build response */
    $return = array();

    //If current logged in users role is higher then $Username's role
    if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
      //Reset password
      if($this->AccountModel->ResetPassword($Username)){
        $return['success'] = True;
        $return['message'] = 'Password Reset for: '.$Username;
      }else {
        $return['success'] = False;
      }
    }else{
      $return['success'] = False;
      $return['message'] = 'You cannot reset the password to a user of equal or higher role then your own.';
    }
    //Send results back to form
    return json_encode($return);
  }

  /**
   * Takes Old password and new password, Verifies Old password authentication and  replaces it with the new password
   * Gets current logged in user
   *
   * Requires Post "OldPass" Current users Old Password
   * Requires Post "NewPass" Current users New Password
   * @method ChangePassword
   * @return string json encoded array
   */
  public function ChangePassword()
  {

    /** @var string $OldPassword Users Old Password */
    $OldPassword = htmlspecialchars($_POST['OldPass']);
    /** @var string $NewPassword Users New Password */
    $NewPassword = htmlspecialchars($_POST['NewPass']);
    /** @var array $return Settup array to build response */
    $return = array();

    //Gets current logged in user, returns false if null
    if($Username = $this->SignedInUsername()){
      //Attempts to change the users password, returns false if old password fails authentication
      if($this->AccountModel->ChangePassword($Username,$OldPassword,$NewPassword)){
          $return['success'] = True;
          $return['message'] = 'Password Changed!';
      }else {
        $return['success'] = False;
        $return['message'] = 'Old password does not authenticate!';
      }
    }
    //Send results back to form
    return json_encode($return);
  }

  /**
   * Deleted provided User if current logged in user has a greater role then the user being Deleted
   *
   * Requires POST "DeleteUser" Username to be deleted
   * @method DeleteUser
   * @return string json encoded array
   */
  public function DeleteUser()
  {
    /** @var string $Username Username of user to delete */
    $Username = htmlspecialchars($_POST['DeleteUser']);
    /** @var array $return Settup array to build response */
    $return = array();
    //If current logged in users role is higher then $Username's role
    if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
      //Deletes the user, always returns true
      if($this->AccountModel->DeleteUser($Username)){
        $return['success'] = True;
        $return['username'] = $Username;
        $return['message'] = $Username."'s Account has been deleted";
      }else{
        $return['success'] = False;
      }
    }else{
      $return['success'] = False;
      $return['message'] = 'You cannot delete the account to a user of equal or higher role then your own.';
    }
    //Send results back to form
    return json_encode($return);
  }

  /**
   * Changes the role of a specific user
   *
   * Requires POST "ChangeRole" Username of the user to change the role of.
   * Requires POST "Role" The new Role to give the User
   * @method ChangeRole
   * @return string json encoded array
   */
  public function ChangeRole()
  {
    /** @var string $Username Username of user to change roles */
    $Username = htmlspecialchars($_POST['ChangeRole']);
    /** @var number $UserRole new role for the user to be assigned */
    $UserRole = htmlspecialchars($_POST['Role']);
    /** @var array $return Settup array to build response */
    $return = array();

    //Filters Users new role to ensure it is an integer and between 1 and 99
    if (filter_var($UserRole, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>99))) === false) {
        $return['success'] = False;
    }

    //if Currently logged in users role is higher then the user whos role were trying to change
    if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
      //if currently logged in users role is higher then the role were trying to sets
      //cant set a rol higher then your own
      if($this->GreaterRole($UserRole)){
        //Change role of the provided user
        if($this->AccountModel->ChangeRole($Username,$UserRole)){
          $return['success'] = True;
          $return['message'] = $Username.' Role has been changed.';
        }else{
          $return['success'] = False;
          $return['message'] = 'An error occured on the back end.';
        }
      }else{
        $return['success'] = False;
        $return['message'] = 'You cannot change a users role equal or higher then your own.';
      }
    }else{
      $return['success'] = False;
      $return['message'] = 'You cannot change a role of a user whos role is equal or higher then your own.';
    }
    //Send results back to form
    return json_encode($return);
  }

  /**
   * Checks a users username and password verifies authentication of the provided CheckCredentials
   *
   * Requires POST "username" Username of the user.
   * Requires POST "password" Password for account of user.
   * Optional POST "forever" determines logged in forever.
   * @method CheckCredentials
   * @return string json encoded array
   */
  public function CheckCredentials()
  {
      /** @var bool $Forever toggles whether or not to apply a cookie to keep user logged in. */
      $Forever = null;
      if(isset($_POST['forever'])){
        $Forever = htmlspecialchars($_POST['forever']);
      }

      /** @var string $Username username needed for logging in*/
      $Username = htmlspecialchars($_POST['username']);
      /** @var string $Password password needed for logging in*/
      $Password = htmlspecialchars($_POST['password']);
      /** @var array $return Settup array to build response */
      $return = array();
      //Does password matched stored database password
      if($this->AccountModel->VerifyPassword($Username,$Password)){
        //Log user in and send $Forever to build cookie
        $this->AccountModel->LogIn($Username,$Forever);
        $return['success'] = True;
      }else{
        $return['success'] = False;
      }
      //Return info back to form
      return json_encode($return);
  }

  /**
   * Lists all users except ADMIN and currently signed in user
   * @method ListUsers
   * @return string json encoded array
   */
  public function ListUsers()
  {
    //This should be expanded to allow for arguments instead of hard coded in.
    /** @var array $Return A list of all users except ADMIN and Signed in user. */
    $Return = $this->AccountModel->ListUsers(array('ADMIN',$this->SignedInUsername()));
    //Return info back to form
    return json_encode($Return);
  }

  /**
   * Adds a user to the accounts Database
   * Requires POST "NewUser" the name of the new user to AddUser
   * Requires POST "NewUserRole" The role level to apply to the new user upon creation
   * @method AddUser
   * @return string json encoded array
   */
  public function AddUser()
  {
      /** @var string $Username Name of user to add */
      $Username = htmlspecialchars(strtoupper($_POST['NewUser']));
      /** @var string $NewUserRole Role of the new user */
      $NewUserRole = htmlspecialchars($_POST['NewUserRole']);
      /** @var array $return Array to return back to the form */
      $return = array();

      //if the provided username is empty
      if(empty($Username)){
        $return['success'] = False;
        $return['message'] = 'User cannot be blank!';
        //Return json array and kill script
        echo json_encode($return);
        exit;
      }
      //If the username already exsists in the Database
      if($this->AccountModel->UserExsists($Username)){
        $return['success'] = False;
        $return['message'] = 'User already exists!';
        //Return json array and kill script
        echo json_encode($return);
        exit;
      }
      //if the users role is Higher or equal then the currently signed in users role
      //I beleive I already wrote a common function to handle this better
      if($this->SessionRole() <= $NewUserRole){
        $return['success'] = False;
        $return['message'] = 'You cannot create a user of equal or higher role then your own.';
        //Return json array and kill script
        echo json_encode($return);
        exit;
      }
      //If the script hasent been killed at this point
      //Add user to the database
      if($this->AccountModel->AddUser($Username,$NewUserRole)){
        $return['success'] = True;
        //returns username and role back to form so JS can generate the user into the Lists
        //so we dont have to call list users again.
        $return['username'] = $Username;
        $return['role'] = $this->AccountModel->GetUserRole($Username);
        $return['message'] = 'Account created for: '.$Username;
      }else{
        $return['success'] = False;
        $return['message'] = 'Failed to add user!';
      }
      //Return json array
      return json_encode($return);
  }

  /**
   * Logs the currently logged in user out
   * Optional GET "AllLocations" if true will remove all cookie tokens from database
   * @method LogOut
   * @return string json encoded array
   */
  public function LogOut()
  {
    /** @var boolean $AllLocations handles removing all cookie tokens from database */
    $AllLocations = false;
    //Sets the variable up
    if(isset($_GET['AllLocations'])){
      $AllLocations = htmlspecialchars($_GET['AllLocations']);
    }
    //Logs currently signed in user out and passes whether to destroy all cookie data in database
    $this->AccountModel->LogOut($this->SignedInUsername(),$AllLocations);
    //header("Location: http://".$IPAddress.":8080");
    //echo's a redirect script back to page
    return "<script>parent.self.location.reload();</script>";
  }
}
