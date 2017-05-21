<?php
class AccountController extends CommonController{
    private $AccountModel;

    function __construct(){
      parent::__construct();

      require_once  __DIR__ .'/AccountModel.php';
      $this->AccountModel = new AccountModel();
    }
    //FUNCTIONS
    public function ResetPassword(){
      $Username = htmlspecialchars($_POST['ResetPass']);

      $return = array();

      if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
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
      echo json_encode($return);
    }

    public function ChangePassword(){
      $OldPassword = htmlspecialchars($_POST['OldPass']);
      $NewPassword = htmlspecialchars($_POST['NewPass']);

      $return = array();
      if($Username = $this->SignedInUsername()){
        if($this->AccountModel->ChangePassword($Username,$OldPassword,$NewPassword)){
            $return['success'] = True;
            $return['message'] = 'Password Changed!';
        }else {
          $return['success'] = False;
          $return['message'] = 'Old password does not authenticate!';
        }
      }
      echo json_encode($return);
    }

    public function DeleteUser(){
      $Username = htmlspecialchars($_POST['DeleteUser']);
      $return = array();

      if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
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
      echo json_encode($return);
    }

    public function ChangeRole(){
      $Username = htmlspecialchars($_POST['ChangeRole']);
      $UserRole = htmlspecialchars($_POST['Role']);

      $return = array();

      if (filter_var($UserRole, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>99))) === false) {
          $return['success'] = False;
      }

      if($this->GreaterRole($this->AccountModel->GetUserRole($Username))){
        if($this->GreaterRole($UserRole)){
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
      echo json_encode($return);
    }

    public function CheckCredentials(){
        $Forever = null;
        if(isset($_POST['forever'])){
          $Forever = $_POST['forever'];
          $Forever = htmlspecialchars($Forever);
        }

        $Username = htmlspecialchars($_POST['username']);
        $Password = htmlspecialchars($_POST['password']);

        $return = array();

        if($this->AccountModel->VerifyPassword($Username,$Password)){
          $this->AccountModel->LogIn($Username,$Forever);
          $return['success'] = True;
        }else{
          $return['success'] = False;
        }
        echo json_encode($return);
    }

    public function ListUsers(){
      $Return = $this->AccountModel->ListUsers(array('ADMIN',$this->SignedInUsername()));
      echo json_encode($Return);
    }

    public function AddUser(){
        $Username = htmlspecialchars(strtoupper($_POST['NewUser']));
        $NewUserRole = htmlspecialchars($_POST['NewUserRole']);
        $return = array();

        if(empty($Username)){
          $return['success'] = False;
          $return['message'] = 'User cannot be blank!';
          echo json_encode($return);
          exit;
        }
        if($this->AccountModel->UserExsists($Username)){
          $return['success'] = False;
          $return['message'] = 'User already exists!';
          echo json_encode($return);
          exit;
        }
        if($this->SessionRole() <= $NewUserRole){
          $return['success'] = False;
          $return['message'] = 'You cannot create a user of equal or higher role then your own.';
          echo json_encode($return);
          exit;
        }
        if($this->AccountModel->AddUser($Username,$NewUserRole)){
          $return['success'] = True;
          $return['username'] = $Username;
          $return['role'] = $this->AccountModel->GetUserRole($Username);
          $return['message'] = 'Account created for: '.$Username;
        }else{
          $return['success'] = False;
          $return['message'] = 'Failed to add user!';
        }
        echo json_encode($return);
    }

    public function LogOut(){

      $AllLocations = false;
      if(isset($_GET['AllLocations'])){
        $AllLocations = htmlspecialchars($_GET['AllLocations']);
      }
      
      $this->AccountModel->LogOut($this->SignedInUsername(),$AllLocations);
      $IPAddress = exec("hostname -I | awk '{print $1}'");
      //header("Location: http://".$IPAddress.":8080");
      echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
      exit;
    }
}
?>
