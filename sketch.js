var PLAY=1;
var END=0;
var gameState=1;

var enemy,monsterImage,monstersGroup;
var fruit1,fruit2,fruit3,fruit4,fruit,fruitsGroup;
var sword,swordImage;

var gameover,gameoverImage;

var score;

var knifeSwooshSound,gameoverSound;

function preload(){
 swordImage=loadImage("sword.png"); 
 fruit1=loadImage("fruit1.png");
 fruit2=loadImage("fruit2.png");
 fruit3=loadImage("fruit3.png"); 
 fruit4=loadImage("fruit4.png"); 
 monsterImage=loadAnimation("alien1.png","alien2.png");
 gameoverImage=loadImage("gameover.png");
  
}

function setup(){
createCanvas(600,500);
  
  sword=createSprite(40,200,20,20);
  sword.addImage('knife', swordImage);
  sword.scale=0.7;
 // sword.debug=true
  
  fruitsGroup= new Group();
  monstersGroup= new Group();
  
  score=0;
  
}

function draw(){
background('lightblue');
  
  text("score: "+ score,500,50);
  
  if(gameState===PLAY){
    
    fruits();
    enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
      
      
      score=score+2;
    }
    
    if(monstersGroup.isTouching(sword)){
      gameState=END;
    }
    
    
  }else if(gameState===END){
      sword.x=40;
      sword.y=200;
    gameover=createSprite(300,250,20,20);
    gameover.addImage(gameoverImage);
    fruitsGroup.destroyEach();
    monstersGroup.destroyEach(); 
    }
  
  drawSprites();
}

function fruits() {
if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2
  r=Math.round(random(1,4));
  if(r==1){
    fruit.addImage(fruit1);
  }else if(r==2){
    fruit.addImage(fruit2);
  }else if(r==3){
    fruit.addImage(fruit3);
  }else if(r==4){
    fruit.addImage(fruit4);

  }
      
    //fruit.debug=true
  
  fruit.y=Math.round(random(50,340));
  
  fruit.velocityX=-7;
  fruit.setLifetime=100;
  
 position=Math.round(random(1,4));
  if(position==1){
    fruit.x=400;
    fruit.velocityX=(7+(score/4))
  }else if(position==2){
    fruit.x=0;
    fruit.velocityX=(7+(score/4))
  }else if(position==3){
    fruit.x=400;
    fruit.velocityX=(7+(score/4))
  }else if(position==4){
    fruit.x=0;
    fruit.velocityX=(7+(score/4))
  } 
  
 fruitsGroup.add(fruit);
}
}

function enemy(){
    if(World.frameCount%200===0){
      monster=createSprite(400,200,20,20);
      monster.addAnimation("moving",monsterImage);
    //  monster.debug=true
      monster.y=Math.round(random(100,300));
      monster.velocityX=-(8+(score/10));
      monster.setLifetime=50;
      
      monstersGroup.add(monster);
    }
  }
