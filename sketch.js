var bananaImage, obstacleImage;
var obstacleGroup;
var background, score;
var score;

function preload(){
 backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png"); 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  
  score = 0
  
  back = createSprite(0,0,600,400);
  back.addImage("background", backImage);
  back.scale = 1.5;
   
   
  
  player = createSprite(50,350,10,10);
  player.addAnimation('running', player_running);
  player.scale = 0.1;
  
  ground = createSprite(300,390,600,10);
  ground.visible = false;
  
  
   
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  
}

function draw() {
  background(220);
  back.velocityX = -2;
  spawnfood();
  spawnObstacles();
  
  
  
  if(back.x<0){
    back.x = back.width/2;
  }
  
  if(foodGroup.isTouching(player)){
    score = score + 2
    foodGroup.destroyEach();
  }
  
  if(keyDown("space")){
    player.velocityY = -12; 
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  player.collide(ground);
  
  
  
  switch(score){
      case 10 : player.scale = 0.12;
      break;
      case 20: player.scale = 0.14; 
      break;
      case 30: player.scale = 0.16;
      break;
      case 40: player.scale = 0.18;
      break; 
  }
  
  
  if(obstaclesGroup.isTouching(player)){
    player.scale = 0.1;  
    score = 0;
  }
  
  
  
  drawSprites();
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,45);

 }



function spawnfood(){
  if(frameCount % 60 === 0){
    var banana = createSprite(600, 120, 40, 10);
    banana.y =  Math.round(random(250,200));
    banana.addImage(bananaImage);
    banana.scale = 0.04;
    banana.velocityX = -3;
    banana.lifetime = 200;
    foodGroup.add(banana);
    banana.depth = player.depth;
    player.depth = player.depth +1;
   }
  }

function spawnObstacles(){
  if(frameCount % 160 === 0){
    var obstacle = createSprite(600,350, 20,30);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -2;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}