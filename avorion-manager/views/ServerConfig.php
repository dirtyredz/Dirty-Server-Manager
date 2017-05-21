<style type="text/css">
    .wrapper {
        margin-top:30px;
        width:100%;
        font-family:sans-serif;
        color:#555;
        font-size:14px;
        line-height:24px;
        min-width: 450px;
    }
    h1 {
        font-size:20px;
        font-weight:bold;
        text-align:center;
        text-transform:uppercase;
    }
    h1 + p {
        text-align:center;
        margin:20px 0;
        font-size:16px;
    }
    .tabs{
      list-style: none;
      margin: 0;
      padding: 0;
          display: flex;
    }
    .tabs li {
      float:left;
      flex-grow: 1;
      background: white;
      display: inline-flex;
      text-align: center;
    }
    .tabs a {
      display:block;
      text-align:center;
      text-decoration:none;
      text-transform:uppercase;
      color:#888;
      padding:20px 0;
      border-bottom:2px solid #888;
      background:#f7f7f7;
      min-width: 150px;
      width: 100%;
    }
    .tabs a:hover, .tabs a.active {
      background:#ddd;
    }
    .tabgroup div {
      padding:30px;
      box-shadow:0 3px 10px rgba(0,0,0,.3);
    }
    .clearfix:after {
      content:"";
      display:table;
      clear:both;
    }
    .tabgroup div .ConfigContainer{
      display: flex;
      padding: 0;
    }
    .tabgroup div .ConfigInput{
      padding: 10px;
      display: flex;
      align-items: center;
      flex-grow: 1;
      flex: 3;
      box-shadow: none;
    }
    .tabgroup div .ConfigOption{
      padding: 10px;
      flex-grow: 1;
      flex: 1;
      box-shadow: none;
    }
    .tabgroup div .ConfigOption span{
      font-size: 20px;
    }
    .tabgroup div .ConfigOption .Definition{
      font-size: 15px;
    }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-cogs"></use></svg>SERVER CONFIG</span><span class="Time"></span></div>
<br/>
<div class="wrapper">
<ul class="tabs clearfix" data-tabgroup="first-tab-group">
  <li><a href="#tab1" class="active">server</a></li>
  <li><a href="#tab2">Manager</a></li>
  <li><a href="#tab3">PHP</a></li>
</ul>
<section id="first-tab-group" class="tabgroup">
  <div id="tab1">
    <h2>Server INI</h2>

    <?php
      $Count = 0;
      foreach ($Data['ServerINI'] as $key => $value) {
        ?>
        <div class="ConfigContainer">
          <div class="ConfigOption">
            <span><?php echo $key; ?></span>
            <br/>
            <span class="Definition"><?php echo $Data['ServerINIDetails'][$Count]['Definition']; ?></span>
          </div>
          <div class="ConfigInput">
            <?php
              if($Data['ServerINIDetails'][$Count]['Type'] == 'input'){
                echo '<input class="" type="text" name="'.$key.'" value="'.$value.'"></input>';
              }elseif($Data['ServerINIDetails'][$Count]['Type'] == 'select'){
                echo '<select>';
                  foreach ($Data['ServerINIDetails'][$Count]['Values'] as $SelectKey => $SelectValue) {
                    if($value == $SelectValue){
                      echo '<option value="'.$SelectValue.'" selected>'.$SelectKey.'</option>';
                    }else{
                      echo '<option value="'.$SelectValue.'">'.$SelectKey.'</option>';
                    }
                  }
                echo '</select>';
              }
              echo '&nbsp;&nbsp;&nbsp;'.$value; 
             ?>

          </div>
        </div>
        <?php
        $Count +=1;
      }
     ?>
  </div>
  <div id="tab2">
    <h2>Manager Config</h2>
    <?php
      foreach ($Data['ManagerConfig'] as $key => $value) {
        echo $key.' => '.$value.'</br>';
      }
     ?>
  </div>
  <div id="tab3">
    <h2>PHP Config</h2>
    <?php
      foreach ($Data['PHPConfig'] as $key => $value) {
        if($value != strip_tags($value)) {
            $value = htmlentities($value);
        }
        echo $key.' => '.$value.'</br>';
      }
     ?>
   </div>
</section>
</div>

<script type="text/javascript">
    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function(e){
    e.preventDefault();
      var $this = $(this),
          tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
          others = $this.closest('li').siblings().children('a'),
          target = $this.attr('href');
      others.removeClass('active');
      $this.addClass('active');
      $(tabgroup).children('div').hide();
      $(target).show();

    })
</script>
