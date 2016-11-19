
//-------- LOADING ALL GRAPHICAL RESOURCES ---------

//Arrays to store all the objects in, so later main program functions only need to loop through an array specific to their purpose
var sprites = [];
var physicals = [];
var solids = [];      //doesn't have it's own object type, but uses physicsClass who's subclasses instances are added to it
var ships = [];
//var players = [];
var bullets = [];
var particles = [];
var AIs = [];
var weapons = [];



//--- The sprite object 
function imageClass(src,sourceX,sourceY,sourceWidth,sourceHeight){
	this.imageFile = new Image();
	this.imageFile.src = src;				 //ja dodao, sadrži sliku sprajta objekta, treba je definirati za svaki novi objekt
	this.sourceX = sourceX;
	this.sourceY = sourceY;
	this.sourceWidth = sourceWidth;
	this.sourceHeight = sourceHeight;
}



//Load all the images
var playerImg = new imageClass("PlaceholderGraphics/spaceship.png",0,0,128,128);

var bulletImg = new imageClass("PlaceholderGraphics/Bullet.png",0,0,20,12);

var backgroundImg = new imageClass("PlaceholderGraphics/Background.jpg",0,0,0,0); //last 4 arguments are changed in the main loop as player moves

var meteorImg = new imageClass("PlaceholderGraphics/Meteor2.png",0,0,56,59);

var charmanderImg = new imageClass("PlaceholderGraphics/Charmander.gif",0,0,256,256);
