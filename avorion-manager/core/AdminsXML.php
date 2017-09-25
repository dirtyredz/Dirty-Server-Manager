<?php
/*
Parses the admins.xml file for avorion
 */
class AdminsXML
{

  private $XML;
  public $Main = array();

  public function __construct($file = '')
  {
      if( !is_file( $file ) ){
        throw new Exception( 'AdminsXML: File '.$file.' wasn\'t found.' );
      }else{
        $this->XML = simplexml_load_file($file);
        $this->Parse();
      }
  }

  public function Parse(){
    foreach ($this->XML->administration->administrators->admin as $key => $value) {
      $name = $value->attributes();
      $this->Main['admin'][] = (string)$name['name'];
    }
    foreach ($this->XML->administration->authorizationGroups->group as $key => $value) {
      $group = (string)$value->attributes()['name'];
      $this->Main[$group] = array();
      foreach ($value->users->user as $key2 => $value2) {
        $this->Main[$group][] = (string)$value2->attributes()['name'];
      }
    }
  }

  public function GetAdmins(){
    if(!$this->Main['admin'])
      $this->Main['admin'] = array();
    return $this->Main['admin'];
  }

  public function GetGroups(){
    $rtn_array = array();
    foreach ($this->Main as $group => $name) {
      if(!$group == 'admin')
        $rtn_array[] = $name;
    }
    return $rtn_array;
  }

  public function GetGroup(string $GroupName){
    if(!$this->Main[$GroupName])
      $this->Main[$GroupName] = array();
    return $this->Main[$GroupName];
  }

  public function GetAll(){
    return $this->Main;
  }

}
