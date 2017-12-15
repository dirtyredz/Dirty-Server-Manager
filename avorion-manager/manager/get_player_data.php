<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'get_player_data');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Parses through all player files.');

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
  'MailCount' => 'INTEGER',
  'MailMoney' => 'INTEGER',
  'MailIron' => 'INTEGER',
  'MailTitanium' => 'INTEGER',
  'MailNaonite' => 'INTEGER',
  'MailTrinium' => 'INTEGER',
  'MailXanion' => 'INTEGER',
  'MailOgonite' => 'INTEGER',
  'MailAvorion' => 'INTEGER',
  'SteamID' => 'INTEGER',
  'PlayTime' => 'INTEGER',
  'Money' => 'INTEGER',
  'Iron' => 'INTEGER',
  'Titanium' => 'INTEGER',
  'Naonite' => 'INTEGER',
  'Trinium' => 'INTEGER',
  'Xanion' => 'INTEGER',
  'Ogonite' => 'INTEGER',
  'Avorion' => 'INTEGER',
  'Alliance' => 'INTEGER',
  'LastSeen' => 'INTEGER',
  'GroupName' => 'TEXT'
);

//Create dynamic table so if future updates adds a new field
$db->create_dynamic_table('players', $TableColumns);

//So we know where the galaxy directory is at
require __DIR__ . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'core'.DIRECTORY_SEPARATOR.'CommonController.php';
$Common = new CommonController( );

//Log this event
$Common->LogMessage("Starting GetPlayerData()",true);
echo "Starting GetPlayerData()" . PHP_EOL;

//The players directory where the player files are stored
$PlayerDirectory = $Common->ManagerConfig['GalaxyDirectory'] . DIRECTORY_SEPARATOR . $Common->ManagerConfig['GALAXY'] . DIRECTORY_SEPARATOR."players".DIRECTORY_SEPARATOR;
echo $_SERVER['HOMEDRIVE'] . $_SERVER['HOMEPATH']. PHP_EOL;
if($verbose == 'true'){
  echo "Searching for player files in: " . $PlayerDirectory . PHP_EOL;
}

//Scan the directory
$PlayerFiles = $Common->scan_dir($PlayerDirectory);

//How many files
$numFiles = (count($PlayerFiles) - 2);

if($verbose == 'true'){
  echo "Found " . $numFiles . ", player files. (There are multiple copies of each player file, only parsing 1 for each player.)" . PHP_EOL;
}

$SeenPlayerData = array();

//Parse Admins.xml file and build array of groups=>names
$AdminsFile = $Common->ManagerConfig['GalaxyDirectory'] . "/" . $Common->ManagerConfig['GALAXY'] . "/admin.xml";
require __DIR__ . '/../core/AdminsXML.php';
$AdminsXML = new AdminsXML( $AdminsFile );

require __DIR__ . '/../core/BinaryHelper.php';

