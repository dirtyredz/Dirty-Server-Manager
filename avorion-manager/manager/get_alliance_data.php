<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'get_alliance_data');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Parses through all alliance files.');

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
$TableColumns = array(
  'ID' => array('INTEGER', 'NOT NULL', 'UNIQUE', 'PRIMARY KEY'),
  'Name' => 'TEXT',
  'Leader' => 'INTEGER',
  'Money' => 'INTEGER',
  'Iron' => 'INTEGER',
  'Titanium' => 'INTEGER',
  'Naonite' => 'INTEGER',
  'Trinium' => 'INTEGER',
  'Xanion' => 'INTEGER',
  'Ogonite' => 'INTEGER',
  'Avorion' => 'INTEGER'
);

//Create dynamic table so if future updates adds a new field
$db->create_dynamic_table('alliances', $TableColumns);

//So we know where the galaxy directory is at
require __DIR__ . '/../core/CommonController.php';
$Common = new CommonController( );

//Log this event
$Common->LogMessage("Starting GetAllianceData()",true);
echo "Starting GetAllianceData()" . PHP_EOL;

//The players directory where the player files are stored
$AllianceDirectory = $Common->ManagerConfig['GalaxyDirectory'] . "/" . $Common->ManagerConfig['GALAXY'] . "/alliances/";

if($verbose == 'true'){
  echo "Searching for alliance files in: " . $AllianceDirectory . PHP_EOL;
}

//Scan the directory
$AllianceFiles = $Common->scan_dir($AllianceDirectory);

//How many files
$numFiles = (count($AllianceFiles) - 2);

if($verbose == 'true'){
  echo "Found " . $numFiles . ", alliance files. (There are multiple copies of each alliance file, only parsing 1 for each player.)" . PHP_EOL;
}

$SeenAllianceData = array();

require __DIR__ . '/../core/BinaryHelper.php';

//Loop through EACH player file.
foreach ($AllianceFiles as $key => $file) {

  //Extract Index from file name
  $Index = preg_replace('(^alliance_|.dat.*)', '', $file);

  //If we already have parsed this players data
  if(array_key_exists($Index, $SeenAllianceData)) continue;

  //Use Player index as key
  $SeenAllianceData[$Index] = array();
  $SeenAllianceData[$Index]['ID'] = $Index;

  if($verbose == 'true'){
    //echo "Parsing file: " . $file . "\r";
  }

  //Decompress the player file
  $DecompressedFile = @zlib_decode(file_get_contents($AllianceDirectory . $file, NULL, NULL, 44));
  if(false === $DecompressedFile){
    echo 'Unable to decompress file: ' . $file . PHP_EOL;
    continue;
  }

  //Get Alliance Name
  $BinaryHelper = new BinaryHelper($DecompressedFile);
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('name'));
  $BinaryHelper->ShowHex(20);
  $BinaryHelper->MovePointerForward(strlen('name') + 8);
  $NameLength = ord($BinaryHelper->GetByte());
  $AllianceName = $BinaryHelper->GetString($NameLength);
  $SeenAllianceData[$Index]['Name'] = $AllianceName;

  //Get Leader ID
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('leader'));
  $BinaryHelper->MovePointerForward(strlen('leader') + 8);
  $SeenAllianceData[$Index]['Leader'] = $BinaryHelper->ConvertBin($BinaryHelper->GetByte());

  //Get Credits/Resources
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('money64'));
  $BinaryHelper->MovePointerForward(strlen('money64') + 8);
  $SeenAllianceData[$Index]['Money'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));

  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('resources640'));
  $BinaryHelper->MovePointerForward(strlen('resources640') + 8);
  $SeenAllianceData[$Index]['Iron'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Titanium'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Naonite'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Trinium'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Xanion'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Ogonite'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenAllianceData[$Index]['Avorion'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);

}//End foreach player files

//print_r($SeenAllianceData);

//Update the database
foreach ($SeenAllianceData as $index => $data) {
  $stmt = $db->prepare('SELECT ID FROM alliances WHERE ID=:ID');
  $stmt->bindValue(':ID', $index, SQLITE3_INTEGER);
  $result = $stmt->execute();
  if ($result->fetchArray()) {
    unset($data['ID']);
    $db->update('alliances', array('ID' => $index), $data);
  } else {
    print_r($data);
    $db->insert('alliances', $data);
  }
}

$db->close();

//Backup DB
$Common->BackupDB();

//Log this event
$Common->LogMessage("Finished GetAllianceData()",true);
echo "Finished GetAllianceData()" . PHP_EOL;
