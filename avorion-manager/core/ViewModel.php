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
    $results = $this->query('SELECT DISTINCT sectors.*, factions.Name as FactionName FROM sectors LEFT OUTER JOIN factions ON sectors.FactionID = factions.ID');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        $rtn_array[] = $row;
    }
    return $rtn_array;
  }

  public function GetSimpleSectorData(){
    //just x & y
  }

  public function GetAllFactionData(){
    $results = $this->query('SELECT * FROM factions');
    $rtn_array = array();
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
      $stmt = $this->prepare('SELECT sum(Crafts) as Crafts, sum(Stations) as Stations, sum(Asteroids) as Asteroids, sum(Wrecks) as Wrecks, sum(Influence) as Influence FROM sectors WHERE FactionID=:FactionID');
      $stmt->bindValue(':FactionID', $row['ID'], SQLITE3_INTEGER);
      $SectorsResult = $stmt->execute();
        $SectorRow = $SectorsResult->fetchArray(SQLITE3_ASSOC);
        $row = array_merge($row,$SectorRow);
        $rtn_array[] = $row;
    }
    return $rtn_array;
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
