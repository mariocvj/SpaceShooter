
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
//physicsClass.prototype = new spriteClass();

      

function shipClass(imageClass,x,y,acceleration,airResistance){
	this.acceleration=acceleration; 			//snaga pogona objekta, tj. koliko brzo može ubrzati
	physicsClass.call(this,imageClass,x,y,0,0,0,airResistance);
	ships.push(this);
}
//physicsClass();



function bulletClass(rotation,velocity,x,y) {
	var velocityY = velocity * Math.sin( player.rotation * Math.PI / 180 );
	var velocityX = velocity * Math.cos( player.rotation * Math.PI / 180 );
	physicsClass.call(this,bulletImg,x,y,rotation,velocityY,velocityX,0);
	bullets.push(this);
}
//physicsClass();



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





