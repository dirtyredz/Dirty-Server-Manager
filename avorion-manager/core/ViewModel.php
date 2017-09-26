<?php
/*
This model will handle general database interactions for the view
 */
class ViewModel extends MySQLite
{

  public function __construct($file = '')
  {
      //Open the Database, The use of $file here will allow us to load backed up DB for admins to compare
      parent::__construct($file);

  }

  public function GetAllPlayerData(){
    $results = $this->query('SELECT * FROM players');
    $rtn_array = array();
    while ($row = $results->fetchArray()) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
  }

  public function GetSimplePlayerData(){
    //names and id's only
  }

  public function GetAllSectorData(){

  }

  public function GetSimpleSectorData(){
    //just x & y
  }

  public function GetAllFactionData(){

  }

  public function GetSimpleFactionData(){

  }

  public function GetAllAllianceData(){
    //
  }

  public function GetSimpleAllianceData(){

  }

}
