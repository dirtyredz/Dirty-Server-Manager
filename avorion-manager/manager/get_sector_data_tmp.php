<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'get_sector_data');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Parses through all sector files.');

$verbose = $argv[1];
$output = $argv[2];
$broadcast = $argv[3];
$delay = $argv[4];
$force = $argv[5];
$DisplayDescription = $argv[6];
$SecondCommand = $argv[7];

if($DisplayDescription == 'true'){
  echo COMMAND_NAME . PHP_EOL;
  echo COMMAND_DESCRIPTION . PHP_EOL;
  exit;
}

//Database setup
require __DIR__ . '/../core/MySQLite.php';
$db = new MySQLite();

//Table Setup
$SectorTableColumns = array(
  'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
  'SectorX' => 'INTEGER',
  'SectorY' => 'INTEGER',
  'FactionID' => 'INTEGER',
  'Crafts' => 'INTEGER',
  'Wrecks' => 'INTEGER',
  'Asteroids' => 'INTEGER',
  'Stations' => 'INTEGER',
  'Influence' => 'INTEGER'
);

$StationsTableColumns = array(
  'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
  'SectorID' => array('INTEGER', 'NOT NULL'),
  'StationName' => 'TEXT'
);

$TeleportTableColumns = array(
  'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
  'SectorID' => array('INTEGER', 'NOT NULL'),
  'DestX' => 'INTEGER',
  'DestY' => 'INTEGER',
  'EntityType' => 'TEXT'
);

$ShipsTableColumns = array(
  'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
  'SectorID' => array('INTEGER', 'NOT NULL'),
  'NumShips' => 'INTEGER',
  'ShipsFaction' => 'INTEGER'
);

//Create dynamic table so if future updates adds a new field
$db->create_dynamic_table('sectors', $SectorTableColumns);
$db->create_dynamic_table('stations', $StationsTableColumns);
$db->create_dynamic_table('teleports', $TeleportTableColumns);
$db->create_dynamic_table('ships', $ShipsTableColumns);

//So we know where the galaxy directory is at
require __DIR__ . '/../core/CommonController.php';
$Common = new CommonController( );

//Log this event
$Common->LogMessage("Starting GetSectorData()",true);
echo "Starting GetSectorData()" . PHP_EOL;

//The players directory where the player files are stored
$SectorsDirectory = $Common->ManagerConfig['GalaxyDirectory'] . "/" . $Common->ManagerConfig['GALAXY'] . "/sectors/";

if($verbose == 'true'){
  echo "Searching for sector files in: " . $SectorsDirectory . PHP_EOL;
}

//Scan the directory
$SectorsFiles = $Common->scan_dir($SectorsDirectory);

//How many files
$numFiles = (count($SectorsFiles) - 2) / 2;

if($verbose == 'true'){
  echo "Found " . $numFiles . ", Sector files." . PHP_EOL;
}

$SeenSectorData = array();

require __DIR__ . '/../core/BinaryHelper.php';

