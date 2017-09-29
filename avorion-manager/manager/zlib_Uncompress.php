<?php

$verbose = $argv[1];
$output = $argv[2];
$broadcast = $argv[3];
$delay = $argv[4];
$force = $argv[5];
$DisplayDescription = $argv[6];
$SecondCommand = $argv[7];

if (file_exists($SecondCommand)) {
  /*Remove first 44 bytes
    koonschi - 06/12/2017
    there's 44 bytes of metadata before the actual compressed data. you should be able to uncompress the data with zlib
  */
  $DecompressedFile = @zlib_decode(file_get_contents($SecondCommand, NULL, NULL, 44));
  if(false === $DecompressedFile){
    echo 'Unable to decompress file: ' . $SecondCommand . PHP_EOL;
    exit;
  }
  file_put_contents($SecondCommand.'.dat',$DecompressedFile);
} else {
  echo 'File does not exsist: '.$SecondCommand;
  exit;
}
