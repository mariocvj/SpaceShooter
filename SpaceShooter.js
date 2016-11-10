//--- The sprite object
var spriteObject =
{
sourceX: 0,
sourceY: 0,
sourceWidth: 64,
sourceHeight: 64,
x: 0,
y: 0,
width: 64,
height: 64,
vx: 0,
vy: 0
};
//--- The main program
//The canvas and its drawing surface
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");
//An array to store the sprites
var sprites = [];
//Create the cat sprite and center it
var cat = Object.create(spriteObject);
cat.x = 243;
cat.y = 168;
sprites.push(cat);
//Load the image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "cat.png";
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
window.addEventListener("keydown", function(event)
{
switch(event.keyCode)
{
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
}, false);
window.addEventListener("keyup", function(event)
{
switch(event.keyCode)
{
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
}, false);
function loadHandler()
{
update();
}
function update()
{
//The animation loop
requestAnimationFrame(update, canvas);
//Up
if(moveUp && !moveDown)
{
cat.vy = -5;
}
//Down
if(moveDown && !moveUp)
{
cat.vy = 5;
}
//Left
if(moveLeft && !moveRight)
{
cat.vx = -5;
}
//Right
if(moveRight && !moveLeft)
{
cat.vx = 5;
}
//Set the cat's velocity to zero if none of the keys are being pressed
if(!moveUp && !moveDown)
{
cat.vy = 0;
}
if(!moveLeft && !moveRight)
{
cat.vx = 0;
}
//Move the cat
cat.x += cat.vx;
cat.y += cat.vy;
//Render the sprite
render();
}
function render()
{
//Clear the previous animation frame
drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
//Loop through all the sprites and use their properties to display them
if(sprites.length !== 0)
{
for(var i = 0; i < sprites.length; i++)
{
var sprite = sprites[i];
drawingSurface.drawImage
(
image,
sprite.sourceX, sprite.sourceY,
sprite.sourceWidth, sprite.sourceHeight,
Math.floor(sprite.x), Math.floor(sprite.y),
sprite.width, sprite.height
);
}
}
}