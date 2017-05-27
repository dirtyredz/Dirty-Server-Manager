//Sprites loader

var allLoaded=false;
var spriteCount=1;
var counter=0;

function loadCounter()
{
	counter++
	if(counter==spriteCount)
	{
		allLoaded=true;
	}

}

 //Einzelne sprites
var shipSprite = new Image();
shipSprite.onload = function()
{
   loadCounter();
};
shipSprite.src="/resources/spaceinvaders/img/ship.png";






// Creates an instance of the Game class.
function Game()
{

 //  Set the initial config.
    this.config = {
        bombRate: 0.05,
        bombMinVelocity: 50,
        bombMaxVelocity: 70,
        invaderInitialVelocity: 25,
        invaderAcceleration: 2,
        invaderDropDistance: 20,
        rocketVelocity: 170,
        rocketMaxFireRate: 2,/*2*/
        gameWidth: 400,
        gameHeight: 300,
        fps: 60,
        debugMode: false,
        invaderRanks: 5,
        invaderFiles: 10,
        shipSpeed: 220,
        levelDifficultyMultiplier: 0.4,
        pointsPerInvader: 5,
		powerUpRate : 30 /*30*/
    };

// All state is in the variables below.
this.lives = 3;
this.width = 0;
this.height = 0;
this.score=0;


this.level = 0;

this.gameBound = {left: 0, top: 0, right: 0, bottom: 0};

//  The state stack.
this.stateStack = [];

//  Input/output
this.pressedKeys = {};
this.gameCanvas =  null;






this.p = new particleSystem();
this.p.fancy=false;

this.name="unbekannt";

};
Game.prototype.toggleFancy  = function()
{
    this.p.fancy=!this.p.fancy;

    if(this.p.fancy)
    {
        document.getElementById("fancyButton").innerHTML="Fancy";
    }
    else
    {
        document.getElementById("fancyButton").innerHTML="Boring";
    }


}
Game.prototype.addName  = function(name)
{
    this.name=name;
}



//  Initialis the Game with a canvas.
Game.prototype.initialise = function(gameCanvas)
{

    //  Set the game canvas.
    this.gameCanvas = gameCanvas;

    //  Set the game width and height.
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;

    //  Set the state game bounds.
    this.gameBounds = {
        left: gameCanvas.width / 2 - this.config.gameWidth / 2,
        right: gameCanvas.width / 2 + this.config.gameWidth / 2,
        top: gameCanvas.height / 2 - this.config.gameHeight / 2,
        bottom: gameCanvas.height / 2 + this.config.gameHeight / 2,
    };
};

//  Returns the current state.
Game.prototype.currentState = function()
{
    return this.stateStack.length > 0 ? this.stateStack[this.stateStack.length - 1] : null;
};
//If we have anything in the stack (which is actually an array, but arrays are flexible enough in JavaScript to use as stacks at a pinch), we return the top item (i.e. the last item in the array). Otherwise we return null.


Game.prototype.moveToState = function(state)
{

    //  Are we already in a state?
    if(this.currentState()) {

        //  Before we pop the current state, see if the
        //  state has a leave function. If it does we can call it.
        if(this.currentState().leave) {
           this.currentState().leave(game);
        }

        this.stateStack.pop();
    }

    //  If there's an enter function for the new state, call it.
    if(state.enter) {
        state.enter(game);
    }

    //  Set the current state.
    this.stateStack.push(state);
};

Game.prototype.pushState = function(state)
{

    //  If there's an enter function for the new state, call it.
    if(state.enter) {
        state.enter(game);
    }
    //  Set the current state.
    this.stateStack.push(state);
};

Game.prototype.popState = function()
{

    //  Leave and pop the state.
    if(this.currentState()) {
        if(this.currentState().leave) {
            this.currentState().leave(game);
        }

        //  Set the current state.
        this.stateStack.pop();
    }
};

