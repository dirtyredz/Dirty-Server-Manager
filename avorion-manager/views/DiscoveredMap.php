<style type="text/css">
  #GalaxyMapImage2{
    background-image: url('/resources/img/EmptyGalaxy.jpg');
    background-position: 30px 30px;
    background-size: 740px 740px;
    background-repeat: no-repeat;
    position: absolute;
    width: 770px;
    height: 770px;
    display: none;
  }
  #GalaxyMapImage{
    background-image: url('/resources/img/Galaxy740.png');
    background-position: 30px 30px;
    background-size: 740px 740px;
    background-repeat: no-repeat;
    position: absolute;
    width: 770px;
    height: 770px;
  }
  #GalaxyMap{
    position: absolute;
  }
  .tooltip {
  	display:none;
  	position:absolute;
  	border:1px solid #333;
  	background-color:#161616;
  	border-radius:5px;
  	padding:10px;
  	color:#fff;
  	font-size:12px Arial;
  }
</style>
<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-map"></use></svg>DISCOVERED SECTORS MAP</span><span class="Time"></span></div>
<br/>
<h1>Discovered Sectors</h1>
<div id="GalaxyMapImage"></div>
<div id="GalaxyMapImage2"></div>
<div id="GalaxyMap" title="Discovered Sector" style="width: 800px; height: 800px;"><!-- Plotly chart will be drawn inside this DIV --></div>
<script type="text/javascript">
    console.clear()

    $('#GalaxyMap').hover(function(){
      // Hover over code
      var title = $(this).attr('title');
      $(this).data('tipText', title).removeAttr('title');
      $('<p class="tooltip"></p>').text(title).appendTo('body').fadeIn('slow');
    }, function() {
      // Hover out code
      $(this).attr('title', $(this).data('tipText'));
      $('.tooltip').remove();
    }).mousemove(function(e) {
      var mousex = e.pageX + 20; //Get X coordinates
      var mousey = e.pageY + 10; //Get Y coordinates
      $('.tooltip').css({ top: mousey, left: mousex })
    });

    var layout = {
      showlegend: false,
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      yaxis: {
        gridcolor: 'rgba(255,255,255,0.2)',
        range: [-500,500]
      },
      xaxis: {
        gridcolor: 'rgba(255,255,255,0.2)',
        range: [-500,500]
      },
      margin: {
          l: 30,
          r: 30,
          t: 30,
          b: 30
      },
      hovermode: 'closest',
      images: [{
          "source": "/resources/img/Galaxy740.png",
          "xref": "x",
          "yref": "y",
          "x": -500,
          "y": 500,
          "sizex": 1000,
          "sizey": 1000,
          "sizing": "stretch",
          "opacity": 1,
          "layer": "below"
      }]
    };
    var SectorData = <?php echo $Data['SectorData']; ?>;

    var GalaxyMap = document.getElementById('GalaxyMap');
    var Dragging = false;
    var ZoomFirst = false;
    var disableDragging = false;
    GalaxyMap.addEventListener('contextmenu', event => event.preventDefault());
    $.get( "GetData", {function:"GetDiscovered"},function(RecievedData) {
        Plotly.plot(GalaxyMap, RecievedData , layout,{displaylogo: false,scrollZoom: false,
          modeBarButtonsToRemove: ['toImage','sendDataToCloud','zoomOut2d','zoomIn2d','autoScale2d','pan2d','hoverClosestCartesian'],
          modeBarButtonsToAdd:[{name:'Download Image (Does not include background)',icon:Plotly.Icons.camera,click:function(gd){
            Plotly.downloadImage(gd,{format:'png',width:740,height:740,filename:'RustyOP_DiscoveredSectors'})
          }}]
        });

        GalaxyMap.on('plotly_hover', function(data){
          var infotext = data.points.map(function(d){
            var FactionName = '';
            var Crafts = '';
            var Wrecks = '';
            var Stations = '';
            var Asteroids = '';
            var Influence = '';
            var FactionIndex = '';
            SectorData.forEach(function(Sector) {
                if(Sector['SectorX'] == d.x){
                  if(Sector['SectorY'] == d.y){
                    if(("FactionName" in Sector)){
                      FactionName = '<br/>FactionName: '+Sector['FactionName'];
                    }
                    if(Sector['Crafts'] != '0')
                      Crafts = '<br/>Crafts: '+Sector['Crafts']+' ';
                    if(Sector['Wrecks'] != '0')
                      Wrecks = '<br/>Wrecks: '+Sector['Wrecks']+' ';
                    if(Sector['Stations'] != '0')
                      Stations = '<br/>Stations: '+Sector['Stations']+' ';
                    if(Sector['Asteroids'] != '0')
                      Asteroids = '<br/>Asteroids: '+Sector['Asteroids']+' ';
                    if(Sector['Influence'] != '0')
                      Influence = '<br/>Influence: '+Sector['Influence']+' ';
                    if(Sector['FactionIndex'] != '0')
                      FactionIndex = '<br/>FactionIndex: '+Sector['FactionIndex']+' ';
                  }
                }
            });
            return ('('+d.x+' , '+d.y+') '+Crafts+Wrecks+Stations+Asteroids+Influence+FactionIndex+FactionName);
          });
            $('.tooltip').html(infotext);
        })
         .on('plotly_unhover', function(data){
            $('.tooltip').html('Hover over dots to view more info.');
        });

        var XOffsetDown = 0;
        var YOffsetDown = 0;
        $('#GalaxyMap').on('mousedown',function(event){
          Dragging = false;
          var offset = $(this).offset();
          XOffsetDown = (event.pageX - offset.left - 30);
          YOffsetDown = (event.pageY - offset.top - 30);
        });
        $('.modebar').on('mouseenter',function(event){
          Dragging = false;
          disableDragging = true;
        });
        $('.modebar').on('mouseleave',function(event){
          Dragging = false;
          disableDragging = false;
        });
        $('#GalaxyMap').on('mousemove',function(event){
          if(!disableDragging){
            Dragging = true;
          }
        });
        var XOffsetUp = 0;
        var YOffsetUp = 0;
        $('#GalaxyMap').on('mouseup',function(event){
          var wasDragging = Dragging;
          Dragging = false;
          mousedown = false;
          if(wasDragging){
            var offset = $(this).offset();
            XOffsetUp = 740 - (event.pageX - offset.left - 30);
            YOffsetUp = 740 - (event.pageY - offset.top - 30);
            var TempImg = $('#GalaxyMapImage').css('background-size').split(" ");
            var Image = {};
            Image['Width'] = parseInt(TempImg[0]);
            Image['Height'] = parseInt(TempImg[1]);
            TempImg = $('#GalaxyMapImage').css('background-position').split(" ");
            Image['Left'] = parseInt(TempImg[0]);
            Image['Top'] = parseInt(TempImg[1]);

            var Width = Image['Width'] + ((XOffsetUp + XOffsetDown) * 3.5)
            var Height = Image['Height'] + ((YOffsetUp + YOffsetDown) * 3.5)
            var Left = Image['Left'] - Math.abs(XOffsetDown *3.5)
            var Top = Image['Top'] - Math.abs(YOffsetDown*3.5)

            if(!ZoomFirst){
              ZoomFirst = true;
              var update = {'marker.size': '5'};
              Plotly.restyle(GalaxyMap, update, 0);
              console.log('ZoomFirst');
              $('#GalaxyMapImage').css({'background-size':Width+'px '+Height+'px'})
              $('#GalaxyMapImage').css({'background-position':Left+'px '+Top+'px'})
            }else{
              var update = {'marker.size': '10'};
              Plotly.restyle(GalaxyMap, update, 0);
              console.log('To many zoomms');
              $('#GalaxyMapImage').css({'background-size':'740px 740px','background-position':'30px 30px'})
              $('#GalaxyMapImage').hide();
              $('#GalaxyMapImage2').show();
            }
          }
          return;
        });
        GalaxyMap.on('plotly_relayout',function(eventdata){
            if(eventdata['xaxis.range[0]']){
              ZoomFirst = false;
              console.log('Reset');
              var update = {'marker.size': '3'};
              Plotly.restyle(GalaxyMap, update, 0);
              console.log('To many zoomms');
              $('#GalaxyMapImage').css({'background-size':'740px 740px','background-position':'30px 30px'})
              $('#GalaxyMapImage').show();
              $('#GalaxyMapImage2').hide();
              return;
            }
        });
    },"json");
</script>
