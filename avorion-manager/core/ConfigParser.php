<?php
/**
 * Parses through an INI file and generates an array.
 * also capable of writing back to an INI file
 */
class ConfigParser
{
  /** @var string $FilePath Stores the filepath when parsing so we can write back to same file */
  protected $FilePath;
  /** @var array $ParsedData Array of INI options and values */
  protected $ParsedData;
  /** @var boolean $Success used to verify when an INI file has been successfully parsed */
  public $Success;
  /**
   * Constructor.
   * defaults $Success to false
   */
  public function __construct()
  {
    $this->Success = false;
  }

  /**
   * Parses through an INI file storing results into an array
   * @method ParseINI
   * @param  string $File File location you wish to parse
   */
  public function ParseINI($File)
  {
    //sets the filepath to be used later
    $this->FilePath = $File;

    //test if file exsists the parse
    if(file_exists($File) === true){
      //ignore errors well write our own if failed
      $this->ParsedData = @parse_ini_file($File, false, INI_SCANNER_RAW);
    }else{
      //create empty array since the file doesnt exsist
      $this->ParsedData = [];
    }
    //Weve completed the parsing
    $this->Success = true;
    //if the file exists but returned false due to an error
    if(false === $this->ParsedData){
      //parsing failed reset $Succes
      $this->Success = false;
      throw new \Exception(sprintf('Unable to parse file ini : %s', $this->FilePath));
    }
  }

  /**
   * method to return ParsedData as array.
   * @return array
   */
  public function GetINI()
  {
    //returns the parsedData
    //we should validate parsedata to ensure this isnt called before ParseINI()
    //prolly why I made ParsedData protected and needed to extract it via a method, sigh
    return $this->ParsedData;
  }


  /**
   * Adds or Updates key value pairs in the parsedData Array
   *
   * @param array $NewArray
   * @return void
   */
  public function update(array $NewArray)
  {
    //I need to verifiy ParseINI has already been run
    $this->ParsedData = array_replace_recursive($this->ParsedData, $NewArray);
  }

  /**
   * Writes $ParsedData back to $FilePath
   * accepts array for comments to be added before each $key in $ParsedData's array
   *
   * @param mixed $Comments Array of comments to be added, defaults null
   * @return bool true for a succes
   */
  public function write(array $Comments = null)
  {
    //Again should verify ParsedINI() has been run and $FilePath is set
    //why am i doing this?
    $ParsedData_array = $this->ParsedData;
    /** @var string $file_content setup for the contents to put write to the file */
    $file_content = null;
    foreach ($ParsedData_array as $key_2 => $value_2) {
      //if there are comments to write
      if($Comments){
        //append $file_content
        //should verify if key exsists
        $file_content .= ";".$Comments[$key_2]['Definition']."\n";
      }
      //Append key and value to $file_contents
      //encode values to valid ini format
      $file_content .= $key_2.'='.self::encode($value_2)."\n";
    }
    //Remove leading newlines from $file_contents
    $file_content = preg_replace('#^\n#', '', $file_content);
    //silence error
    //Write $file_content to $FilePath
    $result = @file_put_contents($this->FilePath, $file_content);
    if (false === $result) {
        throw new \Exception(sprintf('Unable to write in the file ini : %s', $this->FilePath));
    }
    //What?
    return ($result !== false) ? true : false;
  }

  /**
   * Encodes a value to valid INI format
   *
   * @param mixed $value value to encode to valid INI format
   *
   * @return mixed
   */
  private static function encode($value)
  {
    if ($value == '1' || $value === true) {
      //we dont want to store a boolean as a string
      return 1;
    } elseif ($value == '0' || $value === false) {
      //we dont want to store a boolean as a string
      return 0;
    } elseif ($value == '') {
      //Shouldent i return single qoutes?
      return '""';
    } elseif ($value == 'true') {//should i be using strict comparison? ===
      //if implicetly writing the word true then return it
      return "true";
    } elseif ($value == 'false') {//should i be using strict comparison? ===
      //if implicetly writing the word false then return it
      return "false";
    }
    //if dealing with a numeric value ensure its returned as a numeric value and not a string
    if (is_numeric($value)) {
        $value = $value * 1;
        if (is_int($value)) {
            return (int) $value;
        } elseif (is_float($value)) {
            return (float) $value;
        }
    }
    //return value with single quoutes for valid INI string,
    //otherwise INI parses would breake with words containing special charectors or spaces
    return "'".$value."'";
  }
}
