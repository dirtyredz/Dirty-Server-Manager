<?php
include 'CommonController.php';
$CommonController = new CommonController;
$status = $argv[1];
echo 'Sending RCON command.'.PHP_EOL;
echo $CommonController->RconSend($status);
 ?>