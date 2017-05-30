<?php
/**
 * Handles Highscore interaction with space invaders game
 */
class SpaceInvadersController extends CommonController
{
  /** @var array [description] */
  public $HighScore = array();

  /**
   * Grabs HighScores from HighScores.php and store values into $HighScores array
   * @method __construct
   */
  function __construct()
  {
      parent::__construct();
      include __DIR__ .'/../HighScore.php';
      $this->HighScore = $HighScore;
  }

  /**
   * Adds new HighScore to the HighScores Array
   * @method UploadScore
   * @param  array $Query Array containing IP address and Score
   * @return void
   */
  public function UploadScore(array $Query)
  {
    //This can be generated here..... instead of in JS
    $IPAddress = str_replace('var1=','',htmlspecialchars($Query[1]));
    $Score = str_replace('var2=','',htmlspecialchars($Query[2]));
    //If IPAddress already has a high score
    if(array_key_exists($IPAddress,$this->HighScore)){
      //Check if new score is better then previoes high score
      if($this->HighScore[$IPAddress] < $Score){
        $this->HighScore[$IPAddress] = $Score;
      }
    }else{
      //New high score
      $this->HighScore[$IPAddress] = $Score;
    }
    //Store $HighScore array
    $this->StoreHighScore();
  }

  /**
   * Returns high score sorted highest first
   * @method GetScore
   * @return string echo's each high score
   */
  public function GetScore()
  {
    //Sorts highscores with Highest first
    arsort($this->HighScore);
    //echo out each high score
    foreach ($this->HighScore as $IP => $Score) {
      echo $IP.'~'.$Score.'~';
    }
  }

  /**
   * Stores $HighScore array into HighScore.PHPConfig
   *
   * @method StoreHighScore
   * @return void
   */
  private function StoreHighScore()
  {
    //Generates content to be put into file
    $file = "<?php\n\n\$HighScore=".var_export($this->HighScore, TRUE).";";
    //puts contents into file
    file_put_contents(__DIR__ .'/../HighScore.php', $file);
  }
}
