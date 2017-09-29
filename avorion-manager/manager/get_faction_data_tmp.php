<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'get_faction_data');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Parses through all Faction files.');

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
  'HomeX' => 'INTEGER',
  'HomeY' => 'INTEGER',
  'Color1' => 'INTEGER',
  'Color2' => 'INTEGER',
  'Color3' => 'INTEGER'
);

//Create dynamic table so if future updates adds a new field
$db->create_dynamic_table('factions', $TableColumns);

//So we know where the galaxy directory is at
require __DIR__ . '/../core/CommonController.php';
$Common = new CommonController( );

//Log this event
$Common->LogMessage("Starting GetFactionData()",true);
echo "Starting GetFactionData()" . PHP_EOL;

//The players directory where the player files are stored
$FactionDirectory = $Common->ManagerConfig['GalaxyDirectory'] . "/" . $Common->ManagerConfig['GALAXY'] . "/factions/";

if($verbose == 'true'){
  echo "Searching for faction files in: " . $FactionDirectory . PHP_EOL;
}

//Scan the directory
$FactionFiles = $Common->scan_dir($FactionDirectory);

//How many files
$numFiles = (count($FactionFiles) - 2);

if($verbose == 'true'){
  echo "Found " . $numFiles . ", alliance files. (There are multiple copies of each alliance file, only parsing 1 for each player.)" . PHP_EOL;
}

$SeenFactionData = array();

require __DIR__ . '/../core/BinaryHelper.php';

//Loop through EACH player file.
foreach ($FactionFiles as $key => $file) {

  //Extract Index from file name
  $Index = preg_replace('(^faction_|.dat*)', '', $file);

  //If we already have parsed this factions data
  if(array_key_exists($Index, $SeenFactionData)) continue;

  //Use faction index as key
  $SeenFactionData[$Index] = array();
  $SeenFactionData[$Index]['ID'] = $Index;

  if($verbose == 'true'){
    //echo "Parsing file: " . $file . "\r";
  }

  //Decompress the player file
  $DecompressedFile = @zlib_decode(file_get_contents($FactionDirectory . $file, NULL, NULL, 44));
  if(false === $DecompressedFile){
    echo 'Unable to decompress file: ' . $file . PHP_EOL;
    continue;
  }

  //Get Alliance Name
  $BinaryHelper = new BinaryHelper($DecompressedFile);
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('name'));
  $BinaryHelper->MovePointerForward(strlen('name') + 8);
  $NameLength = ord($BinaryHelper->GetByte());
  $FactionName = $BinaryHelper->GetString($NameLength);

  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('state_form'));
  $BinaryHelper->MovePointerForward(strlen('state_form') + 8);
  $NameLength = ord($BinaryHelper->GetByte());
  $StateForm = $BinaryHelper->GetString($NameLength);

  $Name = str_replace('%s',$FactionName,$StateForm);
  $SeenFactionData[$Index]['Name'] = str_replace("/*This refers to factions, such as 'The Xsotan'.*/",'',$Name);

  //Get Home Sector x,y
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('home_sector'));
  $BinaryHelper->MovePointerForward(strlen('home_sector') + 8);
  $SeenFactionData[$Index]['HomeX'] = $BinaryHelper->ConvertSignedBin($BinaryHelper->GetByte());
  $SeenFactionData[$Index]['HomeY'] = $BinaryHelper->ConvertSignedBin($BinaryHelper->GetByte());

  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('color1'));
  $BinaryHelper->MovePointerForward(strlen('color1') + 8);
  $SeenFactionData[$Index]['Color1'] = bin2hex($BinaryHelper->GetBits(3));
  $BinaryHelper->MovePointerForward(19);
  $SeenFactionData[$Index]['Color2'] = bin2hex($BinaryHelper->GetBits(3));
  $BinaryHelper->MovePointerForward(19);
  $SeenFactionData[$Index]['Color3'] = bin2hex($BinaryHelper->GetBits(3));

  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('traits'));
  $BinaryHelper->MovePointerForward(strlen('traits') + 17);
  $NumTraits = $BinaryHelper->ConvertBin($BinaryHelper->GetByte());
  $TraitNames = array();
  for ($i=0; $i < $NumTraits; $i++) {
    $NameLength = $BinaryHelper->ConvertBin($BinaryHelper->GetByte());
    $TraitNames[] = $BinaryHelper->GetString($NameLength);
  }
  $SeenFactionData[$Index]['TraitNames'] =  $TraitNames;
  $BinaryHelper->MovePointerForward(17);

  $TraitValues = array();
  for ($i=0; $i < $NumTraits; $i++) {
    $TraitValues[] = round($BinaryHelper->ConvertFloatBin($BinaryHelper->GetByte()),2);
  }
  $SeenFactionData[$Index]['TraitValues'] =  $TraitValues;

}//End foreach player files

//Grab only Main Factions, to build the traits table
$TwoPlus = $Common->preg_grep_keys('[200*]',$SeenFactionData);

$TraitsTableColumns = array('FactionID' => array('INTEGER', 'NOT NULL','PRIMARY KEY'));

//Get traits
foreach (reset($TwoPlus)['TraitNames'] as $key => $value) {
  $TraitsTableColumns[$value] = 'REAL';
}

//Now build the table appending any new traits
$db->create_dynamic_table('traits', $TraitsTableColumns);

//Update the database
foreach ($SeenFactionData as $index => $data) {
  $TraitValues = false;
  $TraitNames = false;

  if(array_key_exists('TraitValues',$data)){
    $TraitValues = $data['TraitValues'];
    $TraitNames = $data['TraitNames'];
    unset($data['TraitValues']);
    unset($data['TraitNames']);
  }

  $stmt = $db->prepare('SELECT ID FROM factions WHERE ID=:ID');
  $stmt->bindValue(':ID', $index, SQLITE3_INTEGER);
  $result = $stmt->execute();
  if ($result->fetchArray()) {
    unset($data['ID']);
    $db->update('factions', array('ID' => $index), $data);
  } else {
    $db->insert('factions', $data);
  }

  if($TraitValues){
    $Data = array();
    foreach ($TraitNames as $key => $value) {
      $Data[$value] = $TraitValues[$key];
    }

    $stmt = $db->prepare('SELECT FactionID FROM traits WHERE FactionID=:FactionID');
    $stmt->bindValue(':FactionID', $index, SQLITE3_INTEGER);
    $result = $stmt->execute();
    if ($result->fetchArray()) {
      $db->update('traits', array('FactionID' => $index), $Data);
    } else {
      $Data['FactionID'] = $index;
      $db->insert('traits', $Data);
    }
  }

}

$db->close();

//Backup DB
$Common->BackupDB();

//Log this event
$Common->LogMessage("Finished GetAllianceData()",true);
echo "Finished GetAllianceData()" . PHP_EOL;
