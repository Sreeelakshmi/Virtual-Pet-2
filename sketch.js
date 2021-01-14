//Create variables here
var dog, happyDog, database, foodS, foodStock,dogI,happyDogI,food,feed,addFood,lastFed,foodObj

function preload()
{
  //load images here
  dogI=loadImage("dogImg.png")
  happyDogI=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(dogI);
  dog.scale=0.15;
  foodObj=new Food();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20);
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background("blue");
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last feed :",+ lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last feed : 12 PM",350,30);
}
else {
text("Last feed :"+lastFed+"AM,350,30")
}

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogI);
}
  drawSprites();
  fill(255,255,254);
  stroke("black")
  text("Food Remaining"+foodS,170,200);
  textSize(13);
  text("Press Up Arrow To feed the dog",130,10,300,20);

  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({food:x})
}
function feedDog(){
  dog.addImage(happyDogI);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}