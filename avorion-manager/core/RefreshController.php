<?php
/**
 * Class handles graphs, time, console, and chat loads.
 *
 * Takes a range value and passes it to RefreshModel building graph data.
 */
class RefreshController extends CommonController
{
  /** @var onject $RefreshModel onject of RefreshModel */
  private $RefreshModel;

  /**
   * Settup RefreshModel with Optional GET 'Range'
   * @method __construct
   */
  function __construct()
  {
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
   * Returns Consoledata if logged in users role is high enough
   * @method GetConsoleData
   * @return string
   */
  public function GetConsoleData()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessConsolePage'])){
      //Retrieve ConsoleData from model
      //Is it neccasary to use a module?
      echo $this->RefreshModel->GetConsoleData();
    }else{
      echo "No Access";
    }
  }

  /**
   * Deletes the sector from the galaxies/sectors directory
   * @method DeleteSector
   * @return string
   */
  public function DeleteSector()
  {
    /** @var array $return Settup array to build response */
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['DeleteSector'])){
      $x=$_POST["XSector"];
      $y=$_POST["YSector"];
      if($this->RefreshModel->DeleteSector($x,$y)){
        $return['success'] = true;
        $return['message'] = 'Sector Deleted';
      }else {
        $return['success'] = false;
        $return['message'] = 'Sector file doesnt not exsist';
      }
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to delete a sector';
    }
    //encode and return
    echo json_encode($return);
  }

  /**
   * Returns Serverdata if logged in users role is high enough
   * @method GetServerData
   * @return string
   */
  public function GetServerData()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessConsolePage'])){
      //Retrieve ServerData from model
      //Is it neccasary to use a module?
      echo $this->RefreshModel->GetServerData();
    }else{
      echo "No Access";
    }
  }

  /**
   * Returns Managerdata if logged in users role is high enough
   * @method GetManagerData
   * @return string
   */
  public function GetManagerData()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessConsolePage'])){
      //Retrieve ServerData from model
      //Is it neccasary to use a module?
      echo "Manager Log<br/>".$this->RefreshModel->GetManagerData();
    }else{
      echo "No Access";
    }
  }

  /**
   * Returns Statusdata if logged in users role is high enough
   * @method GetStatusData
   * @return string
   */
  public function GetStatusData()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessConsolePage'])){
      //Retrieve ServerData from model
      //Is it neccasary to use a module?
      echo "Status Log<br/>".$this->RefreshModel->GetStatusData();
    }else{
      echo "No Access";
    }
  }

  /**
   * Returns chatlog if logged in user has a high enough role
   * @method GetChatLog
   * @return string
   */
  public function GetChatLog()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['HomeChatLog'])){
      //Retrieve Chatlog from model
      //Is it neccasary to use a module?
      echo $this->RefreshModel->GetChatLog();
    }
  }

  /**
   * Sends start command to the manager
   * @method ManagerStart
   * @return string
   */
  public function ManagerStart()
  {
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){
      //Can this be tricked to send bad commands?

      $return['success'] = true;
      $return['message'] = $this->RefreshModel->ManagerCommand('start');
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to use this command.';
    }
    //Encode and return
    echo json_encode($return);
  }

  /**
   * Sends start command to the manager
   * @method ManagerStop
   * @return string
   */
  public function ManagerStop()
  {
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){
      //Can this be tricked to send bad commands?

      $return['success'] = true;
      $return['message'] = $this->RefreshModel->ManagerCommand('stop');
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to use this command.';
    }
    //Encode and return
    echo json_encode($return);
  }

  /**
   * Sends start command to the manager
   * @method ManagerStop
   * @return string
   */
  public function ManagerStatus()
  {
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){
      //Can this be tricked to send bad commands?

      $return['success'] = true;
      $return['message'] = $this->RefreshModel->ManagerCommand('status');
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to use this command.';
    }
    //Encode and return
    echo json_encode($return);
  }

  /**
   * Gets the Server's Current time, NOT the Clients time
   * @method GetTime
   * @return string json_encoded date string
   */
  public function GetTime()
  {
    /** @var array $return Settup array to build response */
    $return = array();
    //Gets date/time from model, model will get servers time not clients
    $return['Date'] = $this->RefreshModel->GetServerTime();
    //encode and return
    echo json_encode($return);
  }

  /**
   * Sends a message to the manager prepended with '/say '
   * Requires POST form values
   * @method SendChat
   * @return string json_encoded array
   */
  public function SendChat()
  {
    /** @var array $return Settup array to build response */
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ChatLogInput'])){
      $Message = $_POST["Message"];
      //Can this be tricked to send bad commands?
      $this->RefreshModel->SendKeys('/say ['.$this->SignedInUsername().'] '.$Message);
      $return['success'] = true;
      $return['message'] = 'Message Sent';
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to Send Chat.';
    }
    //Encode and return
    echo json_encode($return);
  }

  /**
   * Verifies Users Role and sends message to model to be sent to the servers manager
   * Requires POST 'Message'
   * @method SendKeys
   * @return array
   */
  public function SendKeys()
  {
    /** @var array $return Settup array to build response */
    $return = array();
    if($_POST["Message"] == '/run'){
      $return['success'] = False;
      $return['message'] = 'Cannot use /run via the web interface.';
      //Return json array and kill script
      echo json_encode($return);
      exit;
    }
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ConsoleCommandsAccess'])){
      //if message doesnt start with /stop
      if($_POST["Message"] != '/stop'){
        //send the message to the module
        //I DEFFINETLY should be cleaning and verifing the data here
        //BAD ME
        $this->RefreshModel->SendKeys($_POST["Message"]);
        $return['success'] = true;
      //If message starts with /stop check role access for that command
      }elseif($this->RoleAccess($this->Config['ConsoleStopCommand'])){
        //send the message to the module
        //I DEFFINETLY should be cleaning and verifing the data here
        //BAD ME
        $return['success'] = $this->RefreshModel->SendKeys($_POST["Message"]);
      //Assume the message started with /stop
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
    //encode and return
    echo json_encode($return);
  }

  /**
   * Generates a command from form values and send the command via SendKeys
   * Requires POST form values
   * @method SendMail
   * @return string json_encoded array
   */
  public function SendMail()
  {
    /** @var array $return Settup array to build response */
    $return = array();
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['SendMail'])){
      //NEED to perform furthur verification of expected values

      /** @var string $Title Title Cleaned POST form value */
      $Title = htmlspecialchars($_POST['Title']);
      /** @var string $Name Name Cleaned POST form value */
      $Name = htmlspecialchars($_POST['Name']);
      /** @var string $Subject Subject Cleaned POST form value */
      $Subject = htmlspecialchars($_POST['Subject']);
      /** @var string $Message Message Cleaned POST form value */
      $Message = htmlspecialchars($_POST['Message']);
      //Replace newlines
      //$Message = str_replace("\n", "\\n", $Message);
      /** @var string $Credits Credits Cleaned POST form value */
      $Credits = htmlspecialchars($_POST['Credits']);
      /** @var string $Iron Iron Cleaned POST form value */
      $Iron = htmlspecialchars($_POST['Iron']);
      /** @var string $Titanium Titanium Cleaned POST form value */
      $Titanium = htmlspecialchars($_POST['Titanium']);
      /** @var string $Naonite Naonite Cleaned POST form value */
      $Naonite = htmlspecialchars($_POST['Naonite']);
      /** @var string $Trinium Trinium Cleaned POST form value */
      $Trinium = htmlspecialchars($_POST['Trinium']);
      /** @var string $Xanion Xanion Cleaned POST form value */
      $Xanion = htmlspecialchars($_POST['Xanion']);
      /** @var string $Ogonite Ogonite Cleaned POST form value */
      $Ogonite = htmlspecialchars($_POST['Ogonite']);
      /** @var string $Avorion Avorion Cleaned POST form value */
      $Avorion = htmlspecialchars($_POST['Avorion']);
      /** @var string $Command Generated command from form values */
      $Command = '/sendmail '.$Name.' "'.$Subject.'" "'.$Title.'" "'.$Credits.'" "'.$Iron.'" "'.$Titanium.'" "'.$Naonite.'" "'.$Trinium.'" "'.$Xanion.'" "'.$Ogonite.'" "'.$Avorion.'"';
      //Send to model
      file_put_contents(str_replace('/manager', '', $this->Config['Manager']).'/MailMessage.txt', $Message);
      //Can this be tricked to send bad commands?
      $this->RefreshModel->SendKeys($Command);
      $return['success'] = true;
      $return['message'] = 'Mail Sent';
    }else {
      //Role was not high enough
      $return['success'] = false;
      $return['message'] = 'Your Role level is not high enough to Send Mail.';
    }
    //Encode and return
    echo json_encode($return);
  }

  /**
   * Verifies Role access to build and return the factions map data
   * @method GetFactionsMap
   * @return string json_encoded array of map data
   */
  public function GetFactionsMap()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessFactionsMapPage'])){
      //Gets the Map array from the model and return
      echo json_encode($this->RefreshModel->GetFactionsMap());
    }
  }

  /**
   * Verifies Role access to build and return the factions map data
   * @method GetDiscovered
   * @return string json_encoded array of map data
   */
  public function GetDiscovered()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['AccessDiscoveredMapPage'])){
      //Gets the Map array from the model and return
      echo json_encode($this->RefreshModel->GetDiscoveredMap());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * CPU Usage, Server's (not Game Sever) CPU load/Usage Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetCpuUsage
   * @return string json_encoded array of graph details
   */
  public function GetCpuUsage()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['CpuUsageGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetCpuUsageGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * Script Memory Usage, Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetServerScriptMemoryGraph
   * @return string json_encoded array of graph details
   */
  public function GetServerScriptMemoryGraph()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ScriptMemoryGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetServerScriptMemoryGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * Memory Usage of physical server. Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetServerMemoryUsageGraph
   * @return string json_encoded array of graph details
   */
  public function GetServerMemoryUsageGraph()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['MemoryUsageGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetServerMemoryUsageGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * In Memory, Faction/Player/Sector memory usage Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetInMemory
   * @return string json_encoded array of graph details
   */
  public function GetInMemory()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['InMemoryGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetServerMemoryGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * Server Load, Game Server's (Not physical server) Load, Stated by game server. Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetServerLoad
   * @return string json_encoded array of graph details
   */
  public function GetServerLoad()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['ServerLoadGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetServerLoadGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * Players Online graph Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetPlayersOnline
   * @return string json_encoded array of graph details
   */
  public function GetPlayersOnline()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['OnlinePlayersGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetPlayersOnlineGraph());
    }
  }

  /**
   * Verifies Role access of logged in user and returns generated graph detail
   * Server Updates, Avg/Min/Max Update speed on ms of the server, Generated every 5 mins by the manager/cron job
   * Requires Class to be constructed with GET 'Range'
   * @method GetServerUpdates
   * @return string json_encoded array of graph details
   */
  public function GetServerUpdates()
  {
    //checks logged in users role against config options
    if($this->RoleAccess($this->Config['UpdatesGraph'])){
      //Gets the Graph array from the model and return
      echo json_encode($this->RefreshModel->GetServerUpdateGraph());
    }
  }
}
?>
