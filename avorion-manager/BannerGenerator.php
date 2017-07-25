<?php
if (!function_exists('imagecreatefromjpeg')) {
  echo 'PHPx.x-gd is not installed, unable to create status banner.'."\n";
  exit;
}
$status = $argv[1];
$IPAddress = $argv[2];
$GalaxyName = $argv[3];
$OnlinePlayers = $argv[4];

require_once __DIR__ .'/core/CommonController.php';
require_once  __DIR__ .'/core/ServerConfigController.php';
$ServerConfigController = new ServerConfigController();
$TempConfig = $ServerConfigController->GetPHPConfig();

$BannerNameOne = str_replace("'", "", $TempConfig['BannerNameOne']);
$BannerNameTwo = str_replace("'", "", $TempConfig['BannerNameTwo']);
$CustomMessageOne = str_replace("'", "", $TempConfig['BannerCustomMessageOne']);
$CustomMessageTwo = str_replace("'", "", $TempConfig['BannerCustomMessageTwo']);
$CustomMessageThree = str_replace("'", "", $TempConfig['BannerCustomMessageThree']);

if(empty($BannerNameOne)){
  $BannerNameOne = $GalaxyName;
}
if(empty($BannerNameTwo)){
  $BannerNameTwo = $IPAddress;
}

$Dir = dirname(__FILE__)."/webroot/banner/";
$originalFile = $Dir."BannerImgTemplate.jpg";
$im = @imagecreatefromjpeg($originalFile)
    or die("Cannot Initialize new GD image stream");
$width = imagesx( $im );
$height = imagesy( $im );
$LargeImage = imagecreatetruecolor(728, 210);
$SmallImage = imagecreatetruecolor(468, 80);
imagecopyresampled($LargeImage, $im, 0, 0, 0, 0, 728, 210, $width, $height);
imagecopyresampled($SmallImage, $im, 0, 0, 0, 0, 468, 80, $width, $height);

$white = imagecolorallocate($LargeImage, 255, 255, 255);
$green = imagecolorallocate($LargeImage, 0, 255, 0);
$red = imagecolorallocate($LargeImage, 255, 0, 0);
$white = imagecolorallocate($SmallImage, 255, 255, 255);
$green = imagecolorallocate($SmallImage, 0, 255, 0);
$red = imagecolorallocate($SmallImage, 255, 0, 0);

//Large Image
imagettftext($LargeImage, 30, 0, 20, 40, $white, $Dir."avantgarde-bold-webfont.ttf", $BannerNameOne);
imagettftext($LargeImage, 25, 0, 20, 200, $white, $Dir."avantgarde-bold-webfont.ttf", $BannerNameTwo);
imagettftext($LargeImage, 16, 0, 550, 125, $white, $Dir."avantgarde-bold-webfont.ttf", $CustomMessageOne);
imagettftext($LargeImage, 16, 0, 550, 150, $white, $Dir."avantgarde-bold-webfont.ttf", $CustomMessageTwo);
imagettftext($LargeImage, 16, 0, 550, 175, $white, $Dir."avantgarde-bold-webfont.ttf", $CustomMessageThree);
imagettftext($LargeImage, 16, 0, 550, 200, $white, $Dir."avantgarde-bold-webfont.ttf", "Players: ".$OnlinePlayers);
if(rtrim($status) == "Offline"){
  imagettftext($LargeImage, 25, 0, 550, 40, $red, $Dir."avantgarde-bold-webfont.ttf", $status);
}else{
  imagettftext($LargeImage, 25, 0, 550, 40, $green, $Dir."avantgarde-bold-webfont.ttf", $status);
}
imagejpeg($LargeImage, $Dir."StatusBannerLrg.jpg");

//Small Image
imagettftext($SmallImage, 20, 0, 10, 30, $white, $Dir."avantgarde-bold-webfont.ttf", $BannerNameOne);
imagettftext($SmallImage, 15, 0, 20, 75, $white, $Dir."avantgarde-bold-webfont.ttf", $BannerNameTwo);
imagettftext($SmallImage, 12, 0, 340, 75, $white, $Dir."avantgarde-bold-webfont.ttf", "Players: ".$OnlinePlayers);
$status = $argv[1];//@shell_exec('/home/avorion/avorion-manager/script.sh') or die('Offline');
if(rtrim($status) == "Offline"){
  imagettftext($SmallImage, 18, 0, 360, 30, $red, $Dir."avantgarde-bold-webfont.ttf", $status);
}else{
  imagettftext($SmallImage, 18, 0, 360, 30, $green, $Dir."avantgarde-bold-webfont.ttf", $status);
}
imagejpeg($SmallImage, $Dir."StatusBannerSml.jpg");

//DESTROY
imagedestroy($LargeImage);
imagedestroy($SmallImage);
imagedestroy($im);
?>
