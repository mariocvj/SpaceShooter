

// Screen Resolution setup
var screenWidth = 1200;
var screenHeight = 500;
var halfScreenWidth=screenWidth/2;     //these 2 half variables are used a lot in the program so they are calculated here for optimization
var halfScreenHeight=screenHeight/2;
document.getElementById( "glavniCanvas" )
	.width = screenWidth.toString();
document.getElementById( "glavniCanvas" )
	.height = screenHeight.toString();

//Game map setup
var mapWidth=7680;
var mapHeight=4320;
var backgroundZoom=1;   //1 is normal, less than 1 is zoom IN, more than 1 is zoom OUT
backgroundImg.sourceWidth=screenWidth*backgroundZoom;
backgroundImg.sourceHeight=screenHeight*backgroundZoom;
var background = new spriteClass(backgroundImg,0,0,0);  //creating the background sprite
removeObject(background, sprites);     //remove background sprite from sprites rendering array because it has it's own rendering code

//The canvas and its drawing surface
var canvas = document.querySelector( "canvas" );
var drawingSurface = canvas.getContext( "2d" );





//------------ SETING UP PLAYER INPUT LISTENERS ------------

//Used keys key codes
const UP = 38;
const DOWN = 40;
const RIGHT = 39;
const LEFT = 37;
const SPACE = 32;
//Player commands
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
var shoot = false;
//Add keyboard listeners
window.addEventListener( "keydown", function( event ) {
	switch ( event.keyCode ) {
		case UP:
			moveUp = true;
			break;
		case DOWN:
			moveDown = true;
			break;
		case LEFT:
			moveLeft = true;
			break;
		case RIGHT:
			moveRight = true;
			break;
		case SPACE:
			shoot = true;
			break;
	}
}, false );
window.addEventListener( "keyup", function( event ) {
	switch ( event.keyCode ) {
		case UP:
			moveUp = false;
			break;
		case DOWN:
			moveDown = false;
			break;
		case LEFT:
			moveLeft = false;
			break;
		case RIGHT:
			moveRight = false;
			break;
		case SPACE:
			shoot = false;
			break;
	}
}, false );



//creating player object
var player = new shipClass(playerImg,1133,2333,1,0.1);
player.resize(0.5);

//some environment objects
var player2 = new shipClass(playerImg,533,2633,5,0.1);
var comet=new shipClass(meteorImg,1111,2111,0,1);
comet.resize(2.3);
new shipClass(meteorImg,1861,1511,0,1);
new shipClass(meteorImg,861,2001,0,1);

var enemy = new shipClass(playerImg, 1500, 2000,1,0.1);
enemy.resize(0.5);
enemy.airResistance=0.7;
var enemyAI= new pilotAiClass(enemy);

var meteorImg = new Image();
meteorImg.addEventListener("load", loadHandler, false);
meteorImg.src = "PlaceholderGraphics/Meteor2.png";

function loadHandler() {
	update();
}



function update() {
	//The animation loop
	requestAnimationFrame( update, canvas );
	//react to player input
	inputProcesor();
	//center the camera on the player
	centerCamera(player.x,player.y);
	//keep the player inside the map
	mapBoundaryCollision();
	//apply physics to all sprites
	physics();
	//check for collisions
	collisionDetect();
	//Render all sprites
	render();
}



function inputProcesor() {
	//reacts to all player input
	//Up
	if ( moveUp && !moveDown ) {
		player.velocityY += player.acceleration * Math.sin( player.rotation * Math.PI / 180 );
		player.velocityX += player.acceleration * Math.cos( player.rotation * Math.PI / 180 );
		//draw thruster plume particle effect
		thrusterPlume(player.x+player.width/2-20 * Math.cos( player.rotation * Math.PI / 180 ) ,player.y+player.height/2 -20 * Math.sin(player.rotation * Math.PI / 180 ),player.rotation );

	}

	if ( enemyAI.shoot ) {
		enemyAI.ship.velocityY += enemyAI.ship.acceleration * Math.sin( enemyAI.ship.rotation * Math.PI / 180 );
		enemyAI.ship.velocityX += enemyAI.ship.acceleration * Math.cos( enemyAI.ship.rotation * Math.PI / 180 );
		//draw thruster plume particle effect
		thrusterPlume(enemyAI.ship.x+enemyAI.ship.width/2-20 * Math.cos( enemyAI.ship.rotation * Math.PI / 180 ) ,enemyAI.ship.y+enemyAI.ship.height/2 -20 * Math.sin(enemyAI.ship.rotation * Math.PI / 180 ),enemyAI.ship.rotation );

	}
	//Down
	/*
	if ( moveDown && !moveUp ) {
		player.velocityY += 5;
	}
	*/
	//Left
	if ( moveLeft && !moveRight ) {
		player.rotation -= 5;
	}
	//Right
	if ( moveRight && !moveLeft ) {
		player.rotation += 5;
	}
	//Shoot
	if ( shoot ) {
		new bulletClass(player.rotation,30,player.x+player.width/2+30 * Math.cos( player.rotation * Math.PI / 180 ),player.y+player.height/2+30 * Math.sin( player.rotation * Math.PI / 180 ));
	}

	if (enemyAI.shoot){
		new bulletClass(enemyAI.ship.rotation,30,enemyAI.ship.x+enemyAI.ship.width/2+30 * Math.cos( enemyAI.ship.rotation * Math.PI / 180 ),enemyAI.ship.y+enemyAI.ship.height/2+30 * Math.sin( enemyAI.ship.rotation * Math.PI / 180 ));
	}

	enemyAI.update();
	if (enemyAI.moveLeft){
		enemyAI.ship.rotation += 5;
	}
	else{
		enemyAI.ship.rotation -= 5;
	}
}