//Loop through EACH player file.
foreach ($PlayerFiles as $key => $file) {

  //Extract Index from file name
  $Index = preg_replace('(^player_|.dat.*)', '', $file);

  //If we already have parsed this players data
  if(array_key_exists($Index, $SeenPlayerData)) continue;

  //Use Player index as key
  $SeenPlayerData[$Index] = array();
  $SeenPlayerData[$Index]['ID'] = $Index;

  if($verbose == 'true'){
    //echo "Parsing file: " . $file . "\r";
  }

  //Decompress the player file
  $DecompressedFile = @zlib_decode(file_get_contents($PlayerDirectory . $file, NULL, NULL, 44));
  if(false === $DecompressedFile){
    echo 'Unable to decompress file: ' . $file . PHP_EOL;
    continue;
  }

  //Get Player Name
  $BinaryHelper = new BinaryHelper($DecompressedFile);
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('name'));
  $BinaryHelper->MovePointerForward(strlen('name') + 8);
  $NameLength = ord($BinaryHelper->GetByte());
  $PlayerName = $BinaryHelper->GetString($NameLength);
  $SeenPlayerData[$Index]['Name'] = $PlayerName;

  #Last Seen

  //Get Mail Count
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('mail_items'));
  $BinaryHelper->MovePointerForward(strlen('mail_items') + 23);
  $MailCheck = $BinaryHelper->GetString(6);

  //Get Mail data
  if($MailCheck == 'header'){
    $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('money64'));
    $BinaryHelper->MovePointerForward(strlen('money64') + 4);
    $MailCount = ord($BinaryHelper->GetByte());

    $SeenPlayerData[$Index]['MailCount'] = $MailCount;

    $SeenPlayerData[$Index]['MailMoney'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('resources640'));
    $BinaryHelper->MovePointerForward(strlen('resources640') + 8);
    $SeenPlayerData[$Index]['MailIron'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailTitanium'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailNaonite'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailTrinium'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailXanion'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailOgonite'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
    $BinaryHelper->MovePointerForward(24);
    $SeenPlayerData[$Index]['MailAvorion'] = $BinaryHelper->ConvertBinArrayCount($BinaryHelper->GetArray($MailCount,2));
  }else{
    $SeenPlayerData[$Index]['MailCount'] = 0;
    $SeenPlayerData[$Index]['MailMoney'] = 0;
    $SeenPlayerData[$Index]['MailIron'] = 0;
    $SeenPlayerData[$Index]['MailTitanium'] = 0;
    $SeenPlayerData[$Index]['MailNaonite'] = 0;
    $SeenPlayerData[$Index]['MailTrinium'] = 0;
    $SeenPlayerData[$Index]['MailXanion'] = 0;
    $SeenPlayerData[$Index]['MailOgonite'] = 0;
    $SeenPlayerData[$Index]['MailAvorion'] = 0;
  }

  //Get SteamID/Credits/PlayTime/Resources
  $PlayTimePointer = $BinaryHelper->SearchVariableName('play_time');
  $BinaryHelper->SetPointer($PlayTimePointer);
  $BinaryHelper->MovePointerBackwards(39);
  $SeenPlayerData[$Index]['SteamID'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->SetPointer($PlayTimePointer);
  $BinaryHelper->MovePointerBackwards(12);
  $SeenPlayerData[$Index]['Money'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->SetPointer($PlayTimePointer);
  $BinaryHelper->MovePointerForward(17);
  $SeenPlayerData[$Index]['PlayTime'] = $BinaryHelper->ConvertBin($BinaryHelper->GetByte());
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Iron'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Titanium'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Naonite'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Trinium'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Xanion'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Ogonite'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));
  $BinaryHelper->MovePointerForward(24);
  $SeenPlayerData[$Index]['Avorion'] = $BinaryHelper->ConvertBin($BinaryHelper->GetBytes(2));

  //Get Alliance data
  $BinaryHelper->SetPointer($BinaryHelper->SearchVariableName('alliance'));
  $BinaryHelper->MovePointerForward(strlen('alliance') + 8);
  $SeenPlayerData[$Index]['Alliance'] = $BinaryHelper->ConvertBin($BinaryHelper->GetByte());

  //Get Group data
  $AdminXMLNames = $AdminsXML->GetAll();
  $SeenPlayerData[$Index]['GroupName'] = '';
  foreach ($AdminXMLNames as $group => $namesArray) {
    foreach ($namesArray as $name) {
      if($PlayerName == $name){
        $SeenPlayerData[$Index]['GroupName'] = $group;
        break 2;
      }
    }
  }

  //Get LastSeen
  $SeenPlayerData[$Index]['LastSeen'] = 'Unkown';
  if(is_file(__DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'console.log')){
      $ConsoleLog = file_get_contents(__DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'console.log');
      $InConsoleLog = strpos($ConsoleLog, $PlayerName.' joined');
      if($InConsoleLog !== false){
        $date = new DateTime();
        $SeenPlayerData[$Index]['LastSeen'] = $date->getTimestamp();
      }else{
        $PlayerDB = $db->GetRow('players',array('ID'=>$Index));
        if($PlayerDB['LastSeen']){
          $SeenPlayerData[$Index]['LastSeen'] = $PlayerDB['LastSeen'];
        }
      }
  }


}//End foreach player files

//Update the database
foreach ($SeenPlayerData as $index => $data) {
  $stmt = $db->prepare('SELECT ID FROM players WHERE ID=:ID');
  $stmt->bindValue(':ID', $index, SQLITE3_INTEGER);
  $result = $stmt->execute();
  if ($result->fetchArray()) {
    unset($data['ID']);
    $db->update('players', array('ID' => $index), $data);
  } else {
    $db->insert('players', $data);
  }
}

$db->close();

//Backup DB
$Common->BackupDB();

//Log this event
$Common->LogMessage("Finished GetPlayerData()",true);
echo "Finished GetPlayerData()" . PHP_EOL;
