
//-------------------- BASE PARTICLE CLASS -----------------------

function particleClass (ttl,color,x,y,velocityX,velocityY){
	this.ttl = ttl;   //ttl stands for time to live, it shows number of frames before particle dies
	this.x = x;
	this.y = y;
 	this.velocityY = velocityY;
	this.velocityX = velocityX;      
	this.color = color;
	particles.push (this);
}



//----------------- PARTICLE EFFECT FUNCTIONS ---------------------------

//each function is used for different game animation, they are all based on base particle class

function thrusterPlume (x,y,rot){
	rotation = rot - 180;
	velocity = 3;
	new particleClass(30+Math.random()*20,"#7777FF",x,y,(velocity+Math.random()*4) * Math.cos( rotation * Math.PI / 180 ), (velocity+Math.random()*4) * Math.sin( rotation * Math.PI / 180 ));
	new particleClass(10+Math.random()*20,"#BBBBFF",x,y,(2+Math.random()*4) * Math.cos( rotation * Math.PI / 180 ), (2+Math.random()*4) * Math.sin( rotation * Math.PI / 180 ));
	new particleClass(30+Math.random()*20,"#BBBBFF",x,y,(1+Math.random()*4) * Math.cos( rotation * Math.PI / 180 ), (1+Math.random()*4) * Math.sin( rotation * Math.PI / 180 ));
	new particleClass(30+Math.random()*20,"#DDDDFF",x,y,velocity * Math.cos( (rotation-(5+Math.random()*10)) * Math.PI / 180 ), velocity * Math.sin( (rotation-(5+Math.random()*10)) * Math.PI / 180 ));
	new particleClass(30+Math.random()*20,"#DDDDDFF",x,y,velocity * Math.cos( (rotation+(5+Math.random()*10)) * Math.PI / 180 ), velocity * Math.sin( (rotation+(5+Math.random()*10)) * Math.PI / 180 ));
}

function smallExplosion(x,y){
	new particleClass(4+Math.random()*8,"#FFEE99",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFEE99",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFAAAA",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFFFAA",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFDDAA",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFFFFF",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFFF55",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
	new particleClass(4+Math.random()*8,"#FFEE99",x,y,(Math.random()-0.5)*15,(Math.random()-0.5)*15);
}

function collisionSparks(x,y){
	new particleClass(3+Math.random()*6,"#FFFFFF",x,y,(Math.random()-0.5)*25,(Math.random()-0.5)*25);
	new particleClass(3+Math.random()*6,"#FFFFFF",x,y,(Math.random()-0.5)*25,(Math.random()-0.5)*25);
	new particleClass(3+Math.random()*6,"#FFFFFF",x,y,(Math.random()-0.5)*25,(Math.random()-0.5)*25);
	new particleClass(3+Math.random()*6,"#FFFFFF",x,y,(Math.random()-0.5)*25,(Math.random()-0.5)*25);
}
