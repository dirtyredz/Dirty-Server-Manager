<?php

/**
 * Common Binary Helper functions
 */
class BinaryHelper
{

  public $Pointer = 0;
  private $haystack = '';
  /**
   * Class Constructor
   * @method __construct
   */
  function __construct(string $haystack)
  {
    $this->haystack = $haystack;
  }

  public function SetPointer(int $pointer){
    $this->Pointer = $pointer;
  }

  public function SearchVariableName(string $needle){
    return strpos($this->haystack, $needle);
  }

  public function MovePointerForward(int $fwdValue){
    $this->Pointer = $this->Pointer + $fwdValue;
  }

  public function MovePointerBackwards(int $backValue){
    $this->Pointer = $this->Pointer - $backValue;
  }

  //Byte = 8 bits or 4 hex
  public function GetByte(){
    $rtn = substr($this->haystack, $this->Pointer, 4);
    $this->MovePointerForward(4);
    return $rtn;
  }

  public function GetBytes(int $Bytes){
    $rtn = substr($this->haystack, $this->Pointer, 4 * $Bytes);
    $this->MovePointerForward(4 * $Bytes);
    return $rtn;
  }

  public function GetBits(int $Bits){
    $rtn = substr($this->haystack, $this->Pointer, $Bits);
    $this->MovePointerForward($Bits);
    return $rtn;
  }

  public function GetString(int $length){
    $rtn = substr($this->haystack, $this->Pointer, $length);
    $this->MovePointerForward($length);
    return $rtn;
  }

  public function GetArray(int $indices, int $length){
    $rtn_array = array();
    for ($i=0; $i < $indices; $i++) {
      $rtn_array[] = bin2hex($this->GetBytes($length));
    }
    return $rtn_array;
  }

  public function ShowHex(int $length){
    $rtn = substr($this->haystack, $this->Pointer, $length);
    echo bin2hex($rtn).PHP_EOL;
  }

  public function ConvertBinArrayCount(array $arr){
    $Count = 0;
    foreach ($arr as $key => $value) {
      $Count += base_convert($this->RotateEndian($value),16,10);
    }
    return $Count;
  }

  public function RotateEndian($Hex){
    return implode('',array_reverse(str_split($Hex,2)));
  }

  public function ConvertBin($hexcode){
    return base_convert($this->RotateEndian(bin2hex($hexcode)),16,10);
  }

  public function ConvertSignedBin($BinCode){
    $Unsigned = $this->ConvertBin($BinCode);
    if ($Unsigned>0x7FFFFFFF){ $Unsigned-=0x100000000; }
    return $Unsigned;
  }

  public function ConvertFloatBin($hexcode){
    $v = hexdec($this->RotateEndian(bin2hex($hexcode)));
    $x = ($v & ((1 << 23) - 1)) + (1 << 23) * ($v >> 31 | 1);
    $exp = ($v >> 23 & 0xFF) - 127;
    return $x * pow(2, $exp - 23);
  }
}