function physics() {
	physicals.forEach(drawPhysics);
	//applyes physics to all objects in the game
		function drawPhysics (physicals) {
			//Move the sprite
			physicals.x += physicals.velocityX;
			physicals.y += physicals.velocityY;
			//Lower the physicals's velocity to simulate air resistance
			physicals.velocityY -= physicals.velocityY * physicals.airResistance;
			physicals.velocityX -= physicals.velocityX * physicals.airResistance;
		}
}



function collisionDetect() {     // KOMPLEKSNOST  O(n2)  !!!!!  treba biti optimizirano

	var solidsLen=solids.length;
	if ( solidsLen !== 0 ) {
		if ( bullets.length !== 0 ) {
			//check if any bullet is colliding with any solid
			for (var i = 0 ; i < bullets.length; i++ ){
				let bullet =  bullets[ i ];
				//Check if bullets[i] is out of screen, if it is, delete that bullet
				if ( outOfScreen(bullet.x ,bullet.y) ) {
					removeObject(bullet,physicals);
					removeObject(bullet,bullets);
					removeObject(bullet,sprites);
				}
				else{
					//check if bullets[i] is colliding with any solid
					for ( var y = 0; y <  solidsLen; y++ ) {
						if (hitTestCircle(bullet, solids[y])){
							smallExplosion(bullet.x,bullet.y);
							removeObject(bullet, bullets);
							removeObject(bullet, sprites);
						}
					}	

				}
			}
		}
		//check whether any solid is colliding with any other solid
		for(var i=0 ; i < solidsLen; i++ ){
			for(var  y = i+1 ; y < solidsLen; y++ ){
				if (hitTestCircle(solids[i], solids[y])){
					//handle all the aspects of collision betwen 2 solids
					solidsHaveCollided(solids[i],solids[y]);
				}
			}
		}
	}
}



function render() {
	//Clear the previous animation frame
	drawingSurface.clearRect( 0, 0, canvas.width, canvas.height );
	//draw the background
	drawingSurface.drawImage( backgroundImg.imageFile, backgroundImg.sourceX, backgroundImg.sourceY, backgroundImg.sourceWidth, backgroundImg.sourceHeight, 0, 0,
	screenWidth * backgroundZoom, screenHeight * backgroundZoom );
	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			let sprite = sprites[ i ];
			let spriteImage=sprite.imageClass;
			if ( true ) {
				//Save the current state of the drawing surface before it's rotated
				drawingSurface.save();
				//Rotate the canvas
				drawingSurface.translate( Math.floor( sprite.x + ( sprite.width / 2 ) )-cameraPosX, Math.floor( sprite.y + ( sprite.height / 2 ) ) -cameraPosY);
				//rotiranje sprajta
				drawingSurface.rotate( ( sprite.rotation ) * Math.PI / 180 );
				drawingSurface.drawImage( spriteImage.imageFile, spriteImage.sourceX, spriteImage.sourceY, spriteImage.sourceWidth, spriteImage.sourceHeight, -sprite.width / 2, -sprite.height / 2,
				sprite.width, sprite.height );
				//Restore the drawing surface to its state before it was rotated
				drawingSurface.restore();
			}
		}
	}

	//calculate and render particle system
	moveAndRenderParticles();
}



//----------------------- MANJE FUNKCIJE KOJE SE KORISTE U VELIKIMA -----------------------------

