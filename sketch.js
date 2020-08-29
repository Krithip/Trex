var trex, cactus, cloud, ground, ground2, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, playerscore = 0, play = 1, end = 0, reset, gamestate = 1, gameover, invisibleground, cacti, clouds;

var trexrunning, trexcollided, cloudimage, cactusimage, groundimage, gameoverimage, resetimage;

function preload() {
trexrunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trexcollided = loadAnimation("trex_collided.png");
cloudimage = loadImage("cloud.png");
groundimage = loadImage("ground2.png");
obstacle1 = loadImage("obstacle1.png"); 
obstacle2 = loadImage("obstacle2.png");    
obstacle3 = loadImage("obstacle3.png");  
obstacle4 = loadImage("obstacle4.png");  
obstacle5 = loadImage("obstacle5.png");  
obstacle6 = loadImage("obstacle6.png");
resetimage = loadImage("restart.png");
gameoverimage = loadImage("gameOver.png");  
}

function setup() {
  createCanvas(400, 400);
trex = createSprite(200,380,20,50);
trex.addAnimation("trex",trexrunning);
trex.addAnimation("collided",trexcollided);
trex.scale = 0.5;
trex.x = 50;
trex.setCollider("circle", 0, 0, 40);

reset = createSprite(200, 150);
reset.addImage(resetimage);
reset.visible = false;

gameover = createSprite(200, 200);
gameover.addImage(gameoverimage);
gameover.visible = false;
gameover.scale = 1;

//create a ground sprite
ground = createSprite(200,380,400,20);
ground.addImage(groundimage);
ground.x = ground.width /2;

invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

clouds = new Group();
cacti = new Group();
}

function draw() {
  background(180);
   textSize(20);
  text("playerscore - " + playerscore, 50, 50);
  
  //console.log(trex.y);
  
  if (gamestate == play) {
  ground.velocityX = -(4 + playerscore/100);
  playerscore = playerscore + Math.round(frameRate()/60);
  //console.log(World.frameRate);
  if (ground.x < 0){
  ground.x = ground.width/2;
  }
  if(keyDown("space") && trex.y >= 359){
  trex.velocityY = -12 ;
  //playSound("sound://category_jump/classic_jump_4.mp3");
  }
  trex.velocityY = trex.velocityY + 0.45; 
  if (playerscore %100 == 0 && playerscore > 0) {
  //playSound("sound://category_alerts/airy_bell_notification.mp3");  
  }
  
  myCloud();
  
  myCactus();
  
  if (cacti.isTouching(trex)) {
  gamestate = end ;
  //playSound("sound://category_explosion/fun_bonus_explode_9.mp3");
  }
  } else if (gamestate === end){
  ground.velocityX = 0;
  cacti.setVelocityXEach(0);
  clouds.setVelocityXEach(0);
  playerscore = 0;
  cacti.setLifetimeEach(-1);
  clouds.setLifetimeEach(-1);
  reset.visible = true;
  gameover.visible = true; 
  trex.changeAnimation("collided", trexcollided);  
  }
  if (mousePressedOver(reset)) {
  myRestart();
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
  }

function myCloud() {
if (frameCount% 60 === 0) {
var cloud = createSprite(300, 200);
cloud.y = Math.round(random(50, 200));
cloud.addImage(cloudimage); 
cloud.scale = 2;
cloud.velocityX = -3;  
clouds.add(cloud);
cloud.lifetime = 150;
}
}

//need to change randomNumber
function myCactus() {
if (World.frameCount% 150 == 0) {
var cactus = createSprite(380, 370);
var select = Math.round(random(1,6));
switch(select){
  case 1:
  cactus.addImage("o1", obstacle1);
  break;
  case 2:
  cactus.addImage("o2", obstacle2);
  break; 
  case 3:
  cactus.addImage("o3", obstacle3);
  break;
  case 4:
  cactus.addImage("o4", obstacle4);
  break;
  case 5:
  cactus.addImage("o5", obstacle5);
  break;
  case 6:
  cactus.addImage("o6", obstacle6);
  break;
  default:
  break;
} 
cactus.velocityX = -(2 + playerscore/100);
cactus.scale = 0.45;
cacti.add(cactus);
cactus.lifetime = 190;
cactus.depth = trex.depth;
trex.depth = trex.depth + 1;
console.log(cactus.depth);
}  
}

function myRestart() {
gamestate = play;
reset.visible = false;
gameover.visible = false;
cacti.destroyEach();
clouds.destroyEach();
trex.changeAnimation("trex", trexrunning);
playerscore = 0;
}