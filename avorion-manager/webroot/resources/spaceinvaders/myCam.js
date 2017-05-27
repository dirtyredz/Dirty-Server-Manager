function myCam(x,y,w,h)
{
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    
    this.shouldX=this.x;
    this.shouldY=this.y;
    
    this.easing=1;
}


myCam.prototype.update = function()
{
    if(this.easing==1)
    {
      this.x += (this.shouldX - this.x)* 0.1;
     this.y += (this.shouldY - this.y)* 0.1;  
    }
    if(this.easing==2)  //Kleiner bounce
    {
     
    }
     
}

myCam.prototype.shake = function(magnitude)
{
    var pi=3.1415927;
    var winkel=Math.floor((Math.random()*360)+1); 

    winkel=winkel*pi/180;

    if(winkel< 0)
    {
        winkel += 360;
    }


    var x_vel=Math.cos(winkel)*magnitude;
    var y_vel=(Math.sin(winkel)*magnitude); // Eigendlich kommt ein minus vorm sin

    this.x+=x_vel;
    this.y+=y_vel;
}