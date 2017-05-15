<?php
//If its a get function push it directly to the function.
if(isset($_GET['function'])){
  if($_GET['function'] == "LogOut"){
    require_once __DIR__ .'/AccountModel.php';
    $AccountModel = new AccountModel;
    if(!isset($_SESSION)) { session_start(); };
    $AllLocations = false;
    if(isset($_GET['AllLocations'])){
      $AllLocations = $_GET['AllLocations'];
      $AllLocations = htmlspecialchars($AllLocations);
    }
    $Username = $_SESSION['username'];
    $Username = htmlspecialchars($Username);
    $AccountModel->LogOut($Username,$AllLocations);
    $IPAddress = exec("hostname -I | awk '{print $1}'");
    //header("Location: http://".$IPAddress.":8080");
    echo "<script>parent.self.location='http://".$IPAddress.":8080';</script>";
    exit;
  }elseif($_GET['function'] == "ListUsers"){
    ListUsers();
  }
}

//if we have username and password, assume were logging in.
if(isset($_POST['username']) && isset($_POST['password']) ){
  CheckCredentials();
}

//POST ID NewUser, Call AddUser()
if(isset($_POST['NewUser'])){
  AddUser();
}

//POST ID DeleteUser, Call DeleteUser()
if(isset($_POST['DeleteUser'])){
  DeleteUser();
}

//POST ID DeleteUser, Call DeleteUser()
if(isset($_POST['ChangeRole'])){
  ChangeRole();
}

//POST ID ResetPass, Call ResetPass()
if(isset($_POST['ResetPass'])){
  ResetPassword();
}

//POST ID Old and New Pass, call ChangePassword()
if(isset($_POST['OldPass']) && isset($_POST['NewPass'])){
  ChangePassword();
}

//FUNCTIONS
function ResetPassword(){
  if(!isset($_SESSION)) { session_start(); };
  $Role = htmlspecialchars($_SESSION['role']);

  $Username = $_POST['ResetPass'];
  $Username = htmlspecialchars($Username);

  $return = array();
  require_once __DIR__ .'/AccountModel.php';
  $AccountModel = new AccountModel;
  if($Role > $AccountModel->GetUserRole($Username)){
    if($AccountModel->ResetPassword($Username)){
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

function ChangePassword(){
  if(!isset($_SESSION)) { session_start(); };
  $Username = $_SESSION['username'];
  $OldPassword = $_POST['OldPass'];
  $NewPassword = $_POST['NewPass'];
  $Username = htmlspecialchars($Username);
  $OldPassword = htmlspecialchars($OldPassword);
  $NewPassword = htmlspecialchars($NewPassword);

  $return = array();

  if(!isset($Username)) {
    $return['success'] = False;
    $return['message'] = 'Error on backend, Please refresh page!';
    echo json_encode($return);
    exit;
  }
  require_once __DIR__ .'/AccountModel.php';
  $AccountModel = new AccountModel;
  if($AccountModel->ChangePassword($Username,$OldPassword,$NewPassword)){
      $return['success'] = True;
      $return['message'] = 'Password Changed!';
  }else {
    $return['success'] = False;
    $return['message'] = 'Old password does not authenticate!';
  }
  echo json_encode($return);
}

function _SessionStatus(){
  if(!isset($_SESSION)) { session_start(); };
  if(isset($_SESSION['username'])) {
    return true;
  }else{
    return false;
  }
}

function DeleteUser(){
  if(!isset($_SESSION)) { session_start(); };
  $Role = htmlspecialchars($_SESSION['role']);
  $Username = $_POST['DeleteUser'];
  $Username = htmlspecialchars($Username);


  $return = array();
  require_once __DIR__ .'/AccountModel.php';
  $AccountModel = new AccountModel;

  if($Role > $AccountModel->GetUserRole($Username)){
    if($AccountModel->DeleteUser($Username)){
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

function ChangeRole(){
  if(!isset($_SESSION)) { session_start(); };
  $Role = htmlspecialchars($_SESSION['role']);
  $Username = $_POST['ChangeRole'];
  $Username = htmlspecialchars($Username);
  $UserRole = $_POST['Role'];
  $UserRole = htmlspecialchars($UserRole);

  $return = array();
  require_once __DIR__ .'/AccountModel.php';
  $AccountModel = new AccountModel;

  if (filter_var($UserRole, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>99))) === false) {
      $return['success'] = False;
  }

  if($Role > $AccountModel->GetUserRole($Username)){
    if($Role > $UserRole){
      if($AccountModel->ChangeRole($Username,$UserRole)){
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

function CheckCredentials(){
    $Username = $_POST['username'];
    $Password = $_POST['password'];
    $Forever = null;
    if(isset($_POST['forever'])){
      $Forever = $_POST['forever'];
      $Forever = htmlspecialchars($Forever);
    }

    $Username = htmlspecialchars($Username);
    $Password = htmlspecialchars($Password);



    $return = array();
    require_once __DIR__ .'/AccountModel.php';
    $AccountModel = new AccountModel;
    if($AccountModel->VerifyPassword($Username,$Password)){
      $AccountModel->LogIn($Username,$Forever);
      $return['success'] = True;
    }else{
      $return['success'] = False;
    }
    echo json_encode($return);
}

function ListUsers(){
  require_once __DIR__ .'/AccountModel.php';
  $AccountModel = new AccountModel;
  if(!isset($_SESSION)) { session_start(); };
  $Return = $AccountModel->ListUsers(array('ADMIN',$_SESSION['username']));
  echo json_encode($Return);
}

function AddUser(){
    if(!isset($_SESSION)) { session_start(); };
    $Role = htmlspecialchars($_SESSION['role']);
    $Username = $_POST['NewUser'];
    $Username = htmlspecialchars($Username);
    $NewUserRole = $_POST['NewUserRole'];
    $NewUserRole = htmlspecialchars($NewUserRole);
    $Username = strtoupper($Username);

    require_once __DIR__ .'/AccountModel.php';
    $AccountModel = new AccountModel;
    if(empty($Username)){
      $return['success'] = False;
      $return['message'] = 'User cannot be blank!';
      echo json_encode($return);
      exit;
    }
    if($AccountModel->UserExsists($Username)){
      $return['success'] = False;
      $return['message'] = 'User already exists!';
      echo json_encode($return);
      exit;
    }
    $return = array();
    if($Role <= $NewUserRole){
      $return['success'] = False;
      $return['message'] = 'You cannot create a user of equal or higher role then your own.';
      echo json_encode($return);
      exit;
    }
    if($AccountModel->AddUser($Username)){
      $return['success'] = True;
      $return['username'] = $Username;
      $return['role'] = $AccountModel->GetUserRole($Username);
      $return['message'] = 'Account created for: '.$Username;
    }else{
      $return['success'] = False;
      $return['message'] = 'Failed to add user!';
    }
    echo json_encode($return);
}
?>