function solidsHaveCollided(solid1,solid2){
	let k=1; //koeficijent restitucije, tj. mjera elastičnosti sudara, mora biti između 0 i 1, 0 je potpuno neelastičan, a 1 potpuno elastičan
	let center1x=solid1.x+solid1.width/2;
	let center1y=solid1.y+solid1.height/2;
	let center2x=solid2.x+solid2.width/2;
	let center2y=solid2.y+solid2.height/2;
	let combinedRadius=solid1.collisionRadius + solid2.collisionRadius;
	let impactX=center1x+(center2x-center1x)*(solid1.collisionRadius/combinedRadius);
	let impactY=center1y+(center2y-center1y)*(solid1.collisionRadius/combinedRadius);
	collisionSparks( impactX,impactY );
	console.log(impactX-solid1.x+impactY-solid1.y);
	solid1.x=solid1.x-(impactX-solid1.x)*0.2;
	solid1.y=solid1.y-(impactY-solid1.y)*0.2;
	solid2.x=solid2.x-(impactX-solid2.x)*0.2;
	solid2.y=solid2.y-(impactY-solid2.y)*0.2;	
	/*
	//calculating object speeds after the impact
	var momentumX=solid1.collisionRadius*solid1.velocityX+solid2.collisionRadius*solid2.velocityX;
	var momentumY=solid1.collisionRadius*solid1.velocityY+solid2.collisionRadius*solid2.velocityY;

	var solid1NewVelX=(momentumX+k*solid2.collisionRadius*(solid2.velocityX-solid1.velocityX))/combinedRadius;
	var solid1NewVelY=(momentumY+k*solid2.collisionRadius*(solid2.velocityY-solid1.velocityY))/combinedRadius;

	var solid2NewVelX=(momentumX+k*solid1.collisionRadius*(solid1.velocityX-solid2.velocityX))/combinedRadius;
	var solid2NewVelY=(momentumY+k*solid1.collisionRadius*(solid1.velocityY-solid2.velocityY))/combinedRadius;

	solid1.velocityX=solid1NewVelX;
	solid1.velocityY=solid1NewVelY;
	solid2.velocityX=solid2NewVelX;
	solid2.velocityY=solid2NewVelY;


	solid1.velocityX=((solid1.collisionRadius-solid2.collisionRadius)*solid1.velocityX+2*solid2.collisionRadius*solid2.velocityX)/combinedRadius;
	solid1.velocityY=((solid1.collisionRadius-solid2.collisionRadius)*solid1.velocityY+2*solid2.collisionRadius*solid2.velocityY)/combinedRadius;
	solid2.velocityX=((solid2.collisionRadius-solid1.collisionRadius)*solid1.velocityX+2*solid1.collisionRadius*solid1.velocityX)/combinedRadius;
	solid2.velocityY=((solid2.collisionRadius-solid1.collisionRadius)*solid1.velocityY+2*solid1.collisionRadius*solid1.velocityY)/combinedRadius;
	*/
}



function moveAndRenderParticles(){
	if ( particles.length !== 0 ) {
		for ( var i = 0; i < particles.length; i++ ) {
			var particle = particles[ i ];
			drawingSurface.fillStyle=particle.color;
			drawingSurface.fillRect(particle.x-cameraPosX-2,particle.y-cameraPosY-2,4,4);
			particle.x+=particle.velocityX;
			particle.y+=particle.velocityY;
			drawingSurface.fillRect(particle.x-cameraPosX-2,particle.y-cameraPosY-2,4,4);
			particle.ttl--;
			if (particle.ttl<1){
				removeObject(particles[i], particles);
			}
		}
	}
}



function mapBoundaryCollision(){
	if (cameraPosX<0){
		player.x=halfScreenWidth;
	}
	if (cameraPosY<0){
		player.y=halfScreenHeight;
	}
	if (cameraPosX+screenWidth>mapWidth){
		player.x=mapWidth-halfScreenWidth;
	}
	if (cameraPosY+screenHeight>mapHeight){
		player.y=mapHeight-halfScreenHeight;
	}
}



function centerCamera(cenX,cenY){
	let x=cenX-halfScreenWidth;
	let y=cenY-halfScreenHeight;
	cameraPosX=x;
	cameraPosY=y;
	backgroundImg.sourceX=x;
	backgroundImg.sourceY=y;
}



function outOfScreen(x,y){
	if (x<cameraPosX-100 || y>cameraPosY + screenHeight+100 || y<cameraPosY-100 || x>cameraPosX + screenWidth+100){
		console.log(x,y);
		return true;
	}
	return false;
}



function removeObject(objectToRemove, array)
{
	let i = array.indexOf(objectToRemove);
	if (i !== -1)
	{
		array.splice(i, 1);
	}
}



function hitTestCircle(physicsClass1, physicsClass2){
	//Calculate the vector between the circles' center points
	let vx = physicsClass1.x + (physicsClass1.width/2) - physicsClass2.x - (physicsClass2.width/2);
	let vy = physicsClass1.y + (physicsClass1.height/2) - physicsClass2.y - (physicsClass2.height/2);
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	let magnitude = Math.sqrt(vx * vx + vy * vy);
	//Add together the circles' total radii
	let totalRadi = physicsClass1.collisionRadius + physicsClass2.collisionRadius;
	//Set hit to true if the distance between the circles is
	//less than their totalRadii
	return magnitude < totalRadi;
}