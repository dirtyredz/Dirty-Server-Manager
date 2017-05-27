<?php
class SpaceInvadersController extends CommonController{
    public $HighScore = array();
    function __construct(){
        parent::__construct();
        include __DIR__ .'/../HighScore.php';
        $this->HighScore = $HighScore;
    }
    public function UploadScore(array $Query){
      $IPAddress = str_replace('var1=','',htmlspecialchars($Query[1]));
      $Score = str_replace('var2=','',htmlspecialchars($Query[2]));
      if(array_key_exists($IPAddress,$this->HighScore)){
        if($this->HighScore[$IPAddress] < $Score){
          $this->HighScore[$IPAddress] = $Score;
        }
      }else{
        $this->HighScore[$IPAddress] = $Score;
      }

      $this->StoreHighScore();
    }
    public function GetScore(){
      arsort($this->HighScore);
      foreach ($this->HighScore as $IP => $Score) {
        echo $IP.'~'.$Score.'~';
      }
    }
    private function StoreHighScore(){
      $file = "<?php\n\n\$HighScore=".var_export($this->HighScore, TRUE).";";
      file_put_contents(__DIR__ .'/../HighScore.php', $file);
    }
}