// The main loop.  //Achtung global
function GameLoop(game)
{
    var currentState = game.currentState();
    if(currentState)
    {

        //  Delta t is the time to update/draw.
        var dt = 1 / game.config.fps;

        //  Get the drawing context.
        var ctx = this.gameCanvas.getContext("2d");

        //  Update if we have an update function. Also draw
        //  if we have a draw function.
        if(currentState.update)
        {
            currentState.update(game, dt);
        }
        if(currentState.draw)
        {
            currentState.draw(game, dt, ctx);
        }
    }
}


//  Start the Game.
Game.prototype.stop = function() {
    clearInterval(this.intervalId);
};
Game.prototype.start = function() {

    //  Move into the 'welcome' state.
    this.moveToState(new WelcomeState());

    //  Set the game variables.
    this.lives = 3;
    this.config.debugMode = /debug=true/.test(window.location.href);

    //  Start the game loop.
    var game = this;
    this.intervalId = setInterval(function () { GameLoop(game);}, 1000 / this.config.fps);

};
//  Inform the game a key is down.
Game.prototype.keyDown = function(keyCode) {
    this.pressedKeys[keyCode] = true;
    //  Delegate to the current state too.
    if(this.currentState() && this.currentState().keyDown) {
        this.currentState().keyDown(this, keyCode);
    }
};

//  Inform the game a key is up.
Game.prototype.keyUp = function(keyCode) {
    delete this.pressedKeys[keyCode];
    //  Delegate to the current state too.
    if(this.currentState() && this.currentState().keyUp) {
        this.currentState().keyUp(this, keyCode);
    }
};


//-----------WlcomeState------------//
function WelcomeState()
{
          //Sprites
		this.spritesLoaded=false;
}

WelcomeState.prototype.draw = function(game, dt, ctx)
{

    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="30px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="center";
    ctx.textAlign="center";
    ctx.fillText("Space Invaders", game.width / 2, game.height/2 - 40);

    game.p.draw(ctx);

	if(!this.spritesLoaded)
	{
	ctx.font="30px Arial";
	ctx.fillText("Loading "+ counter+ "/"+ spriteCount, game.width / 2, game.height/2);
	}
	else
	{
	ctx.font="16px Arial";
    ctx.fillText("Press 'Space' to start.", game.width / 2, game.height/2);
	}




};

WelcomeState.prototype.update = function(game, dt)
{
     //game.p.createParticleExplosion(Math.floor((Math.random()*g.gameWidth)+1) ,Math.floor((Math.random()*g.gameHeight)+1); ,5);

	  if(allLoaded)
	  {
		this.spritesLoaded=true;
	  }


     game.p.update();
}


WelcomeState.prototype.keyDown = function(game, keyCode)
{
	if(this.spritesLoaded)
	{
		if(keyCode == 32 || keyCode == 38) /*space/ hoch*/
		{
			//  Space starts the game.
			game.moveToState(new LevelIntroState(game.level));
		}
	}

};

//----------GameoverState-----------// Zeigt Score uploadet den und l�sst den spieler ein neues soiel sztarten
function GameoverState()
{
    this.uploaded=false;
    this.geted=false;
    this.highscoreText="Nix drin";
    this.makeEx=0;
    this.exRate=60;
};

GameoverState.prototype.draw = function(game, dt, ctx)
{
   //  Clear the background.
   ctx.fillStyle="rgba(0, 0,0, 0.3)";;
    ctx.clearRect(0, 0, game.width, game.height);


    ctx.font="36px Arial";
    ctx.fillStyle = '#ffff00';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText(game.name +" Score:"+ game.score, game.width / 2 , 30);

    ctx.font="26px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Name:", (game.width / 4 * 1), (game.height/5*1));
    ctx.fillText("Score:", (game.width / 4 * 2)+150, (game.height/5*1));


    ctx.font="20px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    //ctx.fillText(this.highscoreText, game.width / 3 * 1, game.height/3*2);

    var strings = this.highscoreText.split("~");

    for(var i=0; i < strings.length-1; i=i+2)
    {
        if(strings[i].length > 15)
        {
           strings[i]=strings[i].substr(0,15);
        }


        //ctx.fillText((i/2)+1, (game.width / 4 * 1)-70, (game.height/5*2)+(i*20)-50);  //Rang
        ctx.fillText(strings[i], (game.width / 4 * 1), (game.height/5*2)+(i*20)-50);  //Name
        ctx.fillText(strings[i+1], (game.width / 4 * 2)+150, (game.height/5*2)+(i*20)-50); //Score
    }






    ctx.font="16px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Press 'R' for another Game", game.width /2  ,( game.height/5*4)-16);

    game.p.draw(ctx);

};

