<?php
/**

 * @copyright  2017 Dirtyredz
 */
class ServerConfigController extends CommonController{
  private $ConfigParser;

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
  private function ParseBASH($File){
    $this->ConfigParser->ParseBASH($File);
    return $this->ConfigParser->Success;
  }

  public function Update(){
    //make sure server is OFFLINE
    //Get all Post Data
    //Clean and verify Data
    //Build Array

    //Send to WriteINI->update

    //return errors
  }
}
?>
