<?php
/**
 * Handles request for the config page
 */
class ServerConfigController extends CommonController
{
  /** @var object $ConfigParser Hold the config Parser class object */
  private $ConfigParser;
  /** @var array $PHPConfigDetails Contains all the deffinitions and input type info */
  const PHPConfigDetails = array(
    'HomeCustomMessageOne' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageTwo' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageThree' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'HomeCustomMessageFour' => array(
          'Definition' => 'Custom message for home page, can accept html or plain text. (Does NOT support semicolens ";" use of one will break the string while displaying)',
          'Type' => 'text'),
    'BannerCustomMessageOne' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'BannerCustomMessageTwo' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'BannerCustomMessageThree' => array(
          'Definition' => 'Custom message for the banner, can accept plain text only. 13 charectors max length.',
          'Type' => 'text'),
    'ShowOnlinePlayerCount' => array(
          'Definition' => 'If enabled will show the online players count on the home page.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'AccessConsolePage' => array(
          'Definition' => 'The role level required to view the Console page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessServerConfigPage' => array(
          'Definition' => 'The role level required to view the Configuration page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessFactionsPage' => array(
          'Definition' => 'The role level required to view the Factions page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessPlayerPage' => array(
          'Definition' => 'The role level required to view the Players page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessDiscoveredMapPage' => array(
          'Definition' => 'The role level required to view the Discovered Map page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessFactionsMapPage' => array(
          'Definition' => 'The role level required to view the Factions Map page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessGraphsPage' => array(
          'Definition' => 'The role level required to view the Graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessUserManagmentPage' => array(
          'Definition' => 'The role level required to view the User Management page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessSpaceInvadersPage' => array(
          'Definition' => 'The role level required to view the Space Invaders page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessAlliancePage' => array(
          'Definition' => 'The role level required to view the Alliances page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'HomeChatLog' => array(
          'Definition' => 'The role level required to view the Chat log on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'HomePlayerList' => array(
          'Definition' => 'The role level required to view the Players list on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'HomeDiskUsage' => array(
          'Definition' => 'The role level required to view the Disk Usage on the home page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ServerLoadGraph' => array(
          'Definition' => 'The role level required to view the Server Load graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'OnlinePlayersGraph' => array(
          'Definition' => 'The role level required to view the Online players graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'InMemoryGraph' => array(
          'Definition' => 'The role level required to view the In Memory graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'UpdatesGraph' => array(
          'Definition' => 'The role level required to view the Updates graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'CpuUsageGraph' => array(
          'Definition' => 'The role level required to view the Cpu Usage graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'MemoryUsageGraph' => array(
          'Definition' => 'The role level required to view the Server Memory Usage graph on the graphs page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ConsoleCommandsAccess' => array(
          'Definition' => 'The role level required to run commands in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ConsoleStopCommand' => array(
          'Definition' => 'The role level required to run the /stop command in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ChatLogInput' => array(
          'Definition' => 'The role level required to send chat message from home. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessDetailedPlayerData' => array(
          'Definition' => 'The role level required to view extra details on the players page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessDetailedAllianceData' => array(
          'Definition' => 'The role level required to view extra details on the alliance page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ChangeServerINI' => array(
          'Definition' => 'The role level required to change the server.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ChangeManagerConfigINI' => array(
          'Definition' => 'The role level required to change the manager-config.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ChangePHPConfigINI' => array(
          'Definition' => 'The role level required to change the PHPConfig.ini file via the config page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'SendMail' => array(
          'Definition' => 'The role level required to Send Mail via Form. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'EnableRSS' => array(
          'Definition' => 'If enabled will allow access to the /rss page, which provides details in an easy format for third party software.',
          'Type' => 'select',
          'Values' => array('True'=>'true','False'=>'false')),
    'DefaultPage' => array(
          'Definition' => 'The default page to load. (Home / SignIn / Factions / Players / DiscoveredMap / FactionsMap / Graphs / About)',
          'Type' => 'select',
          'Values' => array('Home'=>'Home','SignIn'=>'SignIn','Factions'=>'Factions','Players'=>'Players','DiscoveredMap'=>'DiscoveredMap','FactionsMap'=>'FactionsMap','Graphs'=>'Graphs','About'=>'About')),
    'GalaxiesDir' => array(
          'Definition' => 'The directory the galaxies directories resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'ConsoleLog' => array(
          'Definition' => 'The file path the console.log file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'Manager' => array(
          'Definition' => 'The file path the manager file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'ManagerConfig' => array(
          'Definition' => 'The file path the manager-config.ini file resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'LogsDir' => array(
          'Definition' => 'The directory where the log directory resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
    'StatusBannerDir' => array(
          'Definition' => 'The directory where the status banner resides. (This path is relative to the PHPConfig.ini location)',
          'Type' => 'text'),
  );

  /**
   * Settup class and requires ConfigParser.php
   * @method __construct
   */
  function __construct()
  {
    parent::__construct();
    require_once  __DIR__ .'/ConfigParser.php';
  }

  /**
   * Parses through Server.ini
   * @method GetServerINI
   * @return array
   */
  public function GetServerINI()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    /** @var string $GalaxyName GalaxyName in manager-config */
    $GalaxyName = $this->ManagerConfig['GALAXY'];//`grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    /** @var string $File server.ini file location */
    $File = $this->Config['GalaxiesDir']."/".trim($GalaxyName)."/server.ini";

    // Parses the file and return an array
    if($this->ParseINI($File)){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Parses the INI file provided and returns true for success
   * @method ParseINI
   * @param  string $File File location to parse
   * @return boolean
   */
  private function ParseINI($File)
  {
    //Parse the file
    $this->ConfigParser->ParseINI($File);
    //if parsing was successful or not
    return $this->ConfigParser->Success;
  }

  /**
   * Parses the manager-config.ini
   * @method GetManagerConfig
   * @return array
   */
  public function GetManagerConfig()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    // Parses the file and return an array
    if($this->ParseINI($this->Config['ManagerConfig'])){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Parses the PHPConfig.ini
   * @method GetPHPConfig
   * @return array
   */
  public function GetPHPConfig()
  {
    //Settup config parser object
    $this->ConfigParser = new ConfigParser();
    //Parses the file and returns the array
    if($this->ParseINI(__DIR__ . '/../PHPConfig.ini')){
      return $this->ConfigParser->GetINI();
    }
  }

  /**
   * Validates and cleans form data from PHPConfig ChangeServerINI
   * Updates and writes to file with comments
   * @method UpdatePHPConfig
   * @return string json_encoded success message
   */
  public function UpdatePHPConfig()
  {
    if(!$this->RoleAccess($this->Config['ChangePHPConfigINI'])){
      $return['success'] = false;
      $return['message'] = 'Role level not high enough.';
      echo json_encode($return);
      exit;
    }
    /** @var array $return Builds response array */
    $return = array();
    /** @var array $NewPHPConfig array with updated values */
    $NewPHPConfig = array();
    /** @var array $Defaults PHPConfig.ini current values from file */
    $Defaults = $this->GetPHPConfig();
    //foreach value in the form data
    foreach ($_POST['FormData'] as $key => $value) {
      /** @var mixed $RtnValue form value to be validated and update the file with */
      $RtnValue = $value['value'];
      //if this INI option requires a number
      if(self::PHPConfigDetails[$value['name']]['Type'] == 'number'){
        //Cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if its not a number restore default
        if(!is_numeric($RtnValue)){
          $RtnValue = $Defaults[$value['name']];
        }
      //if INI option is a text field
    }elseif(self::PHPConfigDetails[$value['name']]['Type'] == 'text'){
        //Client can use HTML here so lets only strip  out script tags
        $RtnValue = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $RtnValue);
      //if INI option is a select input
    }elseif(self::PHPConfigDetails[$value['name']]['Type'] == 'select'){
        //cleans it
        $RtnValue = htmlspecialchars($RtnValue);
        //if value is not one of the allowed values then restore it
        if(!in_array($RtnValue,self::PHPConfigDetails[$value['name']]['Values'])){
          $RtnValue = $Defaults[$value['name']];
        }
      }
      //add the value to the array to be updated
      $NewPHPConfig[$value['name']] = $RtnValue;
    }

    //Update the class array with our new array
    $this->ConfigParser->update($NewPHPConfig);
    //Write the class array to the file include our comments with it so they are written in as well
    $this->ConfigParser->write(self::PHPConfigDetails);

    //return success message
    $return['success'] = true;
    $return['message'] = 'PHP Config Updated';
    echo json_encode($return);
  }
}
