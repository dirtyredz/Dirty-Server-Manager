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
   * Verifies Users Role and sends message to model to be sent to the servers manager
   * Requires POST 'Message'
   * @method SendKeys
   * @return array
   */
  public function SendKeys()
  {
    //WARNING there is a specifc command that is a HUGE security risk to the server
    //Especially without HTTPS, YOU KNOW WHAT COMMAND IM TALKING ABOUT
    //I NEED TO BLOCK THAT COMMAND ON EVERY LEVEL INCLUDING THE MANAGER

    /** @var array $return Settup array to build response */
    $return = array();
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
        $this->RefreshModel->SendKeys($_POST["Message"]);
        $return['success'] = true;
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
      $Message = str_replace("\n", "\\n", $Message);
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
      $Command = '/sendmail '.$Name.' '.$Credits.' "'.$Title.'" "'.$Subject.'" '.$Iron.' '.$Titanium.' '.$Naonite.' '.$Trinium.' '.$Xanion.' '.$Ogonite.' '.$Avorion.' "'.$Message.'"';
      //Send to model
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
