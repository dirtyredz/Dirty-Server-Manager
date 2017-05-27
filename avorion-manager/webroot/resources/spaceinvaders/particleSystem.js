//
//Egentlich nur kleine pixel
//
 //Random farben
  



function particle(x,y,fancy)
{
    this.x=x;
    this.y=y;
    
    var fromto=5;
    
    this.xvel=(Math.random()*fromto*2)-fromto;
    this.yvel=(Math.random()*fromto*2)-fromto;
    
    
    this.life=150;
    this.maxLife=this.life;
    this.decay=3;
    
    this.deleteMe=false;
    
    //Farbvariablen
    this.r=255;
    this.g=0;
    this.b=255; 
    
    this.opacity=255;
    
    this.fancy=fancy;
    
    this.radius=2;
    
    this.gravity=0.1;
    
   // friction will slow the particle down
	this.friction = 0.85; 
	
    this.brightness=80;
	
	
	 // track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 2;
	
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) 
    {
		this.coordinates.push( [ this.x, this.y ] );
	}
    
};

particle.prototype.update=function()
{
    // remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );



   this.xvel*=this.friction;
   this.yvel*=this.friction;
   
   this.yvel+=this.gravity;


    
        this.x+=this.xvel;
        this.y+=this.yvel;
    
//    else
//    {
//        this.x+=(this.xvel*time);
//        this.y+=(this.yvel*time);
//    }
    
    this.life-=this.decay;
    
    if(this.life<=0)
    {
        this.deleteMe=true;
    }
};

particle.prototype.draw=function(ctx,cam)
{

    var camX,camY;
    if(cam === undefined)
    {
       camX=camY=0; 
    }
    else
    {
        camX=cam.x;
        camY=cam.y;
    }
    
    
    
	//changing opacity according to the life.
	//opacity goes to 0 at the end of life of a particle
	this.opacity = Math.round(this.life/this.maxLife*100)/100;
	if(this.fancy)
	{
	this.opacity = Math.round(this.life/this.maxLife*100)/100;
    //	var opacity = Math.round(this.life);

    ctx.lineWidth=this.radius;


    ctx.globalCompositeOperation="lighter";
    ctx. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ] +camX, this.coordinates[ this.coordinates.length - 1 ][ 1 ] )+camY;
	ctx.lineTo( this.x +camX, this.y +camY );
	ctx.strokeStyle = 'hsla(' + 240 + ', 100%, ' + this.brightness + '%, ' + this.opacity + ')';
	ctx.stroke();

    ctx.globalCompositeOperation="source-over";
    }
    else
    {
        ctx.globalCompositeOperation="source-over";
		
		//Glow effect
			for(var x=0; x<15;x++)
			{
				ctx.fillStyle="rgba(" + this.r + "," + this.g + "," + this.b + ",   "+ (this.opacity * 0.01)  +"	)";
				ctx.fillRect(this.x+camX-(x/2),this.y+camY-(x/2),this.radius +x +this.radius ,this.radius +x+this.radius);  
			}
		
         ctx.fillStyle="rgba(" + this.r + "," + this.g + "," + this.b + ","+ this.opacity + ")";
        
        ctx.fillRect(this.x+camX,this.y+camY,this.radius,this.radius);  
		
		
		/*
		ctx.globalCompositeOperation="source-over";
		
		//Glow effect
			for(var x=0; x<15;x++)
			{
				ctx.fillStyle="rgba(" + this.r + "," + this.g + "," + this.b + ",   "+ (this.opacity * 0.01)  +"	)";
				ctx.beginPath();
				ctx.arc(this.x+camX-(x/2),this.y+camY-(x/2),x,0,2*Math.PI); 
				ctx.fill();
			}
		
         ctx.fillStyle="rgba(" + this.r + "," + this.g + "," + this.b + ","+ this.opacity + ")";
        ctx.beginPath();
        ctx.arc(this.x+camX,this.y+camY,this.radius,0,2*Math.PI);
		ctx.fill();	
		
		
		*/
		
    }
//        ctx.fillStyle="#FF0000";
//        ctx.fillRect(this.x,this.y,10,10); 




//     //a gradient instead of white fill
//			var gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
//			
//			gradient.addColorStop(0, "rgba("+this.r+", "+this.g+", "+this.b+", "+this.opacity+")");
//			gradient.addColorStop(0.5, "rgba("+this.r+", "+this.g+", "+this.b+", "+this.opacity+")");
//			gradient.addColorStop(1, "rgba("+this.r+", "+this.g+", "+this.b+", 0)");
//			
//			
//			 ctx.globalCompositeOperation="lighter";
//			//console.log("HI");
//			ctx.fillStyle = gradient;                    
//			ctx.beginPath();
//			ctx.arc(this.x, this.y, this.radius, Math.PI*2, false);
//			ctx.fill();

//    ctx.fillStyle="#FF0000";
//    ctx.beginPath();
//    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
//    ctx.fill();
};


/*ParticleSystem Class
 * Verwalltet nur alle Parrticel und löscht / erzeugt diese
 */

function particleSystem()
{
    this.particles=[];
    this.fancy=true;
       
};

particleSystem.prototype.update=function()
{
    for(var i=0;i<this.particles.length;i++)
    {
        this.particles[i].update(1);
        
        if(this.particles[i].deleteMe)
        {
            this.particles.splice(i,1);
        }
    }
}; 

particleSystem.prototype.draw=function(ctx,cam)
{
if(cam === undefined)
	{
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].draw(ctx);
		}
    }
	else
	{
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].draw(ctx,cam);
		}
	}
};


particleSystem.prototype.createParticleExplosion=function(x,y,number)
{
    for(var i=0;i<number;i++)
    {
		this.particles.push(new particle(x,y,this.fancy)); 
    }
    
};



