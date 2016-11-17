
/*
var spriteClass = {
	image: imageClass,
	x: 0,
	y: 0,
	width: 128,
	height: 128,
	rotation: 0,
	//Getters

	centerX: function()
	{
		return this.x + (this.width / 2);
	},
	centerY: function()
	{
		return this.y + (this.height / 2);
	},
	setImg: function(spriteClass){
		this.image=spriteClass.image;
		this.sourceX=spriteClass.sourceX;
		this.sourceY=spriteClass.sourceY;
		this.sourceWidth=spriteClass.sourceWidth;
		this.sourceHeight=spriteClass.sourceHeight;
	}

};
*/
function spriteClass(imageClass,x,y,rotation){
	this.imageClass=imageClass;
	this.x=x;
	this.y=y;
	this.width=imageClass.sourceWidth;              //width and height will in almost all cases be same as sourceWidth and sourceHeight,
	this.height=imageClass.sourceHeight;            //this code allows for them to be changed with spriteClass.width/height = something;
	this.rotation=rotation;
	sprites.push(this);
}



function physicsClass(imageClass,x,y,rotation,velocityY,velocityX,airResistance){
 	this.velocityY = velocityY;
	this.velocityX = velocityX;
	this.airResistance=airResistance;				//trenje zraka na objekt, MORA BITI IZMEĐU 0 i 1
	spriteClass.call(this,imageClass,x,y,rotation);
	physicals.push(this);
}

     

function shipClass(imageClass,x,y,acceleration,airResistance){
	this.acceleration=acceleration; 											//snaga pogona objekta, tj. koliko brzo može ubrzati
	this.collisionRadius=(imageClass.sourceWidth+imageClass.sourceHeight)/4.55;			
	physicsClass.call(this,imageClass,x,y,0,0,0,airResistance);
	ships.push(this);
	solids.push(this);

	this.resize = function (factor){
		this.width=this.width*factor;
		this.height=this.height*factor;
		this.collisionRadius=this.collisionRadius*factor;
		this.airResistance=this.airResistance*factor;
	}
}



function solidClass(imageClass,x,y,airResistance){
	this.collisionRadius=(imageClass.sourceWidth+imageClass.sourceHeight)/4.55;			
	physicsClass.call(this,imageClass,x,y,0,0,0,airResistance);
	solids.push(this);

	this.resize = function (factor){
		this.width=this.width*factor;
		this.height=this.height*factor;
		this.collisionRadius=this.collisionRadius*factor;
		this.airResistance=this.airResistance*factor;
	}
}



function bulletClass(rotation,velocity,x,y) {
	let velocityY = velocity * Math.sin( rotation * Math.PI / 180 );
	let velocityX = velocity * Math.cos( rotation * Math.PI / 180 );
	this.collisionRadius=(bulletImg.sourceWidth+bulletImg.sourceHeight)/7;
	physicsClass.call(this,bulletImg,x-10,y-6,rotation,velocityY,velocityX,0);
	bullets.push(this);
}



function pilotAiClass(ship){
	this.ship=ship;
	this.target=player;
	this.moveUp=false;
	this.moveLeft=false;
	this.moveRight=false;
	this.shoot=false;
	this.broadsideRange=900;

	this.update = function(){

		// calculating desired rotation of the AI
		this.ship.rotation=this.ship.rotation%360;
		let angle=Math.atan2(this.ship.y-this.target.y,this.ship.x-this.target.x)/Math.PI*180;

		//calculating in which direction to turn to achieve desired rotation the fastest
		let angleCheck=Math.abs((this.ship.rotation-(angle))%360);
		//console.log(angleCheck+"ddddddd"+(angleCheck-180));
		
		//turning
		if (angleCheck>0 && angleCheck<180){
			this.moveLeft=true;
			this.moveRight=false;
		}else{

			this.moveLeft=false;
			this.moveRight=true;			
		}

		if (180-angleCheck < 15) {
			if (this.broadsideRange > Math.sqrt(Math.pow(this.ship.y-this.target.y,2)+Math.pow(this.ship.x-this.target.x,2))){
				this.moveUp=false;
				this.shoot=true;
			}else{
				this.moveUp=true;
				this.shoot=false;
			}
		}else{
			this.shoot=false;
			this.moveUp=false;
		}
		console.log(this.shoot);
		
	}
}



//-------------------- PARTICLE SYSTEM -----------------------

function particleClass(ttl,color,x,y,velocityX,velocityY){
	this.ttl=ttl;   //ttl stands for time to live, it shows number of frames before particle dies
	this.x=x;
	this.y=y;
 	this.velocityY = velocityY;
	this.velocityX = velocityX;      
	this.color=color;
	particles.push(this);
}

function thrusterPlume(x,y,rot){
	rotation=rot-180;
	velocity=3;
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






/*
var bulletClass = {
	collisionRadius: 60,      //koristi se u detekciji kolizije

	setImg: function(spriteClass){
		this.image=spriteClass.image;
		this.sourceX=spriteClass.sourceX;
		this.sourceY=spriteClass.sourceY;
		this.sourceWidth=spriteClass.sourceWidth;
		this.sourceHeight=spriteClass.sourceHeight;
		this.collisionRadius=spriteClass.collisionRadius;
	}

}



var playerClass = {

}
Object.setPrototypeOf(playerClass, shipClass);




var solidClass = {
	collisionRadius: 60,      //koristi se u detekciji kolizije

	setImg: function(spriteClass){
		this.image=spriteClass.image;
		this.sourceX=spriteClass.sourceX;
		this.sourceY=spriteClass.sourceY;
		this.sourceWidth=spriteClass.sourceWidth;
		this.sourceHeight=spriteClass.sourceHeight;
		this.collisionRadius=spriteClass.collisionRadius;
	}
}
Object.setPrototypeOf(solidClass, physicsClass);
*/




