<style type="text/css">
  .SectorDiv{
    font-size: 40px;
  }
  .ClickMe{
    cursor: pointer;
    margin-bottom: 10px;
  }
  .ClickMe.TooMuch{
    display: none;
  }
  .ClickMe span{
    padding: 2px;
    background-color: #315683;
    border-radius: 10%;
    width: 125px;
    float: left;
    text-align: center;
  }
  .ClickMe span.TooMuch{
    display: none;
  }
  .ExtraDetails{
    padding-top: 5px;
    padding-left: 50px;
    display: none;
  }
  .ShowMore{
    text-decoration: underline;
    font-size: 15px;
    cursor: pointer;
    padding: 2px;
    width: 125px;
    float: left;
    text-align: center;
    margin-bottom: 7px;
  }
  .clear{
    clear: both;
  }
</style>
<div id="Top"><span class="Title"><svg class="icon icon-document-text"><use xlink:href="#icon-document-text"></use></svg>PROFILE PARSER</span><span class="Time"></span></div>
<br/>
<br/>
<br/>
<div>Sectors are sorted by the highest ms</div>
<div>
<?php
$TooMuchCount = 0;
if(is_array($Data['ParsedData'])){
  foreach ($Data['ParsedData'] as $key => $value) {
    echo '<div class="SectorDiv">'.$value['coords'].'</div></br>';
    echo '<div class="SectorDetails">';
    foreach ($value['rootArrays'] as $RootIndex => $RootArray) {

      if($TooMuchCount >= 5){
        if($TooMuchCount == 5){
          echo '<span class="ShowMore">Show More</span><br class="clear">';
        }
        echo '<div class="ClickMe TooMuch"><span class="TooMuch">'.$RootArray['root'].' ms</span></br><div class="ExtraDetails">';
      }else{
        echo '<div class="ClickMe"><span>'.$RootArray['root'].' ms</span></br><div class="ExtraDetails">';
      }
      for ($i=0; $i < (count($RootArray)-1) ; $i++) {
        echo $RootArray[$i].'</br>';
      }
      echo '</div></div>';
      $TooMuchCount += 1;

    }
    echo '</div>';
    echo '</br></br>';
    $TooMuchCount = 0;
  }
}else{
  echo '</br>'.$Data['ParsedData'];
}
?>
</div>
<script type="text/javascript">
$('.ClickMe').click(function(){
  $(this).find("div").toggle();
});
$('.ShowMore').click(function(){
  if($(this).html() == 'Show More'){
    $(this).html('Hide');
  }else{
    $(this).html('Show More');
  }
  $(this).parent().find('.TooMuch').toggle();
});
</script>
