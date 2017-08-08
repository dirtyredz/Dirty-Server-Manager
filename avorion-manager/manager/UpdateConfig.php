<?php
$OldFilePath = $argv[1];//  /home/avorion/manager-config.ini
$NewFilePath = $argv[2];//  /home/avorion/manager-config.ini
$ManagerOrPHP = $argv[3]; //'Manager'  'PHP'

require_once  __DIR__ .'/../core/CommonController.php';
require_once  __DIR__ .'/../core/ServerConfigController.php';
$ServerConfigController = new ServerConfigController();

require_once  __DIR__ .'/../core/ConfigParser.php';
$ConfigParser = new ConfigParser();

$ConfigParser->ParseINI($OldFilePath);
if($ConfigParser->Success){
  $OldConfig = $ConfigParser->GetINI();

  $ConfigParser->ParseINI($NewFilePath);

  $ConfigParser->update($OldConfig);

  if($ManagerOrPHP == 'Manager'){

    $NewDetails = $ServerConfigController::ManagerConfigOptions;

  }elseif($ManagerOrPHP == 'PHP'){

    $NewDetails = $ServerConfigController::PHPConfigDetails;

  }

  $ConfigParser->write($NewDetails,' ');
}else{
  echo 'Failed to Update '.$NewFilePath;
  echo 'Original file backed up to: '.$OldFilePath;
}
