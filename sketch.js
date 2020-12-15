var PLAY = 1;
var END = 0;
var gameState = PLAY;

var touch;
var Life = 2;
var monkey,monkey_running,monkey_collided;
var BG,ground,BG_image;
var jumpSound,catchSound,gameOversound,ouchSound;
var gameOver,gameOverImage;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload() {
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  monkey_collided = loadAnimation("Monkey_08.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  BG_image = loadImage("jungle.jpg");
  
  gameOverImage = loadImage("gameOver.gif");
  gameOverSound = loadSound("gameover.mp3");
  
  jumpSound = loadSound("jump.mp3");
  catchSound = loadSound("Catch.mp3");
  ouchSound = loadSound("OUCH.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  BG = createSprite(width/2-200,height/2-200.600,20);
  BG.addImage(BG_image);
  BG.velocityX = -4;
  BG.scale = 2;
  
  monkey = createSprite(200,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(width/2,height/2+300,400,10);
  ground.velocityX = -4;
  
  gameOver = createSprite(width/2,height/2,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  
  touch = createSprite(400,200,800,400);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
  monkey.setCollider("rectangle",0,0,1,550);
  
}

function draw() {
  background("white")
  
  
  if(gameState === PLAY) {
    
    gameOver.visible = false;
    touch.visible = false;
  
      food();
      obstacles();

      ground.visible = false;

        if (BG.x < 0){
          BG.x = BG.width/2;
        }

      ground.x = ground.width/2;

      if(mousePressedOver(touch)&& monkey.y >= 300) {
        monkey.velocityY = -18;
        jumpSound.play();
      }
      monkey.velocityY = monkey.velocityY + 0.8;
      monkey.collide(ground);

      if(FoodGroup.isTouching(monkey)) {
        FoodGroup.destroyEach();
        catchSound.play();
        score = score + 1;
        switch(score) {
          case 05: monkey.scale = 0.11 
                  break;
          case 10: monkey.scale = 0.12 
                  break;        
          case 15: monkey.scale = 0.13 
                  break;
          case 20: monkey.scale = 0.14 
                  break;
          case 25: monkey.scale = 0.15 
                  break;
          case 30: monkey.scale = 0.16
                  break;
                  default:break
        }
      }

      if(obstacleGroup.isTouching(monkey)) {
        ouchSound.play();
        Life -= 1;
      }
        
      if(Life === 0) {
        gameState = END;
        gameOverSound.play();
      }
        
        FoodGroup.depth = gameOver.depth;
        gameOver.depth = gameOver.depth + 1;
    }
    
  else if(gameState === END) {
        
        gameOver.visible = true;
    
        monkey.changeAnimation("collided", monkey_collided);
    
        FoodGroup.depth = gameOver.depth;
        gameOver.depth = gameOver.depth + 1;
    
        monkey.velocityY = 0;
        BG.velocityX = 0;
    
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
  }
  
  drawSprites();
  
  textSize(20);
  fill("white");
  stroke("black");
  text("Banana = " + score,width/2-450,30);
  text("LIFE = " + Life,width/2+350,30);
  
}
  
function food() {
  if(frameCount % 180 === 0) {
    var banana = createSprite(width/2+400,height/2,20,20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.lifetime = 250;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(width/2,height/2+270,20,20);
    stone.addImage(obstaceImage);
    stone.velocityX = -4;
    stone.scale = 0.18;
    stone.lifetime = 250;
    
    stone.setCollider("circle",0,0,0.1);
    
    obstacleGroup.add(stone)
  }
}