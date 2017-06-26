<?php
/**
 */
class ProfileParser
{
  /** @var string $FilePath Stores the filepath when parsing so we can write back to same file */
  protected $FilePath;
  /** @var array $ParsedData Array of INI options and values */
  public $ParsedData;
  /** @var boolean $Success used to verify when an INI file has been successfully parsed */
  public $Success;
  /**
   * Constructor.
   */
  public function __construct($File)
  {
    //sets the filepath to be used later
    $this->FilePath = $File;

    $this->parse($File);
  }

  /**
   * Parses through an INI file storing results into an array
   * @method ParseINI
   * @param  string $File File location you wish to parse
   */
  private function Parse($File)
  {

    //test if file exsists the parse
    if(file_exists($File) === true){
      //ignore errors well write our own if failed
      $this->ParsedData = @file_get_contents($File);
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
      throw new \Exception(sprintf('Unable to parse file : %s', $this->FilePath));
    }
  }

}
