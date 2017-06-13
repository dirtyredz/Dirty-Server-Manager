<?php
$input = $argv[1];
$output = $argv[2];
file_put_contents($output,zlib_decode(file_get_contents($input)));
