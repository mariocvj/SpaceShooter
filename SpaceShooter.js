//--- The sprite object
var spriteObject = {
	image: null,              //ja dodao, sadrži sliku sprajta objekta, treba je definirati za svaki novi objekt
	sourceX: 0,
	sourceY: 0,
	sourceWidth: 128,
	sourceHeight: 128,
	x: 0,
	y: 0,
	width: 128,
	height: 128,
	velocityX: 0,
	velocityY: 0,
	rotation: 0,
	acceleration: 0.3,         //snaga pogona objekta, tj. koliko brzo može ubrzati
	airResistance: 0.02,       //trenje zraka na objekt, MORA BITI IZMEĐU 0 i 1
	collisionRadius: 60        //koristi se u detekciji kolizije
	//Getters
centerX: function()
{
return this.x + (this.width / 2);
},
centerY: function()
{
return this.y + (this.height / 2);
}
};

// Screen Resolution setup
<<<<<<< HEAD
var screenWidth = 1000;
var screenHeight = 500;
document.getElementById( "glavniCanvas" )
	.width = screenWidth.toString();
document.getElementById( "glavniCanvas" )
	.height = screenHeight.toString();
=======
var screenWidth = 2000;
var screenHeight = 800;
document.getElementById( "glavniCanvas" ).width = screenWidth.toString();
document.getElementById( "glavniCanvas" ).height = screenHeight.toString();
>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97

//The canvas and its drawing surface
var canvas = document.querySelector( "canvas" );
var drawingSurface = canvas.getContext( "2d" );



//-------- LOADING ALL GRAPHICAL RESOURCES ---------

//An array to store the sprites
var sprites = [];
<<<<<<< HEAD
=======

var background = Object.create( spriteObject );
background.width = 2000;
background.height = 800;
background.sourceWidth = 2000;
background.sourceHeight = 800;
background.image = new Image();
background.image.addEventListener( "load", loadHandler, false );		
background.image.src = "img/earth.jpg";
sprites.push(background);	

var gameWorld ={
	x: 0,
	y: 0,
	width: background.width,
	height: background.height
};
var camera ={
	x: 0,
	y: 0,
	width: 4500,
	height: 4550,
	//The camera's inner boundaries
	rightInnerBoundary: function()
	{
	return this.x + (this.width * 0.75);
	},
	leftInnerBoundary: function()
	{
	return this.x + (this.width * 0.25);
	},
	topInnerBoundary: function()
	{
	return this.y + (this.height * 0.25);
	},
	bottomInnerBoundary: function()
	{
	return this.y + (this.height * 0.75);
	}
};
console.log(camera.x + camera.y);


>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97
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
<<<<<<< HEAD
bulletImg.src = "PlaceholderGraphics/Bullet.png";
var meteor1 = Object.create( spriteObject );
meteor1.x = 222;
meteor1.y = 333;
var meteor2 = Object.create( spriteObject );
meteor2.x = 482;
meteor2.y = 433;
var meteor3 = Object.create( spriteObject );
meteor3.x = 792;
meteor3.y = 103;
var meteorImg = new Image();
meteorImg.addEventListener( "load", loadHandler, false );
meteorImg.src = "PlaceholderGraphics/Meteor2.png";
meteor1.image = meteorImg;
meteor2.image = meteorImg;
meteor3.image = meteorImg;
meteor1.collisionRadius=29;
meteor2.collisionRadius=29;
meteor3.collisionRadius=29;
sprites.push( meteor1, meteor2, meteor3 );
=======
bulletImg.src = "img/Bullet.png";
>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97



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



function loadHandler() {
	update();
}



function update() {
	console.log("update");
	//The animation loop
	requestAnimationFrame( update, canvas );
<<<<<<< HEAD
=======
	player.x = (gameWorld.x + gameWorld.width / 2) - player.width / 2;
	player.y = (gameWorld.y + gameWorld.height / 2) - player.height / 2;

	//Center the camera to follow the player	
	camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
	camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;
	//Keep the camera inside the gameWorld boundaries
	//Scroll the camera
	if(player.x < camera.leftInnerBoundary())
{
camera.x = Math.max(0, Math.min
(
Math.floor(player.x - (camera.width * 0.25)),
gameWorld.width - camera.width
));
}
if(player.y < camera.topInnerBoundary())
{
camera.y = Math.max(0, Math.min
(
Math.floor(player.y - (camera.height * 0.25)),
gameWorld.height - camera.height
));
}
if(player.x + player.width > camera.rightInnerBoundary())
{
camera.x = Math.max(0, Math.min
(
Math.floor(player.x + player.width - (camera.width * 0.75)),
gameWorld.width - camera.width
));
}
if(player.y + player.height > camera.bottomInnerBoundary())
{
camera.y = Math.max(0, Math.min
(
Math.floor(player.y + player.height - (camera.height * 0.75)),
gameWorld.height - camera.height
));
}

>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97
	//react to player input
	inputProcesor();
	//apply physics to all sprites
	physics();
	//Render all sprites
	render();
}



<<<<<<< HEAD
function inputProcesor() {
=======

function inputProcesor(){
	console.log("inputProcesor");
>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97
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
		var bullet = Object.create( spriteObject );
		bullet.x = player.x;
		bullet.y = player.y;
		bullet.rotation = player.rotation;
		bullet.airResistance = 0;
		bullet.velocityY = 15 * Math.sin( player.rotation * Math.PI / 180 );
		bullet.velocityX = 15 * Math.cos( player.rotation * Math.PI / 180 );
		bullet.image = bulletImg;
		bullet.collisionRadius=5;
		sprites.push( bullet );
	}
}



<<<<<<< HEAD
function physics() {
=======
function physics(){
	console.log("physics");
>>>>>>> 3d8190121135cab792ba13e9dcfe1fe27f9daa97
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