<?php
/**
 * Handles Highscore interaction with space invaders game
 */
class SpaceInvadersController extends CommonController
{
  /** @var array [description] */
  public $HighScore = array();
  public $DB;
  /**
   * Grabs HighScores from HighScores.php and store values into $HighScores array
   * @method __construct
   */
  function __construct()
  {
    parent::__construct();
    include __DIR__ .'/../HighScore.php';
    $this->HighScore = $HighScore;

    $HighScoresColumns = array(
      'ID' => array('INTEGER', 'NOT NULL', 'PRIMARY KEY AUTOINCREMENT'),
      'IPAddress' => 'TEXT',
      'Score' => 'TEXT'
    );

    //Database setup
    require_once __DIR__ . '/../core/MySQLite.php';
    $this->DB = new MySQLite();
    //Create dynamic table so if future updates adds a new field
    $this->DB->create_dynamic_table('highscores', $HighScoresColumns);
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


    $stmt = $this->DB->prepare('SELECT * FROM highscores WHERE IPAddress=:IPAddress');
    $stmt->bindValue(':IPAddress', $IPAddress, SQLITE3_TEXT);
    $result = $stmt->execute();
    $User = $result->fetchArray(SQLITE3_ASSOC);
    if ($User) {
      if($User['Score'] < $Score){
        $this->DB->update('highscores', array('ID' => $User['ID']) ,array('IPAddress' => $IPAddress, 'Score' => $Score));
      }
    }else{
      $this->DB->insert('highscores', array('IPAddress' => $IPAddress, 'Score' => $Score));
    }
  }

  /**
   * Returns high score sorted highest first
   * @method GetScore
   * @return string echo's each high score
   */
  public function GetScore()
  {
    $results = $this->DB->query('SELECT * FROM highscores ORDER BY Score ASC');
    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        echo $row['IPAddress'].'~'.$row['Score'].'~';
    }
  }
}