//Loop through EACH Sector file.
foreach ($SectorsFiles as $key => $file) {

  //Only need the xml files
  if(substr($file, -1) != 'v') continue;

  //Load xml & parse data
  $XML = simplexml_load_file($SectorsDirectory.'/'.$file);
  $SectorAttributes = $XML->attributes();
  $SeenSectorData[$key]['Crafts'] = (string)$SectorAttributes['numCrafts'];
  $SeenSectorData[$key]['Wrecks'] = (string)$SectorAttributes['numWrecks'];
  $SeenSectorData[$key]['Asteroids'] = (string)$SectorAttributes['numAsteroids'];
  $SeenSectorData[$key]['Stations'] = (string)$SectorAttributes['numStations'];
  $SeenSectorData[$key]['Influence'] = (string)$SectorAttributes['influence'];
  $SeenSectorData[$key]['FactionID'] = (string)$SectorAttributes['factionIndex'];

  $Coordinates = $XML->coordinates->attributes();
  $SeenSectorData[$key]['SectorX'] = (string)$Coordinates['x'];
  $SeenSectorData[$key]['SectorY'] = (string)$Coordinates['y'];

  $i = 0;
  $Wormholes = $XML->wormholes->coordinates;
  if($Wormholes){
    foreach ($Wormholes as $value) {
      $WormholeCoords = $value->attributes();
      $SeenSectorData[$key]['Teleports'][$i]['DestX'] = (string)$WormholeCoords['x'];
      $SeenSectorData[$key]['Teleports'][$i]['DestY'] = (string)$WormholeCoords['y'];
      $SeenSectorData[$key]['Teleports'][$i]['EntityType'] = 'Wormhole';
      $i ++;
    }
  }
  $i = 0;
  $Gates = $XML->gates->coordinates;
  if($Gates){
    foreach ($Gates as $value) {
      $GateCoords = $value->attributes();
      $SeenSectorData[$key]['Teleports'][$i]['DestX'] = (string)$GateCoords['x'];
      $SeenSectorData[$key]['Teleports'][$i]['DestY'] = (string)$GateCoords['y'];
      $SeenSectorData[$key]['Teleports'][$i]['EntityType'] = 'Gate';
      $i ++;
    }
  }
  $i = 0;

  //Thxs DNightMare
  $Titles = $XML->titles->title;
  if($Titles){
    foreach ($Titles as $title) {
      $size = $title->xpath('arg[@key="size"]');
      $size = (string)reset($size);
      $good = $title->xpath('arg[@key="good"]');
      $good = (string)reset($good);

      $name = $title['str'];
      if ($size) {
          $name = str_replace('${size}', $size, $name);
      }
      if ($good) {
          $name = str_replace('${good}', $good, $name);
      }

      $SeenSectorData[$key]['StationNames'][$i] = (string)$name;
      $i ++;
    }
  }
  $i = 0;
  $ShipNumbers = $XML->shipNumbers->ships;
  if($ShipNumbers){
    foreach ($ShipNumbers as $value) {
      $FactionShips = $value->attributes();
      $SeenSectorData[$key]['Ships'][$i]['NumShips'] = (string)$FactionShips['n'];
      $SeenSectorData[$key]['Ships'][$i]['ShipsFaction'] = (string)$FactionShips['faction'];
      $i ++;
    }
  }

}//End foreach sector files

//print_r($SeenSectorData);

//Update the database
foreach ($SeenSectorData as $index => $data) {
  $Teleports = false;
  $StationNames = false;
  $Ships = false;

  if(array_key_exists('Teleports',$data)){
    $Teleports = $data['Teleports'];
    unset($data['Teleports']);
  }
  if(array_key_exists('Ships',$data)){
    $Ships = $data['Ships'];
    unset($data['Ships']);
  }
  if(array_key_exists('StationNames',$data)){
    $StationNames = $data['StationNames'];
    unset($data['StationNames']);
  }


  $stmt = $db->prepare('SELECT ID, SectorX, SectorY FROM sectors WHERE SectorX=:SectorX AND SectorY=:SectorY');
  $stmt->bindValue(':SectorX', $data['SectorX'], SQLITE3_INTEGER);
  $stmt->bindValue(':SectorY', $data['SectorY'], SQLITE3_INTEGER);
  $result = $stmt->execute();
  $Row = $result->fetchArray(SQLITE3_ASSOC);
  $RowID;
  if ($Row) {
    $RowID = $Row['ID'];
    $Coords = array('SectorX' => $data['SectorX'], 'SectorY' => $data['SectorY']);
    unset($data['SectorX']);
    unset($data['SectorY']);
    $db->update('sectors', $Coords, $data);
  } else {
    $RowID = $db->insert('sectors', $data);
  }

  $stmt = $db->prepare('DELETE FROM teleports WHERE sectorID=:sectorID');
  $stmt->bindValue(':sectorID', $RowID, SQLITE3_INTEGER);
  $result = $stmt->execute();

  if($Teleports){
    foreach ($Teleports as $key => $value) {
      $value['SectorID'] = $RowID;
      $db->insert('teleports', $value);
    }
  }

  $stmt = $db->prepare('DELETE FROM stations WHERE sectorID=:sectorID');
  $stmt->bindValue(':sectorID', $RowID, SQLITE3_INTEGER);
  $result = $stmt->execute();

  if($StationNames){
    foreach ($StationNames as $key => $value) {
      $db->insert('stations', array('StationName' => $value,'SectorID' => $RowID));
    }
  }

  $stmt = $db->prepare('DELETE FROM ships WHERE sectorID=:sectorID');
  $stmt->bindValue(':sectorID', $RowID, SQLITE3_INTEGER);
  $result = $stmt->execute();

  if($Ships){
    foreach ($Ships as $key => $value) {
      $value['SectorID'] = $RowID;
      $db->insert('ships', $value);
    }
  }

}

$db->close();

//Backup DB
$Common->BackupDB();

//Log this event
$Common->LogMessage("Finished GetSectorData()",true);
echo "Finished GetSectorData()" . PHP_EOL;
