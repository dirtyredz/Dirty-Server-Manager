<style type="text/css">
    .wrapper {
        margin-top:30px;
        width:100%;
        font-family:sans-serif;
        color: #bfbfbf;
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
      color: #191818;
      font-weight: bold;
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
      color: #769aff;
    }
    .tabgroup div .ConfigOption .Definition{
      font-size: 15px;
      color: #bfbfbf;
    }
    input[type="submit"]{
      background-color: #315683;
      width: 100px;
      margin: 10px;
      border-radius: 4px;
      cursor: pointer;
      -webkit-appearance: none;
      border: none;
      font-size: 150%;
      font-weight: bold;
      font-family: inherit;
      color: white;
      transition: background-color 500ms;
    }
    input[type="submit"]:hover{
      transform: rotate(1deg);
    }
    input[type="number"]{
      width: 120px;
    }
    .ChangeElsewhere{
      color: red;
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
    <h2>Server Config</h2>
    NOTE: If an avorion patch has been released containing more option then this form has then dont use this form.</br>
    It will rewrite server.ini with only these option breaking your current server.ini</br></br>
    <form id="ServerConfigForm" novalidate>
      <?php if($Data['ChangeServerINI']){
        if($Data['OnlineStatus']){
          echo 'Cannot Edit config while server is online!';
        }else{
          echo '<input type="submit" name="submit" value="Submit" />';
        }
      }?>
    </br>
    </br>
    </br>
    <?php
      foreach ($Data['ServerINI'] as $key => $value) {
        $value = trim($value,"'");
        if($value != strip_tags($value)) {
            $value = htmlentities($value);
        }
        ?>
        <div class="ConfigContainer">
          <div class="ConfigOption">
            <span><?php echo $key; ?></span>
            <br/>
            <span class="Definition"><?php echo $Data['ServerINIDetails'][$key]['Definition']; ?></span>
          </div>
          <div class="ConfigInput">
            <?php
              if($Data['ChangeServerINI'] && !$Data['OnlineStatus']){
                if($Data['ServerINIDetails'][$key]['Type'] == 'text'){
                  echo '<input class="" type="text" name="'.$key.'" value="'.$value.'"></input>';
                }elseif($Data['ServerINIDetails'][$key]['Type'] == 'select'){
                  echo '<select name="'.$key.'">';
                    foreach ($Data['ServerINIDetails'][$key]['Values'] as $SelectKey => $SelectValue) {
                      if($value == $SelectValue){
                        echo '<option value="'.$SelectValue.'" selected>'.$SelectKey.'</option>';
                      }else{
                        echo '<option value="'.$SelectValue.'">'.$SelectKey.'</option>';
                      }
                    }
                  echo '</select>';
                }elseif($Data['ServerINIDetails'][$key]['Type'] == 'number'){
                  echo '<input type="number" name="'.$key.'" step="'.$Data['ServerINIDetails'][$key]['Range']['step'].'" min="'.$Data['ServerINIDetails'][$key]['Range']['min'].'" max="'.$Data['ServerINIDetails'][$key]['Range']['max'].'" value="'.$value.'">';
                }else{
                  echo '<span class="ChangeElsewhere">'.$Data['ServerINIDetails'][$key]['Type'].'</span>';
                }
              }
              echo '&nbsp;&nbsp;&nbsp;'.$value;
             ?>

          </div>
        </div>
        <?php
      }
     ?>
   </form>
  </div>
  <div id="tab2">
    <h2>Manager Config</h2>
    </br></br>
    <form id="ManagerConfigForm">
    <?php if($Data['ChangeManagerConfigINI']){
      if($Data['OnlineStatus']){
        echo 'Cannot Edit config while server is online!';
      }else{
        echo '<input type="submit" name="submit" value="Submit" />';
      }
    }?>
    </br>
    </br>
    </br>
    <?php
      foreach ($Data['ManagerConfig'] as $key => $value) {
        $value = trim($value,"'");
        if($value != strip_tags($value)) {
            $value = htmlentities($value);
        }
        ?>
        <div class="ConfigContainer">
          <div class="ConfigOption">
            <span><?php echo $key; ?></span>
            <br/>
            <span class="Definition"><?php echo $Data['ManagerConfigDetails'][$key]['Definition']; ?></span>
          </div>
          <div class="ConfigInput">
            <?php
              if($Data['ChangeManagerConfigINI'] && !$Data['OnlineStatus']){
                if($Data['ManagerConfigDetails'][$key]['Type'] == 'text'){
                  echo '<input class="" type="text" name="'.$key.'" value="'.$value.'"></input>';
                }elseif($Data['ManagerConfigDetails'][$key]['Type'] == 'select'){
                  echo '<select name="'.$key.'">';
                    foreach ($Data['ManagerConfigDetails'][$key]['Values'] as $SelectKey => $SelectValue) {
                      if($value == $SelectValue){
                        echo '<option value="'.$SelectValue.'" selected>'.$SelectKey.'</option>';
                      }else{
                        echo '<option value="'.$SelectValue.'">'.$SelectKey.'</option>';
                      }
                    }
                  echo '</select>';
                }elseif($Data['ManagerConfigDetails'][$key]['Type'] == 'number'){
                  echo '<input type="number" name="'.$key.'" step="'.$Data['ServerINIDetails'][$key]['Range']['step'].'" min="'.$Data['ManagerConfigDetails'][$key]['Range']['min'].'" max="'.$Data['ManagerConfigDetails'][$key]['Range']['max'].'" value="'.$value.'">';
                }else{
                  echo '<span class="ChangeElsewhere">'.$Data['ManagerConfigDetails'][$key]['Type'].'</span>';
                }
              }
              echo '&nbsp;&nbsp;&nbsp;'.$value;
             ?>

          </div>
        </div>
        <?php
      }
     ?>
   </form>
  </div>
  <div id="tab3">
    <h2>PHP Config</h2>
    </br></br>
    <form id="PHPConfigForm">
      <?php if($Data['ChangePHPConfigINI']){
        ?>
        <input type="submit" name="submit" value="Submit" />
        <?php
      }?>
      </br>
      </br>
      </br>
      <?php
        foreach ($Data['PHPConfig'] as $key => $value) {
          $value = trim($value,"'");
          if($value != strip_tags($value)) {
              $value = htmlentities($value);
          }
          ?>
          <div class="ConfigContainer">
            <div class="ConfigOption">
              <span><?php echo $key; ?></span>
              <br/>
              <span class="Definition"><?php echo $Data['PHPConfigDetails'][$key]['Definition']; ?></span>
            </div>
            <div class="ConfigInput">
              <?php
                if($Data['ChangePHPConfigINI']){
                  if($Data['PHPConfigDetails'][$key]['Type'] == 'text'){
                    echo '<input class="" type="text" name="'.$key.'" value="'.$value.'"></input>';
                  }elseif($Data['PHPConfigDetails'][$key]['Type'] == 'select'){
                    echo '<select name="'.$key.'">';
                      foreach ($Data['PHPConfigDetails'][$key]['Values'] as $SelectKey => $SelectValue) {
                        if($value == $SelectValue){
                          echo '<option value="'.$SelectValue.'" selected>'.$SelectKey.'</option>';
                        }else{
                          echo '<option value="'.$SelectValue.'">'.$SelectKey.'</option>';
                        }
                      }
                    echo '</select>';
                  }elseif($Data['PHPConfigDetails'][$key]['Type'] == 'number'){
                    echo '<input type="number" name="'.$key.'" step="'.$Data['ServerINIDetails'][$key]['Range']['step'].'" min="'.$Data['PHPConfigDetails'][$key]['Range']['min'].'" max="'.$Data['PHPConfigDetails'][$key]['Range']['max'].'" value="'.$value.'">';
                  }else{
                    echo '<span class="ChangeElsewhere">'.$Data['PHPConfigDetails'][$key]['Type'].'</span>';
                  }
                }
                echo '&nbsp;&nbsp;&nbsp;'.$value;
               ?>
            </div>
          </div>
          <?php
        }
       ?>
    </form>
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

    <?php
        if($Data['ChangeServerINI']) {
            ?>
            console.log($('#ServerConfigForm').serializeArray());
            $("#ServerConfigForm").submit(function(event){
              event.preventDefault();
              $.ajax({
                'url': 'Config',
                'type': 'POST',
                'dataType': 'json',
                'data': {
                  'function':'UpdateServerConfig',
                  'FormData':$('#ServerConfigForm').serializeArray()
                },
                'success': function(data) {
                  console.log(data);
                  if(data['success']) {
                    console.log('Success');
                    AddNotification(data['message']);
                    Load("ServerConfig");
                  } else {
                    AddNotification(data['message']);
                  }
                }
              });
            });
            <?php
        }
     ?>

     <?php
         if($Data['ChangeManagerConfigINI']) {
             ?>
             console.log($('#ManagerConfigForm').serializeArray());
             $("#ManagerConfigForm").submit(function(event){
               event.preventDefault();
               $.ajax({
                 'url': 'Config',
                 'type': 'POST',
                 'dataType': 'json',
                 'data': {
                   'function':'UpdateManagerConfig',
                   'FormData':$('#ManagerConfigForm').serializeArray()
                 },
                 'success': function(data) {
                   console.log(data);
                   if(data['success']) {
                     console.log('Success');
                     AddNotification(data['message']);
                     Load("ServerConfig");
                   } else {
                     AddNotification(data['message']);
                   }
                 }
               });
             });
             <?php
         }
      ?>

      <?php
          if($Data['ChangePHPConfigINI']) {
              ?>
              console.log($('#PHPConfigForm').serializeArray());
              $("#PHPConfigForm").submit(function(event){
                event.preventDefault();
                $.ajax({
                  'url': 'Config',
                  'type': 'POST',
                  'dataType': 'json',
                  'data': {
                    'function':'UpdatePHPConfig',
                    'FormData':$('#PHPConfigForm').serializeArray()
                  },
                  'success': function(data) {
                    console.log(data);
                    if(data['success']) {
                      console.log('Success');
                      AddNotification(data['message']);
                      Load("ServerConfig");
                    } else {
                      AddNotification(data['message']);
                    }
                  }
                });
              });
              <?php
          }
       ?>
</script>