GameoverState.prototype.update = function(game, dt)
{
     if(!this.uploaded)
     {   if(game.name=="unbekannt")
        {
            game.name=prompt("Please enter your name","Noob");
        }
        if(game.name!= null)
        {
           uploadScore(game.name,game.score);
            this.uploaded=true;
        }

     }

     if(!this.geted)
     {
         this.highscoreText=getScore();
         this.geted=true;
     }

     game.p.update();

     if(game.p.fancy)
     {
        this.exRate=30;
     }
     else
     {
       this.exRate=10;
     }


     if(this.makeEx > this.exRate)
     {
         this.makeEx=0;
         game.p.createParticleExplosion(Math.floor((Math.random()*game.width)+1) ,Math.floor((Math.random()*game.height)+1) ,10);
     }
    this.makeEx++;

}
GameoverState.prototype.keyDown = function(game, keyCode)
{
    if(keyCode == 82) /*r*/
    {
        //  r starts the game.
        game.lives=3;
        game.score=0;
        game.level=0;


        game.moveToState(new LevelIntroState(game.level));
    }
};


//-------------Intro state-------------//
/*
    Level Intro State

    The Level Intro state shows a 'Level X' message and
    a countdown for the level.
*/
function LevelIntroState(level)
{
    this.level = level+1;
    this.countdownMessage = "3";
}


LevelIntroState.prototype.draw = function(game, dt, ctx)
{

    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);

    ctx.font="36px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Level " + this.level, game.width / 2, game.height/2);
    ctx.font="24px Arial";
    ctx.fillText("Alien Invasion in " + this.countdownMessage, game.width / 2, game.height/2 + 36);
};

LevelIntroState.prototype.update = function(game, dt)
{

    //  Update the countdown.
    if(this.countdown === undefined) {
        this.countdown = 3; // countdown from 3 secs
    }
    this.countdown -= dt;

    if(this.countdown < 2) {
        this.countdownMessage = "2";
    }
    if(this.countdown < 1) {
        this.countdownMessage = "1";
    }
    if(this.countdown <= 0) {
        //  Move to the next level, popping this state.
        game.moveToState(new PlayState(game.config, this.level));
    }
    game.p.update();
};

//-----------------------Play State-------------------//
//  Create a PlayState with the game config and the level you are on.
function PlayState(config, level) {
    this.config = config;
    this.level = level;

    //  Game
    this.invaderCurrentVelocity =  10;
    this.invaderCurrentDropDistance =  0;
    this.invadersAreDropping =  false;
    this.lastRocketTime = null;

    //  Game entities.
    this.ship = null;
    this.invaders = [];
    this.rockets = [];
    this.bombs = [];
    this.powerUps = [];

    this.cam=new myCam(0,0,1000,1000);
    this.cam.x=0;
    this.cam.y=1000;

	this.mother=[];


};

