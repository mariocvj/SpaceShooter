

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
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;
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
player.width=64;
player.height=64;

//some environment objects
var player2 = new shipClass(playerImg,533,2633,5,0.1);
var comet=new shipClass(meteorImg,1111,1111,0,1);
comet.width=256;
comet.height=256;
new shipClass(meteorImg,1861,1511,0,1);
new shipClass(meteorImg,861,2001,0,1);


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
		thrusterPlume(player.x+player.width/2 ,player.y+player.height/2,player.rotation);

	}
	//Down
	if ( moveDown && !moveUp ) {
		//player.velocityY += 5;
	}
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
		new bulletClass(player.rotation,30,player.x+player.width/2.3+45 * Math.cos( player.rotation * Math.PI / 180 ),player.y+player.height/2.3+45 * Math.sin( player.rotation * Math.PI / 180 ));
	}
}



function physics() {
	//applyes physics to all objects in the game
	if ( physicals.length !== 0 ) {
		for ( var i = 0; i < physicals.length; i++ ) {
			var sprite = physicals[ i ];
			//Move the sprite
			sprite.x += sprite.velocityX;
			sprite.y += sprite.velocityY;
			//Lower the sprite's velocity to simulate air resistance
			sprite.velocityY -= sprite.velocityY * sprite.airResistance;
			sprite.velocityX -= sprite.velocityX * sprite.airResistance;
		}
	}
}



function collisionDetect() {     // KOMPLEKSNOST  O(n2)  !!!!!  treba biti optimizirano


	if ( bullets.length !== 0 ) {
		for (var i = 0 ; i < bullets.length; i++ ){
			var bullet =  bullets[ i ];
			//Check if bullets[i] is out of screen, if it is, delete that bullet
			if ( outOfScreen(bullet.x ,bullet.y) ) {
				removeObject(bullet,physicals);
				removeObject(bullet,bullets);
				removeObject(bullet,sprites);
			}
			else{
				//Check if bullets[i] is colliding with any solid
				if ( solids.length !== 0 ) {
					for ( var y = 0; y <  solids.length; y++ ) {
						if (hitTestCircle(bullet, solids[y])){
							smallExplosion(bullet.x,bullet.y);
							removeObject(bullet, bullets);
							removeObject(bullet, sprites);
						}
					}	

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

	//calculate and render particle system
	moveAndRenderParticles();

	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			var spriteImage=sprite.imageClass;
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
}



//----------------------- MANJE FUNKCIJE KOJE SE KORISTE U VELIKIMA -----------------------------

function moveAndRenderParticles(){
	drawingSurface.fillStyle="#FFEE99";
	if ( particles.length !== 0 ) {
		for ( var i = 0; i < particles.length; i++ ) {
			var particle = particles[ i ];
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
	var x=cenX-halfScreenWidth;
	var y=cenY-halfScreenHeight;
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
	var i = array.indexOf(objectToRemove);
	if (i !== -1)
	{
		array.splice(i, 1);
	}
}



function hitTestCircle(physicsClass1, physicsClass2){
	//Calculate the vector between the circles' center points
	var vx = physicsClass1.x + (physicsClass1.width/2) - physicsClass2.x + (physicsClass2.width/2);
	var vy = physicsClass1.y + (physicsClass1.height/2) - physicsClass2.y + (physicsClass2.height/2);
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	var magnitude = Math.sqrt(vx * vx + vy * vy);
	//Add together the circles' total radii
	var totalRadii = physicsClass1.collisionRadius + physicsClass2.collisionRadius;
	//Set hit to true if the distance between the circles is
	//less than their totalRadii
	var hit = magnitude < totalRadii;
	return hit;
}