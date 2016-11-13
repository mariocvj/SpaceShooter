
//-------- LOADING ALL GRAPHICAL RESOURCES ---------

//Arrays to store all the objects in, so later main program functions only need to loop through an array specific to their purpose
var sprites = [];
var physicals = [];
var solids = [];      //doesn't have it's own object type, but uses physicsClass who's subclasses instances are added to it
var ships = [];
//var players = [];
var bullets = [];



//--- The sprite object 
function imageClass(src,sourceX,sourceY,sourceWidth,sourceHeight){
	this.imageFile=new Image();
	this.imageFile.src=src;				 //ja dodao, sadrži sliku sprajta objekta, treba je definirati za svaki novi objekt
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.sourceWidth=sourceWidth;
	this.sourceHeight=sourceHeight;
}



//Load all the images
var playerImg = new imageClass("PlaceholderGraphics/spaceship.png",0,0,128,128);

var bulletImg = new imageClass("PlaceholderGraphics/Bullet.png",0,0,20,12);

var backgroundImg = new imageClass("PlaceholderGraphics/Background.jpg",0,0,0,0); //last 4 arguments are changed in the main loop as player moves



/*
var meteor1 = Object.create( spriteClass );
meteor1.x = 222;
meteor1.y = 333;
var meteor2 = Object.create( spriteClass );
meteor2.x = 482;
meteor2.y = 433;
var meteor3 = Object.create( spriteClass );
meteor3.x = 792;
meteor3.y = 103;

meteor1.image = meteorImg;
meteor2.image = meteorImg;
meteor3.image = meteorImg;
meteor1.collisionRadius=29;
meteor2.collisionRadius=29;
meteor3.collisionRadius=29;
sprites.push( meteor1, meteor2, meteor3 );

//Create the player sprite
var player = Object.create( playerClass );
player.x = 23;
player.y = 18;
sprites.push( player );
*/
