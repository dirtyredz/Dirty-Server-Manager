<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-untitled2"></use></svg>GRAPHS</span><span class="Time"></span></div>
<div class="OptionsWrapper">
<input type="range" name="range" min="1" max="24" value="6"><span>Hours Range: </span><span id="HoursRange"></span><span> Hours.</span>
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
  $("#HoursRange").html($('.OptionsWrapper > input[name="range"]').val());
  $('.OptionsWrapper > input[name="range"]').on('input', function () {
      $("#HoursRange").html($('.OptionsWrapper > input[name="range"]').val());
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
