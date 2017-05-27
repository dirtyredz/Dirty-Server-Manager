<link rel="stylesheet" type="text/css" href="/resources/css/flags.min.css">
<style type="text/css">

    #BannerAddress{
      background-color: #e0e0e0;
      color: #1f1f1f;
      width: 400px;
      text-align: center;
      padding: 5px 0;
    }
    #HomeInfo{
      display: flex;
      align-items: center;
    }
    #ServerInfo{
      padding-right: 100px;
      min-width: 200px;
    }
    #DiskUsagePie{
      transform: rotateY(180deg);
    }
    div#ChatLog{
      border: 4px solid #3d3c3c;
      overflow-x: hidden;
      overflow-y: scroll;
      height: 400px;
      width: 400px;
      padding-left: 5px;
      order: 1;
      background-color: #0e0e0e;
      min-width: 400px;
      flex: 3;
      order: -1;
    }
    div#ChatLog span{
      width: 100%;
      display: block;
    }
    div#ChatLog span:nth-child(even) {background: #1f1f1f}
    div#ChatLog::-webkit-scrollbar {
        width: 1em;
    }
    div#ChatLog::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    div#ChatLog::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
    div#OnlinePlayers{
      width: 200px;
      min-width: 200px;
      flex: 1;
      padding-left: 80px;
    }
    span.OnlinePlayer{
      display: flex;
      align-items: center;
    }
    div#PlayerData{
      display: flex;
    }
    a{
      color: gray;
    }
    a:visited{
      color: gray;
    }
</style>
<script src="https://cdn.jsdelivr.net/clipboard.js/1.6.0/clipboard.min.js"></script>
<script type="text/javascript">
  new Clipboard('#BannerAddress');
</script>
<div id="Top"><span class="Title"><svg class="icon icon-untitled5"><use xlink:href="#icon-untitled5"></use></svg>HOME</span><span class="Time"></span></div>
<br/>
<?php foreach ($Data['ERROR'] as $key => $value) { ?>
  <div style="font-size: 30px;color: red;"><?php echo $value; ?></div>
<?php }?>
<div id="HomeInfo">
  <div id="ServerInfo">
    <h1><?php echo $Data['GalaxyName']; ?>:    <span id="ServerStatus"><?php echo $Data['OnlineStatus'] ?></span></h1>
    <h2 id="IPAddress"><?php echo $Data['IPAddress']; ?></h2>
    <?php if($Data['ShowOnlinePlayerCount']){ ?>
      <h3 id="PlayersOnline">Players Online: <?php echo $Data['OnlinePlayerCount'].'/'.$Data['MaxPlayers']?></h3>
    <?php }?>
    <h3>Server restarts daily at <span style="color: red;">2356</span> and <span style="color: red;">1156</span> Server Time.</h3>
  </div>
  <?php if($Data['ShowDiskUsage']){ ?>
    <div id="DiskUsagePie"></div>
  <?php }?>
</div>
<div>
  <?php echo $Data['CustomMessageOne']; ?>
</div>
<div>
  <?php echo $Data['CustomMessageTwo']; ?>
</div>
<div>
  <?php echo $Data['CustomMessageThree']; ?>
</div>
<div>
  <?php echo $Data['CustomMessageFour']; ?>
</div>
<br/>
<div id="PlayerData">
  <?php if($Data['ShowChatLog']){ ?>
    <div id="ChatLog"></div>
  <?php }?>
  <?php if($Data['ShowOnlinePlayers']){ ?>
    <div id="OnlinePlayers">
      <h2>Online Players</h2>
      <?php
      if(isset($Data['OnlinePlayers'])){
        foreach ($Data['OnlinePlayers'] as $key => $value) {
          echo '<span class="OnlinePlayer"><span>'.$key.'</span>&nbsp;&nbsp;&nbsp;&nbsp;<img src="/resources/img/blank.gif" class="flag flag-'.$value['CountryCode'].'" alt="'.$value['CountryName'].'" /></span>';
        }
      }
      ?>
    </div>
  <?php }?>
</div>
<br/>
<br/>
<?php
  if (is_file(__DIR__."/../webroot/banner/StatusBannerLrg.jpg")){
      $FileDetails = stat(__DIR__."/../webroot/banner/StatusBannerLrg.jpg");
      echo '<img src="/banner/StatusBannerLrg.jpg?MT=' . dechex($FileDetails['mtime']) . '" alt="Image created by a PHP script."/>';
   }
 ?>
<br/>
<br/>
<button id="BannerAddress" data-clipboard-text="http://<?php echo $Data['IPAddress']; ?>:8080/banner/StatusBannerLrg.jpg">Copy Status Banner URL</button>
<br/>
<button id="BannerAddress" data-clipboard-text="[img]http://<?php echo $Data['IPAddress']; ?>:8080/banner/StatusBannerLrg.jpg[/img]">Copy Status Banner Avorion Forums</button>
<br/>
<br/>
<?php
  if (is_file(__DIR__."/../webroot/banner/StatusBannerSml.jpg")){
      $FileDetails = stat(__DIR__."/../webroot/banner/StatusBannerSml.jpg");
      echo '<img src="/banner/StatusBannerSml.jpg?MT=' . dechex($FileDetails['mtime']) . '" alt="Image created by a PHP script."/>';
   }else{
     echo 'fail';
   }
 ?>
<br/>
<br/>
<button id="BannerAddress" data-clipboard-text="http://<?php echo $Data['IPAddress']; ?>:8080/banner/StatusBannerSml.jpg">Copy Status Banner URL</button>
<br/>
<button id="BannerAddress" data-clipboard-text="[img]http://<?php echo $Data['IPAddress']; ?>:8080/banner/StatusBannerSml.jpg[/img]">Copy Status Banner Avorion Forums</button>




<script type="text/javascript">
    $.get( "GetData", {function:"GetChatLog"},function(data) {
      $("#ChatLog").html(data);
    });
    window.PageRefresh = setInterval(function () {
      $.get( "GetData", {function:"GetChatLog"},function(data) {
        $("#ChatLog").html(data);
      });
    }, 60000);
    //Show DiskUsage
    <?php if($Data['ShowDiskUsage']){ ?>
      var data = [{
      values: [100,0],
      type: 'pie',
      direction: 'counterclockwise',
      roation: 1,
      hole: 0.95,
      textposition: 'none',
      marker: {
        colors: ['rgba(255, 255, 255,0.1)', 'rgba(255, 255, 255, 1)']
      }
      }];

      var layout = {
      height: 250,
      width: 250,
      showlegend: false,
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      margin: {
          l: 30,
          r: 30,
          t: 30,
          b: 30
      },
      annotations: [
        {
          font: {
            size: 20,
            color: '#e0e0e0'
          },
          showarrow: false,
          text: 'Disk Usage: '+<?php echo $Data['DiskUsage']; ?>+'%',
          x: 0.5,
          y: 0.5
        }
      ],
      hovermode: !1,
      };
      Plotly.plot('DiskUsagePie', data, layout,{displayModeBar: false});
      setTimeout(function(){
        $('#DiskUsagePie .infolayer').css({'transform-origin':'top','transform':'rotateY(-180deg)'});
        Plotly.animate('DiskUsagePie', {
          data: [{values: [<?php echo (100 - $Data['DiskUsage']); ?>,<?php echo $Data['DiskUsage']; ?>]}]
        }, {
          transition: {
            duration: 1000,
            easing: 'linear'
          }
        });
      },100)
    <?php } ?>
</script>
