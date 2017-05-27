
//Sternefeld Klasse//   //  Create a starfield.     var starfield = new Starfield();  
function Starfield() 
{
    this.fps = 60;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 150;
    this.maxVelocity = 300;
    this.stars = 100;
    this.intervalId = 0;
} 

//Initialiesiert alle variablen und erstellt ein canvas und ein eventlistener der sich ums rezising kümmert
Starfield.prototype.initialise = function(div) 
{
    
    var self = this;
 
    //  Store the div.
    this.containerDiv = div;
    self.width = window.innerWidth;
    self.height = window.innerHeight;
 
    window.addEventListener('resize', function resize(event) {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        self.canvas.width = self.width;
        self.canvas.height = self.height;
        self.draw();
    });
 
    //  Create the canvas.
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
}; 

//Startet das feld un erstellt die sterne
Starfield.prototype.start = function() 
{
 
    //  Create the stars.
    var stars = [];
    for(var i=0; i<this.stars; i++) {
        stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
        (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
    this.stars = stars; 



var self = this;
    //	Start the timer.
    this.intervalId = setInterval(function() {
        self.update();
        self.draw();	
    }, 1000 / this.fps);
};

//Updated/bewegt die Sterne
Starfield.prototype.update = function() {
    var dt = 1 / this.fps;
    for(var i=0; i<this.stars.length; i++) {
        var star = this.stars[i];
        star.y += dt * star.velocity;
        //  If the star has moved from the bottom of the screen, spawn it at the top.
        if(star.y > this.height) {
            this.stars[i] = new Star(Math.random()*this.width, 0, Math.random()*3+1, 
               (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
        }
    }
};

Starfield.prototype.draw = function() {
    
    //  Get the drawing context.
    var ctx = this.canvas.getContext("2d");
 
    // Draw the background.
    ctx.fillStyle = "rgba(0, 0,0, 0.1)";
    ctx.fillRect(0, 0, this.width, this.height);
 
    //  Draw stars.
    ctx.fillStyle = '#ffffff';
    for(var i=0; i<this.stars.length;i++) {
        var star = this.stars[i];
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
};  


//Die sterne
function Star(x, y, size, velocity)
{
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocity = velocity;
};