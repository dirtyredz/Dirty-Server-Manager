<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'enable_login_callback');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Dynamically adds Player Login callback to server.lua.');

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

include_once 'disable_login_callback.php';

if($verbose == 'true'){
  echo "Enabling login callback in server.lua" . PHP_EOL;
}

//Get Current file lines
$FileLines = $Common->GetFileLines($StartUpFile);

//Add new lines into exsisting lines
foreach ($FileLines as $key => $Line) {
  if(strpos($Line,'function onPlayerLogIn(playerIndex)') !== false){
    $FileLines[$key] = $Line."    RunMOTD(playerIndex)--Added by DSM".PHP_EOL;
  }
  if($Line === PHP_EOL){
    unset($FileLines[$key]);
  }
}

//Add New lines to the file
$FileLines[] = "function RunMOTD(playerIndex) --Added by DSM";
$FileLines[] = "    local player = Player(playerIndex) --Added by DSM";
$FileLines[] = "    player:sendChatMessage('MOTD', 0, '".$Common->ManagerConfig['MOTDMessage']."') --Added by DSM";
$FileLines[] = "end --Added by DSM";

//Write to the file
file_put_contents($StartUpFile, implode(PHP_EOL,$FileLines));