PlayState.prototype.enter = function(game) {

    //  Create the ship.
    this.ship = new Ship(game.width / 2, game.gameBounds.bottom);

     //  Set the ship speed for this level, as well as invader params.
    var levelMultiplier = this.level * this.config.levelDifficultyMultiplier;
    this.shipSpeed = this.config.shipSpeed;
    this.invaderInitialVelocity = this.config.invaderInitialVelocity + (levelMultiplier * this.config.invaderInitialVelocity);
    this.bombRate = this.config.bombRate + (levelMultiplier * this.config.bombRate);
    this.bombMinVelocity = this.config.bombMinVelocity + (levelMultiplier * this.config.bombMinVelocity);
    this.bombMaxVelocity = this.config.bombMaxVelocity + (levelMultiplier * this.config.bombMaxVelocity);

	this.mother.push(new mothership(game.width/2,(this.config.gameHeight/2)-50));


//  Create the invaders.
    var ranks = this.config.invaderRanks;
    var files = this.config.invaderFiles;
    var invaders = [];
    for(var rank = 0; rank < ranks; rank++){
        for(var file = 0; file < files; file++) {
            invaders.push(new Invader(
                (game.width / 2) + ((files/2 - file) * 200 / files),
                (game.gameBounds.top + rank * 20),
                rank, file, 'Invader'));
        }
    }
    this.invaders = invaders;
    this.invaderCurrentVelocity = this.invaderInitialVelocity;
    this.invaderVelocity = {x: -this.invaderInitialVelocity, y:0};
    this.invaderNextVelocity = null;
};

