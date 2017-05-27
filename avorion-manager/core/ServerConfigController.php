<?php
/**

 * @copyright  2017 Dirtyredz
 */
class ServerConfigController extends CommonController{
  private $ConfigParser;
  public $PHPConfigDetails = array(
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
    'ConsoleCommandsAccess' => array(
          'Definition' => 'The role level required to run commands in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'ConsoleStopCommand' => array(
          'Definition' => 'The role level required to run the /stop command in the console page. (0=public)',
          'Type' => 'number',
          'Range' => array('min'=>0,'max'=>99)),
    'AccessDetailedPlayerData' => array(
          'Definition' => 'The role level required to view extra details on the players page. (0=public)',
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
  function __construct(){
    parent::__construct();
    require_once  __DIR__ .'/ConfigParser.php';

  }
  public function GetServerINI(){
    $this->ConfigParser = new ConfigParser();
    $GalaxyName = `grep GALAXY {$this->Config['ManagerConfig']} | sed -e 's/.*=//g'`;
    $File = $this->Config['GalaxiesDir']."/".trim($GalaxyName)."/server.ini";

    if($this->ParseINI($File)){
      return $this->ConfigParser->GetINI();
    }
  }
  private function ParseINI($File){
    $this->ConfigParser->ParseINI($File);
    return $this->ConfigParser->Success;
  }

  public function GetManagerConfig(){
    $this->ConfigParser = new ConfigParser();
    if($this->ParseINI($this->Config['ManagerConfig'])){
      return $this->ConfigParser->GetINI();
    }
  }
  public function GetPHPConfig(){
    $this->ConfigParser = new ConfigParser();
    if($this->ParseINI(__DIR__ . '/../PHPConfig.ini')){
      return $this->ConfigParser->GetINI();
    }
  }


  public function UpdatePHPConfig(){
    $return = array();
    $NewPHPConfig = array();
    $Defaults = $this->GetPHPConfig();
    foreach ($_POST['FormData'] as $key => $value) {
      //Clean and verification NEEDED!!!
      $RtnValue = $value['value'];
      if($this->PHPConfigDetails[$value['name']]['Type'] == 'number'){
        $RtnValue = htmlspecialchars($RtnValue);
        if(!is_numeric($RtnValue)){
          $RtnValue = $Defaults[$value['name']];
        }
      }elseif($this->PHPConfigDetails[$value['name']]['Type'] == 'text'){
        $RtnValue = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $RtnValue);
      }elseif($this->PHPConfigDetails[$value['name']]['Type'] == 'select'){
        $RtnValue = htmlspecialchars($RtnValue);
        if(!in_array($RtnValue,$this->PHPConfigDetails[$value['name']]['Values'])){
          $RtnValue = $Defaults[$value['name']];
        }
      }
      $NewPHPConfig[$value['name']] = $RtnValue;
    }

    $this->ConfigParser->update($NewPHPConfig);

    $this->ConfigParser->write($this->PHPConfigDetails);

    $return['success'] = true;
    $return['message'] = 'PHP Config Updated';
    echo json_encode($return);
  }
}
?>
