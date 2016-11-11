//--- The sprite object
var spriteObject = {
	image: null          //ja dodao, sadrži sliku sprajta objekta, treba je definirati za svaki novi objekt
	, sourceX: 0
	, sourceY: 0
	, sourceWidth: 128
	, sourceHeight: 128
	, x: 0
	, y: 0
	, width: 128
	, height: 128
	, velocityX: 0
	, velocityY: 0
	, rotation: 0         
	, acceleration: 3    //snaga pogona objekta, tj. koliko brzo može ubrzati
	, airResistance: 0.05 //trenje zraka na objekt, MORA BITI IZMEĐU 0 i 1
};

// Screen Resolution setup
var screenWidth = 2000;
var screenHeight = 800;
document.getElementById( "glavniCanvas" ).width = screenWidth.toString();
document.getElementById( "glavniCanvas" ).height = screenHeight.toString();

//The canvas and its drawing surface
var canvas = document.querySelector( "canvas" );
var drawingSurface = canvas.getContext( "2d" );



//-------- LOADING ALL GRAPHICAL RESOURCES ---------

//An array to store the sprites
var sprites = [];

var background = Object.create( spriteObject );
background.width = 2000;
background.height = 800;
background.sourceWidth = 2000;
background.sourceHeight = 800;
background.image = new Image();
background.image.addEventListener( "load", loadHandler, false );		
background.image.src = "img/earth.jpg";
sprites.push(background);	


//Create the player sprite
var player = Object.create( spriteObject );
player.x = 23;
player.y = 18;
//Load the playerImage
player.image = new Image();
player.image.addEventListener( "load", loadHandler, false );
player.image.src = "img/spaceship.png";
//store the sprite in sprites array which is used in physics() and render() functions
sprites.push( player );

//loading the bullet image ONLY, bullet sprites are created when a ship shots
var bulletImg = new Image();
bulletImg.addEventListener( "load", loadHandler, false );
bulletImg.src = "img/Bullet.png";



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
var shoot= false;
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



function loadHandler() {
	update();
}



function update() {
	//The animation loop
	requestAnimationFrame( update, canvas );

	//react to player input
	inputProcesor();
	//apply physics to all sprites
	physics();
	//Render all sprites
	render();
}




function inputProcesor(){
	//reacts to all player input
		//Up
	if ( moveUp && !moveDown ) {
		player.velocityY += player.acceleration * Math.sin(player.rotation * Math.PI / 180);
		player.velocityX += player.acceleration * Math.cos(player.rotation * Math.PI / 180);
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
	if (shoot){
		var bullet = Object.create( spriteObject );
		bullet.x=player.x;
		bullet.y=player.y;
		bullet.rotation=player.rotation;
		bullet.airResistance=0;
		bullet.velocityY=15*Math.sin(player.rotation * Math.PI / 180);	
		bullet.velocityX=15*Math.cos(player.rotation * Math.PI / 180);
		bullet.image=bulletImg;
		sprites.push( bullet);
	}
}



function physics(){
	//applyes physics to all objects in the game
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			if ( true ) {
					//Move the sprite
					sprite.x += sprite.velocityX;
					sprite.y += sprite.velocityY;

					//Lower the sprite's velocity to simulate air resistance
					sprite.velocityY -= sprite.velocityY*sprite.airResistance;
					sprite.velocityX -= sprite.velocityX*sprite.airResistance;
			}
		}
	}
}



function render() {
	//Clear the previous animation frame
	drawingSurface.clearRect( 0, 0, canvas.width, canvas.height );
	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			if ( true ) {
				//Save the current state of the drawing surface before it's rotated
				drawingSurface.save();
				//Rotate the canvas
				drawingSurface.translate( Math.floor( sprite.x + ( sprite.width / 2 ) ), Math.floor( sprite.y +	( sprite.height / 2 ) ) );
				//rotiranje sprajta
				drawingSurface.rotate( (sprite.rotation) * Math.PI / 180 );
				drawingSurface.drawImage( sprite.image, sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight
					, -sprite.width / 2, -sprite.height / 2 , sprite.width, sprite.height );
				//Restore the drawing surface to its state before it was rotated
				drawingSurface.restore();
			}
		}
	}
}