PlayState.prototype.update = function(game, dt) {

    //  If the left or right arrow keys are pressed, move
    //  the ship. Check this on ticks rather than via a keydown
    //  event for smooth movement, otherwise the ship would move
    //  more like a text editor caret.
    if(game.pressedKeys[37]) {
        this.ship.x -= this.shipSpeed * dt;
    }
    if(game.pressedKeys[39]) {
        this.ship.x += this.shipSpeed * dt;
    }
    if(game.pressedKeys[32] || game.pressedKeys[38]) {
        this.fireRocket();
    }

    //  Keep the ship in bounds.
    if(this.ship.x < game.gameBounds.left) {
        this.ship.x = game.gameBounds.left;
    }
    if(this.ship.x > game.gameBounds.right) {
        this.ship.x = game.gameBounds.right;
    }


    //  Move each bomb.
    for(var i=0; i<this.bombs.length; i++) {
        var bomb = this.bombs[i];
        bomb.y += dt * bomb.velocity;

        //  If the bomb has gone off the screen remove it.
        if(bomb.y > this.height) {
            this.bombs.splice(i--, 1);
        }
    }

    //  Move each rocket.
    for(i=0; i<this.rockets.length; i++) {
        var rocket = this.rockets[i];
        rocket.y -= dt * rocket.velocity;
        }

        //  Move each powerup.
    for(i=0; i<this.powerUps.length; i++) {
        var power = this.powerUps[i];
        power.y -= dt * power.yvel;
        power.x -= dt * power.xvel;

//          If the powerup has gone off the screen remove it.
        if(power.y > this.height) {
            this.powerUps.splice(i--, 1);
        }
    }

	//move mother
	for(i=0; i<this.mother.length; i++)
	{
		if((this.mother[i].x+this.mother[i].w)> game.gameBounds.right)
		{
			this.mother[i].xvel=this.mother[i].xvel*(-1);
		}
		else if(this.mother[i].x < game.gameBounds.left)
		{
			this.mother[i].xvel=this.mother[i].xvel*(-1);
		}


		if(this.mother[i].gunCooldown > (this.mother[i].gunMaxCooldown ))
		{
		if(this.mother[i].x >= (this.ship.x - (this.ship.width/2)) && this.mother[i].x <= (this.ship.x + (this.ship.width/2)) )
		{
			//shoot
			this.bombs.push(new Bomb(this.mother[i].x, this.mother[i].y + this.mother[i].h / 2,95));
			this.mother[i].gunCooldown=0;
		}
		}


		this.mother[i].x += this.mother[i].xvel*dt;
		this.mother[i].gunCooldown++;


	}

    //  Move the invaders.
    var hitLeft = false, hitRight = false, hitBottom = false;
    for(i=0; i<this.invaders.length; i++) {
        var invader = this.invaders[i];
        var newx = invader.x + this.invaderVelocity.x * dt;
        var newy = invader.y + this.invaderVelocity.y * dt;
        if(hitLeft === false && newx < game.gameBounds.left) {
            hitLeft = true;
        }
        else if(hitRight === false && newx > game.gameBounds.right) {
            hitRight = true;
        }
        else if(hitBottom === false && newy > game.gameBounds.bottom) {
            hitBottom = true;
        }

        if(!hitLeft && !hitRight && !hitBottom) {
            invader.x = newx;
            invader.y = newy;
        }
    }

    //  Update invader velocities.
    if(this.invadersAreDropping) {
        this.invaderCurrentDropDistance += this.invaderVelocity.y * dt;
        if(this.invaderCurrentDropDistance >= this.config.invaderDropDistance) {
            this.invadersAreDropping = false;
            this.invaderVelocity = this.invaderNextVelocity;
            this.invaderCurrentDropDistance = 0;
        }
    }
    //  If we've hit the left, move down then right.
    if(hitLeft) {
        this.invaderCurrentVelocity += this.config.invaderAcceleration;
        this.invaderVelocity = {x: 0, y:this.invaderCurrentVelocity };
        this.invadersAreDropping = true;
        this.invaderNextVelocity = {x: this.invaderCurrentVelocity , y:0};
    }
    //  If we've hit the right, move down then left.
    if(hitRight) {
        this.invaderCurrentVelocity += this.config.invaderAcceleration;
        this.invaderVelocity = {x: 0, y:this.invaderCurrentVelocity };
        this.invadersAreDropping = true;
        this.invaderNextVelocity = {x: -this.invaderCurrentVelocity , y:0};
    }
    //  If we've hit the bottom, it's game over.
    if(hitBottom) {
        this.lives = 0;
    }

	//mother rocket colision
	for(i=0; i<this.mother.length; i++)
	{
	for(x=0;x<this.rockets.length;x++)
	{
		if(this.rockets[x].x >= (this.mother[i].x - this.mother[i].w/2) && this.rockets[x].x <= (this.mother[i].x + this.mother[i].w/2) &&
                this.rockets[x].y >= (this.mother[i].y - this.mother[i].h/2) && this.rockets[x].y <= (this.mother[i].y + this.mother[i].h/2))
				{
					//Hit!!!
					if(game.p.fancy)
					{
						game.p.createParticleExplosion(this.mother[i].x,this.mother[i].y,20);
					}
					else
					{
						game.p.createParticleExplosion(this.mother[i].x,this.mother[i].y,30);
					}
					this.cam.shake(8);
					this.rockets.splice(x--, 1);
					this.mother.splice(i--, 1);

					if(game.level==0)
					{
						 game.score += (this.config.pointsPerInvader*2);
					}
					else
					{
						game.score += Math.round(this.config.pointsPerInvader*2)+((this.config.pointsPerInvader*2)*(game.level*this.config.levelDifficultyMultiplier));
					}

				}
	}

	}



    //  Check for rocket/invader collisions.
    for(i=0; i<this.invaders.length; i++) {
        var invader = this.invaders[i];
        var bang = false;

        for(var j=0; j<this.rockets.length; j++){
            var rocket = this.rockets[j];

            if(rocket.x >= (invader.x - invader.width/2) && rocket.x <= (invader.x + invader.width/2) &&
                rocket.y >= (invader.y - invader.height/2) && rocket.y <= (invader.y + invader.height/2)) {

                //  Remove the rocket, set 'bang' so we don't process
                //  this rocket again.
                this.rockets.splice(j--, 1);
                bang = true;
                if(game.level==0)
                {
                     game.score += (this.config.pointsPerInvader);
                }
                else
                {
                    game.score += Math.round(this.config.pointsPerInvader)+((this.config.pointsPerInvader)*(game.level*this.config.levelDifficultyMultiplier));
                }
                //explusion here
				if(game.p.fancy)
				{
				game.p.createParticleExplosion(invader.x,invader.y,10);
				}
				else
				{
				game.p.createParticleExplosion(invader.x,invader.y,20);
				}


                //Power up
				if(Math.floor((Math.random()*game.config.powerUpRate)+1) == 1 )
				{
				this.powerUps.push(new powerUp(invader.x, invader.y ,0,-70,1));
				}



                 this.cam.shake(3);
                break;
            }
        }
        if(bang) {
            this.invaders.splice(i--, 1);
        }
    }

    //  Find all of the front rank invaders.
    var frontRankInvaders = {};
    for(var i=0; i<this.invaders.length; i++) {
        var invader = this.invaders[i];
        //  If we have no invader for game file, or the invader
        //  for game file is futher behind, set the front
        //  rank invader to game one.
        if(!frontRankInvaders[invader.file] || frontRankInvaders[invader.file].rank < invader.rank) {
            frontRankInvaders[invader.file] = invader;
        }
    }

    //  Give each front rank invader a chance to drop a bomb.
    for(var i=0; i<this.config.invaderFiles; i++) {
        var invader = frontRankInvaders[i];
        if(!invader) continue;
        var chance = this.bombRate * dt;
        if(chance > Math.random()) {
            //  Fire!
            this.bombs.push(new Bomb(invader.x, invader.y + invader.height / 2,
                this.bombMinVelocity + Math.random()*(this.bombMaxVelocity - this.bombMinVelocity)));
        }
    }

    //  Check for bomb/ship collisions.
    for(var i=0; i<this.bombs.length; i++) {
        var bomb = this.bombs[i];
        if(bomb.x >= (this.ship.x - this.ship.width/2) && bomb.x <= (this.ship.x + this.ship.width/2) &&
                bomb.y >= (this.ship.y - this.ship.height/2) && bomb.y <= (this.ship.y + this.ship.height/2)) {
            this.bombs.splice(i--, 1);
            game.lives--;
            this.cam.shake(20);
        }

    }



    //  Check for invader/ship collisions.
    for(var i=0; i<this.invaders.length; i++) {
        var invader = this.invaders[i];
        if((invader.x + invader.width/2) > (this.ship.x - this.ship.width/2) &&
            (invader.x - invader.width/2) < (this.ship.x + this.ship.width/2) &&
            (invader.y + invader.height/2) > (this.ship.y - this.ship.height/2) &&
            (invader.y - invader.height/2) < (this.ship.y + this.ship.height/2)) {
            //  Dead by collision!
            game.lives = 0;
            //game.sounds.playSound('explosion');
        }
    }

	//  Check for invader/powerup collisions.
    for(var i=0; i<this.powerUps.length; i++) {
        var power = this.powerUps[i];
        if((power.x + power.w/2) > (this.ship.x - this.ship.width/2) &&
            (power.x - power.w/2) < (this.ship.x + this.ship.width/2) &&
            (power.y + power.h/2) > (this.ship.y - this.ship.height/2) &&
            (power.y - power.h/2) < (this.ship.y + this.ship.height/2)) {
			//hit
			this.powerUps.splice(i--, 1);
			if(power.id ==1)
			{
				game.lives++;
			}


        }
    }


    //  Check for failure
    if(game.lives <= 0) {
        game.moveToState(new GameoverState());
    }

    //  Check for victory
    if(this.invaders.length === 0 &&  this.mother.length === 0) {
        game.score += this.level * 50;
        game.level += 1;
        game.moveToState(new LevelIntroState(game.level));
    }


	//Pulsierende power ups
	for(var i=0; i<this.powerUps.length; i++) {
			var power = this.powerUps[i];


			if(power.colorWay==true)
			{
				power.r += power.colorRate;
				power.g += power.colorRate;
				power.b += power.colorRate;
			}
			else
			{
				power.r -= power.colorRate;
				power.g -= power.colorRate;
				power.b -= power.colorRate;
			}


			if( power.r > power.colorMax || power.g > power.colorMax || power.b > power.colorMax || power.a > power.colorMax)
			{
				power.colorWay=false;
				if(power.r>power.colorMax)
				{
					power.r=power.r-(power.r-power.colorMax);
				}
				if(power.g>power.colorMax)
				{
					power.g=power.g-(power.g-power.colorMax);
				}
				if(power.b>power.colorMax)
				{
					power.b=power.b-(power.b-power.colorMax);
				}
			}
			else if(power.r<power.colorMin||power.g<power.colorMin||power.b<power.colorMin||power.a<power.colorMin)
			{
				power.colorWay=true;
				if(power.r<power.colorMin)
				{
					power.r=power.r-(power.colorMin-power.r);
				}
				if(power.g<power.colorMin)
				{
					power.g=power.g-(power.colorMin-power.g);
				}
				if(power.b<power.colorMin)
				{
					power.b=power.b-(power.colorMin-power.b);
				}
			}



		}








    //PArticle


    game.p.update();


    this.cam.update();

};

