<?php
$input = $argv[1];
$output = $argv[2];

if (file_exists($input)) {
  /*Remove first 44 bytes
    koonschi - 06/12/2017
    there's 44 bytes of metadata before the actual compressed data. you should be able to uncompress the data with zlib
  */
  //shell_exec("dd if={$input} bs=1 skip=44 of={$input}.tmp > /dev/null 2>&1");
  shell_exec("cp {$input} {$input}.tmp");
  $Decompress = @zlib_decode(file_get_contents($input.'.tmp'));
  if(false === $Decompress){
    echo 'Unable to decompress file: '.$input.'.tmp'.PHP_EOL;
  }
  file_put_contents($output,$Decompress);
  //Destroy tmp file
  unlink($input.'.tmp');
} else {
  echo 'File does not exsist: '.$input.'.tmp';
  exit;
}
