<div id="Top"><span class="Title"><svg class="icon"><use xlink:href="#icon-spaceinvaders"></use></svg>SPACE INVADERS</span><span class="Time"></span></div>
<br/>
<link rel="stylesheet" type="text/css" href="/resources/spaceinvaders/spaceinvaders.css">
<style>
	/* Styling needed for a fullscreen canvas and no scrollbars. */
	body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
	}
	#starfield {
    width:100%;
    height:100%;
    z-index: -1;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  #gamecontainer {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  #gamecanvas {
    width: 800px;
    height: 600px;
  }
</style>
      <!-- this is where the Space Invaders HTML will go... */ -->
      <!-- Here's a starfield for the background. -->
<div id="starfield"></div>
<div id="gamecontainer">
    <canvas id="gameCanvas">Your Browser does not support HTML5. Please upgrade your Browser!</canvas>

</div>

<script src="/resources/spaceinvaders/myCam.js"></script>
<script src="/resources/spaceinvaders/highscore.js"></script>
<script src="/resources/spaceinvaders/particleSystem.js"></script>
<script src="/resources/spaceinvaders/starfield.js"></script>
<script src="/resources/spaceinvaders/spaceinvaders.js"></script>

<script>
<!--
	/* And this is where we'll put our JS. */
	//  Create the starfield.
  var container = document.getElementById('starfield');
  var starfield = new Starfield();
  starfield.initialise(container);
  starfield.start();

   //  Setup the canvas.
  var canvas = document.getElementById("gameCanvas");
  canvas.width = 800;
  canvas.height = 600;

  //  Create the game.
  var game = new Game();

  //  Initialise it with the game canvas.
  game.initialise(canvas);

  //  Start the game.
  game.start();

  //namen hinzuf�gen wenn er sich aus der session ergibt
   <?php
	echo "game.addName('".$Data['IPAddress']."')";
	?>

  //  Listen for keyboard events.
  window.addEventListener("keydown", function keydown(e) {
      var keycode = e.which || window.event.keycode;
      //  Supress further processing of left/right/space (37/29/32)
      if(keycode == 37 || keycode == 39 || keycode == 32) {
          e.preventDefault();
      }
      game.keyDown(keycode);
  });
  window.addEventListener("keyup", function keydown(e) {
      var keycode = e.which || window.event.keycode;
      game.keyUp(keycode);
  });
  //-->
</script>
<noscript> Activate Javascript if you want play that Game! </noscript>
<div id="buttonContainer">
  <a id="fancyButton" class="fancy"  onclick="game.toggleFancy()">FancyMode</a>
</div>