PlayState.prototype.fireRocket = function() {
    //  If we have no last rocket time, or the last rocket time
    //  is older than the max rocket rate, we can fire.
    if(this.lastRocketTime === null || ((new Date()).valueOf() - this.lastRocketTime) > (1000 / this.config.rocketMaxFireRate))
    {
        //  Add a rocket.
        this.rockets.push(new Rocket(this.ship.x, this.ship.y - 12, this.config.rocketVelocity));
        this.lastRocketTime = (new Date()).valueOf();
    }
};


PlayState.prototype.draw = function(game, dt, ctx) {

    //  Clear the background.
    ctx.clearRect(0, 0, game.width, game.height);

    //  Draw ship.
	ctx.drawImage(shipSprite, this.ship.x - (this.ship.width / 2) +this.cam.x,  this.ship.y - (this.ship.height / 2)+this.cam.y,this.ship.width,this.ship.height);

    // ctx.fillStyle = 'rgba(153, 153, 153, 1)';
    // ctx.fillRect(this.ship.x - (this.ship.width / 2) +this.cam.x, this.ship.y - (this.ship.height / 2)+this.cam.y, this.ship.width, this.ship.height);
    // ctx.fillRect(this.ship.x - (this.ship.width / 2)- (6/2)+this.cam.x, this.ship.y -(this.ship.height / 2)- (6/2)+this.cam.y, 6, 6);

    //  Draw invaders.
    ctx.fillStyle = 'rgba(111, 255, 0, 1) ';
    for(var i=0; i<this.invaders.length; i++) {
        var invader = this.invaders[i];
        ctx.fillRect(invader.x - (invader.width/2) +this.cam.x, invader.y - (invader.height/2) +this.cam.y, invader.width, invader.height);
    }

	 //  Draw mothership
    ctx.fillStyle = 'rgba(111, 255, 0, 1) ';
    for(var i=0; i<this.mother.length; i++) {
        var moth = this.mother[i];

		for(var x=0;x<15;x++)
		{
			ctx.fillStyle = 'rgba(111, 255, 0, 0.01) ';
			ctx.fillRect(moth.x +this.cam.x - (x/2)-(moth.w/2), moth.y  +this.cam.y -(x/2)- (moth.h/2), (moth.w)+x,(moth.h)+x);
		}
		ctx.fillStyle = 'rgba(111, 255, 0, 1) ';
        ctx.fillRect(moth.x - (moth.w/2) +this.cam.x, moth.y - (moth.h/2) +this.cam.y, moth.w, moth.h);
    }

    //  Draw bombs.
    ctx.fillStyle = 'rgba(255, 65, 5, 1) ';
    for(var i=0; i<this.bombs.length; i++) {
        var bomb = this.bombs[i];

		for(var x=0;x<20;x++)
		{
			ctx.fillStyle = 'rgba(255, 65, 5, 0.01) ';
			ctx.fillRect(bomb.x - 2 +this.cam.x -(x/2), bomb.y - 2 +this.cam.y - (x/2), 4 +x, 4 +x);

		}

		ctx.fillStyle = 'rgba(255, 65, 5, 1) ';
        ctx.fillRect(bomb.x - 2 +this.cam.x, bomb.y - 2 +this.cam.y, 4, 4);
    }

    //  Draw rockets.
    for(var i=0; i<this.rockets.length; i++) {
        var rocket = this.rockets[i];

		if(rocket.pulseWay)
		{
			rocket.pulseRadius++;
		}
		else
		{
			rocket.pulseRadius--;
		}

		if(rocket.pulseRadius>rocket.pulseMaxRadius)
		{
		rocket.pulseWay=false;
		}
		if(rocket.pulseRadius <= rocket.pulseMinRadius)
		{
		rocket.pulseWay=true;
		}

		for(var x=0;x<rocket.pulseRadius;x++)
		{
			ctx.fillStyle = 'rgba('+rocket.r+','+rocket.g+','+rocket.b+', 0.05) ';

			ctx.beginPath();
			ctx.arc(rocket.x +this.cam.x + (rocket.w/2), rocket.y +this.cam.y +(rocket.h/2) ,x,0,2*Math.PI);
			ctx.fill();
			//ctx.fillRect(rocket.x +this.cam.x - (x/2), rocket.y - 2 +this.cam.y -(x/2), (rocket.w*2)+x,(rocket.h*2)+x);
		}
		ctx.fillStyle = 'rgba('+rocket.r+','+rocket.g+','+rocket.b+', 1) ';
        ctx.fillRect(rocket.x +this.cam.x, rocket.y  +this.cam.y, rocket.w,rocket.h);
    }

    //  Draw powerups.

    for(var i=0; i<this.powerUps.length; i++) {
        var power = this.powerUps[i];
		ctx.fillStyle = 'rgba('+power.r+','+power.g+', '+power.b+', '+power.a+') ';
        ctx.fillRect(power.x + this.cam.x, power.y  + this.cam.y, power.w, power.h);
    }


    //Textausgabe  LEben usw

    ctx.font="36px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Score:"+ game.score, (game.width / 3 * 1) +this.cam.x, (game.height-36 ) +this.cam.y);

    ctx.font="36px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.fillText("Lives:"+ game.lives,( game.width / 3 * 2)+this.cam.x,( game.height-36)+this.cam.y);

    //Particles
    game.p.draw(ctx,this.cam);


};

