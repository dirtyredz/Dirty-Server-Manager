<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-untitled2"></use></svg>GRAPHS</span><span class="Time"></span></div>
<div class="OptionsWrapper">
<input type="range" name="range" min="1" max="13" value="2"><span>Hours/Date Range: </span><span id="HoursRange">6 Hours</span>
</div>
<br/>
<div id="ServerLoad" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
<br/>
<div id="PlayersOnline" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
<br/>
<?php
    if($Data['AccessGranted']) {
        ?>
        <div id="InMemory" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <div id="Updates" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <br/>
        <div id="CPU" style="width: 100%; height: 250px;"><!-- Plotly chart will be drawn inside this DIV --></div>
        <?php
    }else{
      ?>
      More Graphs are available when logged in.
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
      LoadServerLoadGraph();
      LoadPlayersGraph();
      <?php
          if($Data['AccessGranted']) {
              ?>
              LoadInMemoryGraph();
              LoadUpdatesGraph();
              LoadCpuLoadGraph();
              <?php
          }
       ?>
  });

  LoadServerLoadGraph();
  LoadPlayersGraph();
  <?php
      if($Data['AccessGranted']) {
          ?>
          LoadInMemoryGraph();
          LoadUpdatesGraph();
          LoadCpuLoadGraph();
          <?php
      }
   ?>

  window.PageRefresh = setInterval(function(){
    if((new Date().getMinutes() % 5) == 0){
      LoadServerLoadGraph();
      LoadPlayersGraph();
      <?php
          if($Data['AccessGranted']) {
              ?>
              LoadInMemoryGraph();
              LoadUpdatesGraph();
              LoadCpuLoadGraph();
              <?php
          }
       ?>
    }
  },60000)
  <?php
    if($Data['AccessGranted']) {
  ?>
    function LoadCpuLoadGraph(){
      var layout = {
          title: 'Server CPU Usage',
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
      $.get( "RefreshController.php", {function:"GetCpuUsage",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
        Plotly.newPlot('CPU', RecievedData,layout,{displaylogo: false});
      },"json");
    }
    function LoadUpdatesGraph(){
      var layout = {
          title: 'Avg/Min/Max Updates',
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
      $.get( "RefreshController.php", {function:"GetServerUpdates",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
        Plotly.newPlot('Updates', RecievedData,layout,{displaylogo: false});
      },"json");
    }
    function LoadInMemoryGraph(){
    var layout = {
        title: 'Players/Factions/Sectors In Memory',
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
    $.get( "RefreshController.php", {function:"GetInMemory",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('InMemory', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  <?php
  }
  ?>

  function LoadServerLoadGraph(){
    var layout = {
        title: 'Average Server Load %',
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
    $.get( "RefreshController.php", {function:"GetServerLoad",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('ServerLoad', RecievedData,layout,{displaylogo: false});
    },"json");
  }
  function LoadPlayersGraph(){
    var layout = {
        title: 'Online Players',
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
    $.get( "RefreshController.php", {function:"GetPlayersOnline",Range:$('.OptionsWrapper > input[name="range"]').val()},function(RecievedData) {
      Plotly.newPlot('PlayersOnline', RecievedData,layout,{displaylogo: false});
    },"json");
  }
</script>
