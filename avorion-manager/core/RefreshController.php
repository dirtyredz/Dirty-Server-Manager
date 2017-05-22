<?php
/**
 * Class handles graphs, time, console, and chat loads.
 *
 * Takes a range value and passes it to RefreshModel building graph data.
 *
 * @copyright  2017 Dirtyredz
 */
class RefreshController extends CommonController{
  private $RefreshModel;

  function __construct(){
    parent::__construct();

    if(isset($_GET['Range'])){
      require_once  __DIR__ .'/RefreshModel.php';
      $this->RefreshModel = new RefreshModel($_GET['Range']);
    }else{
      require_once  __DIR__ .'/RefreshModel.php';
      $this->RefreshModel = new RefreshModel();
    }
  }

  /**
 * If User has appropriate Role access will echo ConsoleData to page.
 */
  public function GetConsoleData(){
    if($this->RoleAccess($this->Config['AccessConsolePage'])){//Role required for specific feature
      echo $this->RefreshModel->GetConsoleData();
    }
  }

  /**
 * If User has appropriate Role access will echo Chat Log to page.
 */
  public function GetChatLog(){
    if($this->RoleAccess($this->Config['HomeChatLog'])){//Role required for specific feature
      echo $this->RefreshModel->GetChatLog();
    }
  }

  /**
 * If User has appropriate Role access will echo Servers current time to page.
 */
  public function GetTime(){
    $return = array();
    $return['Date'] = $this->RefreshModel->GetServerTime();
    echo json_encode($return);
  }

  /**
 * If User has appropriate Role access Send the provided message as a command to the server.
 */
  public function SendKeys(){
    $return = array();
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){//Role required for specific feature
      if($_POST["Message"] != '/stop'){
        $this->RefreshModel->SendKeys($_POST["Message"]);
        $return['success'] = true;
      }elseif($this->RoleAccess($this->Config['ConsoleStopCommand'])){
        $this->RefreshModel->SendKeys($_POST["Message"]);
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
    echo json_encode($return);
  }

  public function SendMail(){
    $return = array();
    if($this->RoleAccess($this->Config['SendMail'])){//Role required for specific feature
      $Title = htmlspecialchars($_POST['Title']);
      $Name = htmlspecialchars($_POST['Name']);
      $Subject = htmlspecialchars($_POST['Subject']);
      $Message = htmlspecialchars($_POST['Message']);
      $Message = str_replace("\n", "\\n", $Message);
      $Credits = htmlspecialchars($_POST['Credits']);
      $Iron = htmlspecialchars($_POST['Iron']);
      $Titanium = htmlspecialchars($_POST['Titanium']);
      $Naonite = htmlspecialchars($_POST['Naonite']);
      $Trinium = htmlspecialchars($_POST['Trinium']);
      $Xanion = htmlspecialchars($_POST['Xanion']);
      $Ogonite = htmlspecialchars($_POST['Ogonite']);
      $Avorion = htmlspecialchars($_POST['Avorion']);
      $Command = '/sendmail "'.$Name.'" '.$Credits.' "'.$Title.'" "'.$Subject.'" '.$Iron.' '.$Titanium.' '.$Naonite.' '.$Trinium.' '.$Xanion.' '.$Ogonite.' '.$Avorion.' "'.$Message.'"';
      $this->RefreshModel->SendKeys($Command);
      $return['success'] = true;
      //Not high enough role
      $return['message'] = 'Mail Sent';
    }else {
      $return['success'] = false;
      //Not high enough role
      $return['message'] = 'Your Role level is not high enough to Send Mail.';
    }
    echo json_encode($return);
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the factions map to page.
 */
  public function GetFactionsMap(){
    if($this->RoleAccess($this->Config['AccessFactionsMapPage'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetFactionsMap());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the discovered map to page.
 */
  public function GetDiscovered(){
    if($this->RoleAccess($this->Config['AccessDiscoveredMapPage'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetDiscoveredMap());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the discovered map to page.
 */
  public function GetCpuUsage(){
    if($this->RoleAccess($this->Config['CpuUsageGraph'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetCpuUsageGraph());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the In Memory Graph to page.
 */
  public function GetInMemory(){
    if($this->RoleAccess($this->Config['InMemoryGraph'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetServerMemoryGraph());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the Server Load Graph to page.
 */
  public function GetServerLoad(){
    if($this->RoleAccess($this->Config['ServerLoadGraph'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetServerLoadGraph());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the Players Online Graph to page.
 */
  public function GetPlayersOnline(){
    if($this->RoleAccess($this->Config['OnlinePlayersGraph'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetPlayersOnlineGraph());
    }
  }

  /**
 * If User has appropriate Role access will echo json data needed to build the Server Updates Graph to page.
 */
  public function GetServerUpdates(){
    if($this->RoleAccess($this->Config['UpdatesGraph'])){//Role required for specific feature
      echo json_encode($this->RefreshModel->GetServerUpdateGraph());
    }
  }
}
?>