//---------------Ships------------------------//

/*

  The ship has a position and that's about it.

*/
function Ship(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 35;

} ;

/*
    Fired by the ship, they've got a position and velocity.

    */
function Rocket(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.w=2;
    this.h=5;



	this.pulseRadius=0;
	this.pulseMaxRadius=15;
	this.pulseMinRadius=0;
	this.pulseWay=true;

	this.r=255;
	this.g=0;
	this.b=0;
}  ;

/*
    Dropped by invaders, they've got position and velocity.
*/
function Bomb(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
}   ;

/*
    Invaders have position, type, rank/file and that's about it.
*/

function Invader(x, y, rank, file, type) {
    this.x = x;
    this.y = y;
    this.rank = rank;
    this.file = file;
    this.type = type;
    this.width = 18;
    this.height = 14;
} ;

/*
    PowerUps Will be randomly dropped
*/
function powerUp(x, y,xvel,yvel,id) {
    this.x = x;
    this.y = y;
    this.xvel=xvel;
    this.yvel=yvel;
    this.id=id;    //1= extralive 2= shotgun ...
    this.w = 10;
    this.h = 10;

	this.r=255;
	this.g=255;
	this.b=255;
	this.a=1;

	this.colorMax=255;
	this.colorMin=100;
	this.colorWay=true;
	this.colorRate=2;


};


function mothership(x, y) {
    this.x = x;
    this.y = y;
    this.xvel=-70;
    this.yvel=0;

	this.gunCooldown=0;
	this.gunMaxCooldown=15;

    this.w = 30;
    this.h = 5;
};
