<style>
  .GraphTitle{
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }
  .GraphTitle span{
    font-size: 18px;
    font-weight: normal;
  }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-untitled2"></use></svg>GRAPHS</span><span class="Time"></span></div>
</br>
<div class="OptionsWrapper">
  <span>Hours/Date Range: </span><span id="HoursRange">6 Hours</span>
</br>
<input type="range" name="range" min="1" max="13" value="2">
</div>
<br/>
<?php
    if($Data['ServerLoadGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          Average Server Load
          </br>
          <span>(Game servers load %)</span>
        </div>
        <div id="ServerLoad" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Server Load Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['OnlinePlayersGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          Players Online
          </br>
        </div>
        <div id="PlayersOnline" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Players Online Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['InMemoryGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          In Memory
          </br>
          <span>(Players / Factions / Sector that are currently held in memory)</span>
        </div>
        <div id="InMemory" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      In Memory Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['UpdatesGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          Update Speed
          </br>
          <span>(Avg / Min / Max Update speed)</span>
        </div>
        <div id="Updates" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Updates Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['ScriptMemoryGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          Script Memory
          </br>
          <span>(Lua scripts memory usage size)</span>
        </div>
        <div id="ScriptMemory" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Scripts Memory Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['CpuUsageGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          CPU Usage
          </br>
          <span>(Physical server's CPU Usage)</span>
        </div>
        <div id="CPU" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Cpu Usage Graph available when logged in.
      <br/>
      <?php
    }
    if($Data['MemoryUsageGraph']) {
        ?>
        </br>
        <div class="GraphTitle">
          Memory Usage
          </br>
          <span>(Physical server's memory usage)</span>
        </div>
        <div id="MemoryUsage" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <?php
    }else{
      ?>
      Memory Usage Graph available when logged in.
      <br/>
      <?php
    }
 ?>



<script type="text/javascript">
  $('.OptionsWrapper > input[name="range"]').on('input', function () {
    var Range = '1 Hour';
    switch ($('.OptionsWrapper > input[name="range"]').val()) {
        case '1':
            Range = '1 Hour';// 1 hour
            break;
        case '2':
            Range = '6 Hours';// 6 hours
            break;
        case '3':
            Range = '12 Hours';// 12 hours
            break;
        case '4':
            Range = '24 Hours';// 24 hours
            break;
        case '5':
            Range = '2 Days';// 2 days
            break;
        case '6':
            Range = '3 Days';// 3 days
            break;
        case '7':
            Range = '4 Days';// 4 days
            break;
        case '8':
            Range = '5 Days';// 5 days
            break;
        case '9':
            Range = '6 Days';// 6 days
            break;
        case '10':
            Range = '7 Days';// 7 days
            break;
        case '11':
            Range = '8 Days';// 8 days
            break;
        case '12':
            Range = '9 Days';// 9 days
            break;
        case '13':
            Range = '10 Days';// 10 days
            break;
    }
      $("#HoursRange").html(Range);
  });
  $('.OptionsWrapper > input[name="range"]').on('change', function () {
      <?php
        if($Data['ServerLoadGraph']) { ?>LoadServerLoadGraph();<?php }
      ?>
      <?php
        if($Data['OnlinePlayersGraph']) { ?>LoadPlayersGraph();<?php }
      ?>
      <?php
        if($Data['InMemoryGraph']) { ?>LoadInMemoryGraph();<?php }
      ?>
      <?php
        if($Data['UpdatesGraph']) { ?>LoadUpdatesGraph();<?php }
      ?>
      <?php
        if($Data['CpuUsageGraph']) { ?>LoadCpuLoadGraph();<?php }
      ?>
      <?php
        if($Data['ScriptMemoryGraph']) { ?>LoadScriptMemoryGraph();<?php }
      ?>
      <?php
        if($Data['MemoryUsageGraph']) { ?>LoadMemoryUsageGraph();<?php }
      ?>
  });


  <?php
    if($Data['ServerLoadGraph']) { ?>LoadServerLoadGraph();<?php }
  ?>
  <?php
    if($Data['OnlinePlayersGraph']) { ?>LoadPlayersGraph();<?php }
  ?>
  <?php
    if($Data['InMemoryGraph']) { ?>LoadInMemoryGraph();<?php }
  ?>
  <?php
    if($Data['UpdatesGraph']) { ?>LoadUpdatesGraph();<?php }
  ?>
  <?php
    if($Data['CpuUsageGraph']) { ?>LoadCpuLoadGraph();<?php }
  ?>
  <?php
    if($Data['MemoryUsageGraph']) { ?>LoadMemoryUsageGraph();<?php }
  ?>
  <?php
    if($Data['ScriptMemoryGraph']) { ?>LoadScriptMemoryGraph();<?php }
  ?>


  window.PageRefresh = setInterval(function(){
    if((new Date().getMinutes() % 5) == 0){
      <?php
        if($Data['ServerLoadGraph']) { ?>LoadServerLoadGraph();<?php }
      ?>
      <?php
        if($Data['OnlinePlayersGraph']) { ?>LoadPlayersGraph();<?php }
      ?>
      <?php
        if($Data['InMemoryGraph']) { ?>LoadInMemoryGraph();<?php }
      ?>
      <?php
        if($Data['UpdatesGraph']) { ?>LoadUpdatesGraph();<?php }
      ?>
      <?php
        if($Data['CpuUsageGraph']) { ?>LoadCpuLoadGraph();<?php }
      ?>
      <?php
        if($Data['MemoryUsageGraph']) { ?>LoadMemoryUsageGraph();<?php }
      ?>
      <?php
        if($Data['ScriptMemoryGraph']) { ?>LoadScriptMemoryGraph();<?php }
      ?>
    }
  },60000)


  function LoadCpuLoadGraph(){
    var layout = {
        title: 'Server CPU Usage',
        titlefont: {
          family: 'Courier New, monospace',
          size: 20,
          color: '#c6bdbd'
        },
        showlegend: false,
        paper_bgcolor:'rgba(0,255,0,0)',
        plot_bgcolor:'rgba(255,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,255,0)',
          range: [0,100]
        },
        xaxis: {
          gridcolor: 'rgba(50,50,50,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetCpuUsage",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('CPU', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadScriptMemoryGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetServerScriptMemoryGraph",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('ScriptMemory', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadUpdatesGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetServerUpdates",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('Updates', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadInMemoryGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetInMemory",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('InMemory', RecievedData,layout,{displaylogo: false});
    },"json");
  }


  function LoadServerLoadGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)',
          range: [0,100]
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetServerLoad",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('ServerLoad', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadPlayersGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)',
          range: [0,<?php echo $Data['MaxPlayers']; ?>]
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetPlayersOnline",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('PlayersOnline', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadMemoryUsageGraph(){
    var layout = {
        showlegend: false,
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        yaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        xaxis: {
          gridcolor: 'rgba(0,0,0,0)'
        },
        margin: {
            l: 30,
            r: 30,
            t: 30,
            b: 30
        },
    };
    $.get( "GetData", {function:"GetServerMemoryUsageGraph",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('MemoryUsage', RecievedData,layout,{displaylogo: false});
    },"json");
  }
</script>
