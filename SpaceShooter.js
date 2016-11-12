

// Screen Resolution setup
var screenWidth = 1000;
var screenHeight = 500;
document.getElementById( "glavniCanvas" )
	.width = screenWidth.toString();
document.getElementById( "glavniCanvas" )
	.height = screenHeight.toString();

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
var player = new shipClass(playerImg,233,333,5,0.1);
player.width=64;
player.height=64;
var player2 = new shipClass(playerImg,533,133,5,0.1);
console.log(player.velocityY);

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
	//apply physics to all sprites
	physics();
	//Render all sprites
	render();
}



function inputProcesor() {
	//reacts to all player input
	//Up
	if ( moveUp && !moveDown ) {
		player.velocityY += player.acceleration * Math.sin( player.rotation * Math.PI / 180 );
		player.velocityX += player.acceleration * Math.cos( player.rotation * Math.PI / 180 );
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
		new bulletClass(player.rotation,15,player.x,player.y);
	}
}



function physics() {
	//applyes physics to all objects in the game
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			if ( true ) {
				//Move the sprite
				sprite.x += sprite.velocityX;
				sprite.y += sprite.velocityY;
				//Lower the sprite's velocity to simulate air resistance
				sprite.velocityY -= sprite.velocityY * sprite.airResistance;
				sprite.velocityX -= sprite.velocityX * sprite.airResistance;
			}
		}
	}
}



function collision() {
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			if ( true ) {
				//Save the current state of the drawing surface before it's rotated
				drawingSurface.save();
				//Rotate the canvas
				drawingSurface.translate( Math.floor( sprite.x + ( sprite.width / 2 ) ), Math.floor( sprite.y + ( sprite.height / 2 ) ) );
				//rotiranje sprajta
				drawingSurface.rotate( ( sprite.rotation ) * Math.PI / 180 );
				drawingSurface.drawImage( sprite.image, sprite.sourceX, sprite.sourceY, sprite.sourceWidth, sprite.sourceHeight, -sprite.width / 2, -sprite.height / 2,
					sprite.width, sprite.height );
				//Restore the drawing surface to its state before it was rotated
				drawingSurface.restore();
			}
		}
	}
}




function hitTestCircle(c1, c2){
	//Calculate the vector between the circles' center points
	var vx = c1.centerX() - c2.centerX();
	var vy = c1.centerY() - c2.centerY();
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is)
	var magnitude = Math.sqrt(vx * vx + vy * vy);
	//Add together the circles' total radii
	var totalRadii = c1.collisionRadius + c2.collisionRadius;
	//Set hit to true if the distance between the circles is
	//less than their totalRadii
	var hit = magnitude < totalRadii;
	return hit;
}



function render() {
	//Clear the previous animation frame
	drawingSurface.clearRect( 0, 0, canvas.width, canvas.height );
	//Loop through all the sprites and use their properties to display them
	if ( sprites.length !== 0 ) {
		for ( var i = 0; i < sprites.length; i++ ) {
			var sprite = sprites[ i ];
			var spriteImage=sprite.imageClass;
			if ( true ) {
				//Save the current state of the drawing surface before it's rotated
				drawingSurface.save();
				//Rotate the canvas
				drawingSurface.translate( Math.floor( sprite.x + ( sprite.width / 2 ) ), Math.floor( sprite.y + ( sprite.height / 2 ) ) );
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