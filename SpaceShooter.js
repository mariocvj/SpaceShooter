//--- The sprite object
var spriteObject = {
	sourceX: 0
	, sourceY: 0
	, sourceWidth: 128
	, sourceHeight: 128
	, x: 0
	, y: 0
	, width: 128
	, height: 128
	, vx: 0
	, vy: 0
	, rotation: 0
	, acceleration: 5
};
// Screen Resolution setup
var screenWidth = 1000;
var screenHeight = 500;
document.getElementById( "glavniCanvas" ).width = screenWidth.toString();
document.getElementById( "glavniCanvas" ).height = screenHeight.toString();
//--- The main program
//The canvas and its drawing surface
var canvas = document.querySelector( "canvas" );
var drawingSurface = canvas.getContext( "2d" );
//An array to store the sprites
var sprites = [];
//Create the player sprite and center it
var player = Object.create( spriteObject );
player.x = 23;
player.y = 18;
sprites.push( player );
//Load the playerImage
var playerImage = new Image();
playerImage.addEventListener( "load", loadHandler, false );
playerImage.src = "PlaceholderGraphics/spaceship.png";
//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
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
	}
}, false );



function loadHandler() {
	update();
}



function update() {
	//The animation loop
	requestAnimationFrame( update, canvas );
	//Up
	if ( moveUp && !moveDown ) {
		player.vy += player.acceleration * Math.sin(player.rotation * Math.PI / 180);
		player.vx += player.acceleration * Math.cos(player.rotation * Math.PI / 180);
	}
	//Down
	if ( moveDown && !moveUp ) {
		player.vy += 5;
	}
	//Left
	if ( moveLeft && !moveRight ) {
		player.rotation -= 5;
	}
	//Right
	if ( moveRight && !moveLeft ) {
		player.rotation += 5;
	}
	//Lower the player's velocity to simulate air resistance
	player.vy -= player.vy/20 ;
	player.vx -= player.vx/20;
	
	//Move the 
	player
	player.x += player.vx;
	player.y += player.vy;
	//Render the sprite
	render();
}



function renderrr() {
	//Clear the previous animation frame
	drawingSurface.clearRect( 0, 0, canvas.width, canvas.height );
	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			drawingSurface.drawImage( playerImage, sprite.sourceX, sprite.sourceY, sprite.sourceWidth
				, sprite.sourceHeight, Math.floor( sprite.x ), Math.floor( sprite.y ), sprite.width, sprite.height
			);
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
				drawingSurface.drawImage( playerImage, sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight
					, -sprite.width / 2, -sprite.height / 2 , sprite.width, sprite.height );
				//Restore the drawing surface to its state before it was rotated
				drawingSurface.restore();
			}
		}
	}
}