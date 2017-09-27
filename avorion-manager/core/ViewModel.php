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
    $results = $this->query('SELECT DISTINCT players.*, alliances.Name as AllianceName FROM players LEFT OUTER JOIN alliances ON players.Alliance = alliances.ID');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
  }

  public function GetSimplePlayerData(){
    $results = $this->query('SELECT ID, Name FROM players');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
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
    $results = $this->query('SELECT alliances.*, COUNT(*) as NumPlayers, leader.Name AS LeaderName FROM players INNER JOIN alliances ON alliances.ID = players.Alliance INNER JOIN players as leader ON leader.ID = alliances.Leader GROUP BY players.Alliance');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
  }

  public function GetSimpleAllianceData(){
    $results = $this->query('SELECT ID, Name FROM alliances');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
  }

}
