<?php
# Project: Dirty Server Manager
# Author: Dirtyredz | David McCLain
# License: MIT License, Copyright (c) 2017 David McCLain
# Purpose: Avorion Server Management Script and web interface
# Documentation: https://github.com/dirtyredz/Dirty-Server-Manager
# Website: https://github.com/dirtyredz/Dirty-Server-Manager

if (!defined('COMMAND_NAME')) define('COMMAND_NAME', 'enable_login_callback');
if (!defined('COMMAND_DESCRIPTION')) define('COMMAND_DESCRIPTION', 'Dynamically removes Player Login callback to server.lua.');

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

if($verbose == 'true'){
  echo "Disabling login callback in server.lua" . PHP_EOL;
}

//So we know where the galaxy directory is at
require __DIR__ . '/../core/CommonController.php';
$Common = new CommonController( );

$ServerOptions = $Common->ParseServerOptions();

$mainDirectory = str_replace('/manager','/',$Common->Config['Manager']);
$StartUpFile = $mainDirectory . '/serverfiles/' . $ServerOptions['Game']['startUpScript'];

$FileLines = $Common->GetFileLines($StartUpFile);
foreach ($FileLines as $key => $Line) {
  if(strpos($Line,'--Added by DSM') !== false){
    unset($FileLines[$key]);
  }
  if($Line === PHP_EOL){
    unset($FileLines[$key]);
  }
}

file_put_contents($StartUpFile, implode(PHP_EOL,$FileLines));
