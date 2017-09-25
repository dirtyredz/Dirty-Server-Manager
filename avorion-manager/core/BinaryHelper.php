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
      $Count += base_convert(implode('',array_reverse(str_split($value,2))),16,10);
    }
    return $Count;
  }

  public function ConvertBin($hexcode){
    return base_convert(implode('',array_reverse(str_split(bin2hex($hexcode),2))),16,10);
  }
}
