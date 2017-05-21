<?php

class ConfigParser{
    protected $FilePath;
    protected $ParsedData;
    public $Success;
    /**
     * Constructor.
     *
     * @param string $File
     */
    public function __construct(){
      $this->Success = false;
    }

    public function ParseINI($File){
      $this->FilePath = $File;

      if(file_exists($File) === true){
          $this->ParsedData = @parse_ini_file($File, false, INI_SCANNER_RAW);

      }else{
          $this->ParsedData = [];
      }
      $this->Success = true;
      if(false === $this->ParsedData){
          $this->Success = false;
          throw new \Exception(sprintf('Unable to parse file ini : %s', $this->FilePath));
      }
    }

    /**
     * method to return ParsedData as array.
     */
    public function GetINI(){
      return $this->ParsedData;
    }


    /**
     * method for change value in the ini file.
     *
     * @param array $new_value
     */
    public function update(array $new_value){
        $this->ParsedData = array_replace_recursive($this->ParsedData, $new_value);
    }

    /**
     * method for write ParsedData in the ini file.
     *
     * @return bool true for a succes
     */
    public function write(){
        $ParsedData_array = $this->ParsedData;
        $file_content = null;
        foreach ($ParsedData_array as $key_1 => $groupe) {
            $file_content .= "\n[".$key_1."]\n";
            foreach ($groupe as $key_2 => $value_2) {
                if (is_array($value_2)) {
                    foreach ($value_2 as $key_3 => $value_3) {
                        $file_content .= $key_2.'['.$key_3.'] = '.self::encode($value_3)."\n";
                    }
                } else {
                    $file_content .= $key_2.' = '.self::encode($value_2)."\n";
                }
            }
        }
        $file_content = preg_replace('#^\n#', '', $file_content);
        $result = @file_put_contents($this->FilePath, $file_content);
        if (false === $result) {
            throw new \Exception(sprintf('Unable to write in the file ini : %s', $this->FilePath));
        }

        return ($result !== false) ? true : false;
    }

    /**
     * method for encode type for ini file.
     *
     * @param mixed $value
     *
     * @return string
     */
    private static function encode($value){
        if ($value == '1' || $value === true) {
            return 1;
        } elseif ($value == '0' || $value === false) {
            return 0;
        } elseif ($value == '') {
            return '""';
        }

        if (is_numeric($value)) {
            $value = $value * 1;
            if (is_int($value)) {
                return (int) $value;
            } elseif (is_float($value)) {
                return (float) $value;
            }
        }

        return '"'.$value.'"';
    }
}
