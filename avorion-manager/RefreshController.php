<?php
if(isset($_GET['function'])){

  $_GET['function']();
}
if(isset($_POST['function'])){
  $_POST['function']();
}

function GetConsoleData(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  echo $RefreshModel->GetConsoleData();
}
function GetChatLog(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  echo $RefreshModel->GetChatLog();
}
function GetTime(){
  require_once __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  $return = array();
  $return['Date'] = $RefreshModel->GetServerTime();
  echo json_encode($return);
}
function SendKeys(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  include_once __DIR__ . '/Config.php';
  $return = array();
  if(!isset($_SESSION)) { session_start(); };
  if(isset($_SESSION['login']) && $_SESSION["login"] == "true") {
    if($_SESSION['role'] >= $Config['ConsoleCommandsAccess']){
      if($_POST["Message"] != '/stop'){
        $RefreshModel->SendKeys($_POST["Message"]);
        $return['success'] = true;
      }elseif($_SESSION['role'] >= $Config['ConsoleStopCommand']){
        $RefreshModel->SendKeys($_POST["Message"]);
        $return['success'] = true;
      }else{
        $return['success'] = false;
        //Not high enough to use /stop
        $return['message'] = 'Your Role level is not high enough to /stop.';
      }
    }else {
      $return['success'] = false;
      //Not high enough role
      $return['message'] = 'Your Role level is not high enough to issue commands.';
    }
  }
  echo json_encode($return);
}
function GetFactionsMap(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  echo json_encode($RefreshModel->GetFactionsMap());
}
function GetDiscovered(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel();
  echo json_encode($RefreshModel->GetDiscoveredMap());
}
function GetCpuUsage(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel($_GET['Range']);
  echo json_encode($RefreshModel->GetCpuUsageGraph());
}
function GetInMemory(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel($_GET['Range']);
  echo json_encode($RefreshModel->GetServerMemoryGraph());
}
function GetServerLoad(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel($_GET['Range']);
  echo json_encode($RefreshModel->GetServerLoadGraph());
}
function GetPlayersOnline(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel($_GET['Range']);
  echo json_encode($RefreshModel->GetPlayersOnlineGraph());
}
function GetServerUpdates(){
  require_once  __DIR__ .'/RefreshModel.php';
  $RefreshModel = new RefreshModel($_GET['Range']);
  echo json_encode($RefreshModel->GetServerUpdateGraph());
}
?>
