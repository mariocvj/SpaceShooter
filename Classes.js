


function spriteClass (imageClass,x,y,rotation=0){
	this.imageClass = imageClass;
	this.x = x;
	this.y = y;
	this.width = imageClass.sourceWidth;              //width and height will in almost all cases be same as sourceWidth and sourceHeight,
	this.height = imageClass.sourceHeight;            //this code allows for them to be changed with spriteClass.width/height = something;
	this.rotation = rotation;
	sprites.push(this);
}



function physicsClass (imageClass,x,y,rotation=0,airResistance=0.2,velocityY=0,velocityX=0){
 	this.velocityY = velocityY;
	this.velocityX = velocityX;
	this.airResistance = airResistance;				//trenje zraka na objekt, MORA BITI IZMEĐU 0 i 1
	spriteClass.call(this,imageClass,x,y,rotation);
	physicals.push(this);
}

     

function shipClass (imageClass,x,y,health=50,airResistance=0.2,acceleration=0){
	this.acceleration = acceleration;
	this.maxHealth=health;
	this.health=health;
	this.AI=null;											//snaga pogona objekta, tj. koliko brzo može ubrzati
	this.collisionRadius = (imageClass.sourceWidth+imageClass.sourceHeight)/4.55;			
	physicsClass.call(this,imageClass,x,y,0,airResistance,0,0);
	ships.push(this);
	solids.push(this);

	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	}

	this.createAi = function(target = playership){
		this.AI= new pilotAiClass(target);
		AIs.push(this);
	}

		//this function is the BRAIN of the AI, it determines what commands it gives, so it only runs for AI's object instances each loop
	this.updateAi = function(){

		// calculating desired rotation of the AI
		this.rotation = this.rotation % 360;
		let angle = Math.atan2 (this.y - this.AI.target.y,this.x - this.AI.target.x) / Math.PI * 180;

		//calculating in which direction to turn to achieve desired rotation the fastest
		let angleCheck = Math.abs ((this.rotation - (angle)) % 360);
		//console.log(angleCheck+"ddddddd"+(angleCheck-180));
		
		//turning
		if (angleCheck > 0 && angleCheck < 180){
			this.AI.moveLeft = true;
			this.AI.moveRight = false;
		}else{

			this.AI.moveLeft = false;
			this.AI.moveRight = true;			
		}

		//console.log(Math.sqrt (Math.pow (this.ship.y - this.target.y,2) + Math.pow (this.ship.x - this.target.x,2)));
		if (180 - angleCheck < 15) {
			if (this.AI.broadsideRange > Math.sqrt (Math.pow (this.y - this.AI.target.y,2) + Math.pow (this.x - this.AI.target.x,2))){
				this.AI.moveUp = false;
				this.AI.shoot = true;
			}else{
				this.AI.moveUp = true;
				this.AI.shoot = false;
			}
		}else{
			this.AI.shoot = false;
			this.AI.moveUp = false;
		}
	}



	//this function CARRIES OUT commands in the pilotAiClass Object, whether they were put there by the player or pilotAiClass.update(),
	//as such, this function must run each loop for the player's pilotAiClass Object aswell as for all of the AI's object instances 
	this.inputProcesorAi = function() {
		//reacts to input
		//Up
		if ( this.AI.moveUp ) {
			this.velocityY += this.acceleration * Math.sin( this.rotation * Math.PI / 180 );
			this.velocityX += this.acceleration * Math.cos( this.rotation * Math.PI / 180 );
			//draw thruster plume particle effect
			thrusterPlume(this.x + this.width / 2 - 20 * Math.cos( this.rotation * Math.PI / 180 ) ,this.y+this.height/2 -20 * Math.sin(this.rotation * Math.PI / 180 ),this.rotation );
		}
		//shoot
		if ( this.AI.shoot ) {
			new bulletClass(this.rotation,this.x+this.width/2+30 * Math.cos( this.rotation * Math.PI / 180 ),this.y+this.height/2+30 * Math.sin( this.rotation * Math.PI / 180 ));
		}

		//Left
		if ( this.AI.moveLeft ) {
			this.rotation -= 5;
		}
		//Right
		if ( this.AI.moveRight ) {
			this.rotation += 5;
		}
	}

}



function pilotAiClass (ship,target = playership){
	this.target = target;
	this.moveUp = false;
	this.moveLeft = false;
	this.moveRight = false;
	this.shoot = false;
	this.broadsideRange = 400;
}



function solidClass (imageClass,x,y,health=25,airResistance=0.2){
	this.collisionRadius = (imageClass.sourceWidth + imageClass.sourceHeight) / 4.55;
	this.maxHealth=health;
	this.health=health;		
	physicsClass.call (this,imageClass,x,y,0,airResistance,0,0);
	solids.push (this);

	this.resize = function (factor){
		this.width = this.width * factor;
		this.height = this.height * factor;
		this.collisionRadius = this.collisionRadius * factor;
		this.airResistance = this.airResistance * factor;
	}
}



function bulletClass (rotation,x,y,damage=3,velocity=30) {
	let velocityY = velocity * Math.sin( rotation * Math.PI / 180 );
	let velocityX = velocity * Math.cos( rotation * Math.PI / 180 );
	this.damage=damage;
	this.collisionRadius = (bulletImg.sourceWidth + bulletImg.sourceHeight) / 7;
	physicsClass.call (this,bulletImg,x-10,y-6,rotation,0,velocityY,velocityX);
	bullets.push (this);
}









