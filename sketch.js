
let dusmanAtesControl=0;
let dusmanGemiControl=0;
let carpmaControl=0;
let musControl=0;

let enemyFire=[];
let heroFire=[];
let dalga = [];
let tas=[];
let enemyGalleons=[];

let baslik;
let tuslar=[4];
let tasResmi=[4];
var mSeaOfThieves,mCarPirate,mYelkenlerBic;
let patlama;

let tasDongusu,dalgaDongusu;

let tempPuan=0;
let record=0;
let scoreText="NEW RECORD";
let puan=0;
let heroGalleon;
let dalgaMesafe = 35;
let dalgaHizi =10;
let tasHizi=dalgaHizi;
let tasMesafe=250;
var mainMenu=1;

function preload(){
  tasResmi[0]=loadImage('assets/rock1.png');
  tasResmi[1]=loadImage('assets/rock2.png');
  tasResmi[2]=loadImage('assets/rock3.png');
  tasResmi[3]=loadImage('assets/rock4.png');
  tuslar[0]=loadImage('assets/enter.png');
  tuslar[1]=loadImage('assets/A.jpg');
  tuslar[2]=loadImage('assets/D.jpg');
  tuslar[3]=loadImage('assets/updownleftright1.png');
  baslik=loadImage('assets/baslik2.png');
  mSeaOfThieves=loadSound('assets/seaofthieves.mp3');
  mCarPirate=loadSound('assets/karayipkorsan.mp3');
  mYelkenlerBic=loadSound('assets/yelkenlerBiç.mp3');
  patlama=loadSound('assets/patlama.mp3');
  
}

function setup(){
  createCanvas(600, 950);
  dalgaSayisi = height / dalgaMesafe;
  tasSayisi=height/tasMesafe;
  patlama.setVolume(0.20);
  mSeaOfThieves.setVolume(0.20);
  mCarPirate.setVolume(0.20);
  mYelkenlerBic.setVolume(0.20);
}

function draw(){
  background(27, 183, 245);
  
  if(mainMenu){
    background(21,161,158);
    push();
    imageMode(CENTER);
    image(baslik,280,95);
    fill(0, 138, 25);
    stroke(111, 47, 122);
    strokeWeight(20);
    rectMode(CENTER);
    rect(300,400,480,450,25);
    pop();
    heroGalleon=new Kalyon(300,800,1,100);
    push();
    textAlign(CENTER);
    imageMode(CENTER);
    image(tuslar[3],425,285);
    image(tuslar[1],400,380);
    image(tuslar[2],460,380);
    push();
    textSize(20);
    fill('white');
    text("'FOR MOVE USE ARROWS'",210,290);
    text("'FOR FİRE TO\n LEFT AND RİGHT USE A and D'",220,370);
    pop();
    textSize(30);
    image(tuslar[0],285,565,90,35);
    push();
    textSize(35);
    fill('purple');
    if(puan>0)text(scoreText,300,670);
    if(scoreText=="YOUR SCORE"){
      text("LAST RECORD",300,900);
      push();
      fill('red');
      text(record,300,940);
      pop();
    }
    fill('red');
    textSize(40);
    if(puan>0)text(puan,300,720);
    pop();
    fill('white');
    text("'FOR MUSİC PRESS NUMS'",300,525);
    text("'PRESS ",175,575);
    text("TO START'",420,575);
    pop();
    //text("X=" + mouseX + "Y=" + mouseY, 10, 10);
  }
  else if(!mainMenu){
    dalgayiYazYadaSil();
    tasiYazYadaSil();
    push();
    textSize(25);
    text("AMMO:"+heroGalleon.ammo,450,80);
    pop();
    heroGalleon.yonTuslari();
    carpmaKontrol();
    heroGalleon.canGoster();
    heroGalleon.puanGoster();
    dusmanGemisiOlustur();
    dusmanAtesi();
    kahramanAtesi();
    gemiCarpismasi();
    
  }
  heroGalleon.draw();
  

  
}

class Dalga {
  constructor(dalgaHizi){
    this.dalgaHizi = dalgaHizi;
    this.x = random(-30,600);
    this.y = 0;
    this.durum = true;
  }
  draw(){
    push()
    noFill();
    stroke(230, 233, 235);
    strokeWeight(2);
    beginShape();
    vertex(this.x, this.y);
    vertex(this.x + 5, this.y - 5);
    vertex(this.x + 10, this.y);
    vertex(this.x + 15, this.y - 6);
    vertex(this.x + 20, this.y);
    vertex(this.x + 25, this.y - 5);
    vertex(this.x + 30, this.y);
    endShape();
    beginShape();
    vertex(this.x, this.y-4);
    vertex(this.x + 5, this.y - 5-4);
    vertex(this.x + 10, this.y-4);
    vertex(this.x + 15, this.y - 6-4);
    vertex(this.x + 20, this.y-4);
    vertex(this.x + 25, this.y - 5-4);
    vertex(this.x + 30, this.y-4);
    endShape();
    beginShape();
    vertex(this.x, this.y-8);
    vertex(this.x + 5, this.y - 5-8);
    vertex(this.x + 10, this.y-8);
    vertex(this.x + 15, this.y - 6-8);
    vertex(this.x + 20, this.y-8);
    vertex(this.x + 25, this.y - 5-8);
    vertex(this.x + 30, this.y-8);
    endShape();
    pop();
    this.y += this.dalgaHizi;
    if (this.y >= height+10) this.durum = false;
  }
}
class Kalyon{
  constructor(x,y,hero,can){
    this.can=can;
    this.x=x;
    this.y=y;
    this.colorRand=int(random(0,7));
    this.color=color(212, 131, 74);
    this.hero=hero;
    this.carpmaCemberi = 70;
    this.ammo=40;
  }
  draw(){
    if(!this.hero){
      if(this.colorRand==0)this.color=color(5, 102, 115);
      if(this.colorRand==1)this.color=color(5, 168, 49);
      if(this.colorRand==2)this.color=color(143, 148, 4);
      if(this.colorRand==3)this.color=color(148, 54, 4);
      if(this.colorRand==4)this.color=color(4, 93, 125);
      if(this.colorRand==5)this.color=color(84, 5, 83);
      if(this.colorRand==6)this.color=color(99, 2, 23);
    }
    push();
    fill(22, 12, 33);
    translate(this.x,this.y);
    if(!this.hero)rotate(PI);
    rect(-24,-35,30,10,4);
    rect(-30,-15,30,10,4);
    rect(-30,5,30,10,4);
    rect(-24,25,30,10,4);
    rect(0,-35,24,10,4);
    rect(0,-15,30,10,4);
    rect(0,5,30,10,4);
    rect(0,25,24,10,4);
    stroke(148, 98, 62);
    strokeWeight(4);
    fill(this.color);
    curve(-175,-10,0,-50,0,50,-175,10);
    curve(175,-10,0,-50,0,50,175,10);
    strokeWeight(1);
    fill(148, 98, 62);
    rect(-30,-20,60,5);
    rect(-30,+15,60,5);
    if(this.hero)fill(242, 239, 237);
    else fill(0);
    curve(0,80,-30,-20,30,-20,0,80);
    curve(0,115,-30,15,30,15,0,115);
    pop();
    if(!this.hero)this.y+=dalgaHizi;
  }
  puanGoster(){
    push()
    fill(143, 27, 85)
    textAlign(CENTER)
    textSize(20);
    text("POINTS",120,30);
    fill(255, 225, 0)
    textSize(50);
    text(tempPuan,120,75);
    pop();
  }
  yonTuslari(){
    if(this.hero){
      if(keyIsDown(LEFT_ARROW)){
        if(this.x-33>0)this.x -= 5;
      }
      if(keyIsDown(RIGHT_ARROW)){
        if(this.x+33<width)this.x += 5;
      }
      if (keyIsDown(UP_ARROW)){
        if(this.y-55>0)this.y -= 5;
      }
      if (keyIsDown(DOWN_ARROW)){
        if(this.y+55<height)this.y += 5;
      }
    }
  }
  canGoster(){
  push()
  rectMode(CENTER);
  fill('red')
  rect(440,30,310,40,15);
  fill('green');
  rect((440-((100-this.can)*1.5)),30,this.can*3,30,15);
  textSize(35);
  fill('black')
  text("HP:",225,45);
  textAlign(CENTER);
  text(this.can+"/100",440,42)
  pop();
  if(this.can<=0){
      musControl=1;
      mainMenu=true;
      tas.splice(0);
      dalga.splice(0);
      enemyFire.splice(0);
      dusmanAtesControl=0;
      enemyGalleons.splice(0);
      if(record<tempPuan){
        record=tempPuan;
        scoreText="NEW RECORD";
      }
      else{
        scoreText="YOUR SCORE";
      }
      puan=tempPuan;
      tempPuan=0;
      clearTimeout(dalgaDongusu);
      clearTimeout(tasDongusu);
      dusmanGemiControl=0;
      //mSeaOfThieves.stop();
      //mCarPirate.stop();
      //mYelkenlerBic.stop();
    }
  }
}
class DusmanTopu{
  constructor(x,y,targetX,targetY){
    this.ballX=0;
    this.ballY=0;
    this.x=x;
    this.y=y;
    this.targetX=targetX;
    this.targetY=targetY;
    this.topCapi=10;
    this.topHizi=5;
    this.solGuverte=int(random(0,4));
    this.sagGuverte=int(random(0,4));
    this.topMenzili=500;
    
  }
  draw(){
    push();
    fill(0);
    if((this.x-this.targetX)>0){
      if(this.solGuverte==0)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==1)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==2)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==3)circle(this.ballX,this.ballY,this.topCapi);
      this.targetX-=this.topHizi;
      this.ballX-=this.topHizi;
      this.topMenzili-=this.topHizi;
    }
    else if((this.x-this.targetX)<(0)){
      if(this.sagGuverte==0)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==1)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==2)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==3)circle(this.ballX,this.ballY,this.topCapi);
      this.ballX+=this.topHizi;
      this.targetX+=this.topHizi;
      this.topMenzili-=this.topHizi;
    }
    pop();
  }
  carpmaKontrol(){
    if((heroGalleon.carpmaCemberi/2+enemyFire[0].topCapi/2)>=dist(enemyFire[0].ballX,enemyFire[0].ballY,heroGalleon.x,heroGalleon.y)){
      heroGalleon.can-=10;
      carpmaControl=1;
    }
  }
}
class KahramanTopu{
  constructor(x,y,sagMıSolMu){
    this.x=x;
    this.y=y;
    this.ballX=50;
    this.ballY=50;
    this.sagGuverte=int(random(0,4));
    this.solGuverte=int(random(0,4));
    this.topCapi=12;
    this.topHizi=25;
    this.topMenzili=300;
    this.sagMıSolMu=sagMıSolMu;
    this.yokOl=0;
  }
  sagAtes(){
    if(!this.sagMıSolMu){
    push();
    fill(0);
      if(this.solGuverte==0)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==1)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==2)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.solGuverte==3)circle(this.ballX,this.ballY,this.topCapi);
      this.ballX-=this.topHizi;
      this.topMenzili-=this.topHizi;
    pop();
    }
  }
  solAtes(){
    if(this.sagMıSolMu){
    push();
    fill(0);
      if(this.sagGuverte==0)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==1)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==2)circle(this.ballX,this.ballY,this.topCapi);
      else if(this.sagGuverte==3)circle(this.ballX,this.ballY,this.topCapi);
      this.ballX+=this.topHizi;
      this.topMenzili-=this.topHizi;
    pop();
    }
  }
  isabet(){
    if(dusmanGemiControl){
      if((this.topCapi/2+enemyGalleons[0].carpmaCemberi/2)>=dist(this.ballX,this.ballY,enemyGalleons[0].x,enemyGalleons[0].y)){
        enemyGalleons.splice(0,1);
        dusmanGemiControl=0;
        this.yokOl=1;
        tempPuan+=10;
        if(heroGalleon.can<100)heroGalleon.can+=5;
      }
    }
  }
}
class Tas{
  constructor(tasHizi){
    this.tasHizi=tasHizi;
    this.x=random(0,600);
    this.y=-100;
    this.tasCesidi=int(random(0,4));
    this.durum=true;
    this.carpmaCemberi=100;
    if(this.tasCesidi==2 || this.tasCesidi==3)this.carpmaCemberi = 40;
    else if(this.tasCesidi==1)this.carpmaCemberi=60;
    else this.carpmaCemberi=50;
    this.parcalandi=0; 
  }
  draw(){
    push();
    imageMode(CENTER)
    if(!this.parcalandi){
      if(this.tasCesidi==0)image(tasResmi[this.tasCesidi],this.x,this.y,70,70);
      else if(this.tasCesidi==1)image(tasResmi[this.tasCesidi],this.x,this.y,120,90);
      else image(tasResmi[this.tasCesidi],this.x,this.y,75,70);
    }
    pop();
    this.y+=this.tasHizi;
    if(this.y>=height+50){
      this.durum=false;
      if(!mainMenu){
        tempPuan+=1;
        if((tempPuan+1)%15==0){
        dusmanGemiControl=1;
        enemyGalleons[0]=new Kalyon(random(30,470),-50,0,25);
        }
      }
    }
  }
  carpma(galleonHero,galleonEnemy){
    if((galleonHero.carpmaCemberi/2 + this.carpmaCemberi/2) >= dist(galleonHero.x,galleonHero.y,this.x,this.y) && this.parcalandi==0){
      this.parcalandi=1;
      galleonHero.can-=10;
    }
    if(dusmanGemiControl){
      if((galleonEnemy[0].carpmaCemberi/2 + this.carpmaCemberi/2) >= dist(galleonEnemy[0].x,galleonEnemy[0].y,this.x,this.y) && this.parcalandi==0){
        this.parcalandi=1;
        galleonEnemy[0].can-=10;
      }
    }
  }
}

function tasOlustur(){
  tas[tas.length]=new Tas(tasHizi);
  tasDongusu = setTimeout(function() { tasOlustur()}, (tasMesafe/(60*tasHizi))*1000);
}
function tasiYazYadaSil(){
  for(let j = 0; j < tas.length; j++){
    tas[j].draw();
  }
  for(let i = 0; i < tas.length; i++) {
    if(!tas[i].durum){
      tas.splice(i,1);
    }
  }
}

function dalgaOlustur() {
  dalga[dalga.length] = new Dalga(dalgaHizi);
  dalgaDongusu = setTimeout(function() { dalgaOlustur()}, (dalgaMesafe/(60*dalgaHizi))*1000);
}
function dalgayiYazYadaSil(){
  for(let j = 0; j < dalga.length; j++){
    dalga[j].draw();
  }
  for(let i = 0; i < dalga.length; i++){
    if (!dalga[i].durum) {
      dalga.splice(i,1);
    }
  }
}

function carpmaKontrol(){
  for(let i = 0; i < tas.length; i++){
    tas[i].carpma(heroGalleon,enemyGalleons);
  }
}

function dusmanGemisiOlustur(){
  if(dusmanGemiControl){
      enemyGalleons[0].draw();
      if(enemyGalleons[0].y-500>=height){
        enemyGalleons.splice(0,1);
        dusmanGemiControl=0;
      }
    }
}
function dusmanAtesi(){
  if(dusmanGemiControl && !dusmanAtesControl){
    if(abs(enemyGalleons[0].y-heroGalleon.y)<=20){
      enemyFire[0]= new DusmanTopu(enemyGalleons[0].x,enemyGalleons[0].y,heroGalleon.x,heroGalleon.y);
      if(enemyFire[0].x-enemyFire[0].targetX>30){
        if(enemyFire[0].solGuverte==0){enemyFire[0].ballX=enemyFire[0].x-30;enemyFire[0].ballY=enemyFire[0].y-30;}
        else if(enemyFire[0].solGuverte==1){enemyFire[0].ballX=enemyFire[0].x-35;enemyFire[0].ballY=enemyFire[0].y-10;}
        else if(enemyFire[0].solGuverte==2){enemyFire[0].ballX=enemyFire[0].x-35;enemyFire[0].ballY=enemyFire[0].y+10;}
        else if(enemyFire[0].solGuverte==3){enemyFire[0].ballX=enemyFire[0].x-30;enemyFire[0].ballY=enemyFire[0].y+30;}
      }
      if(enemyFire[0].x-enemyFire[0].targetX<(-30)){
        if(enemyFire[0].sagGuverte==0){enemyFire[0].ballX=enemyFire[0].x+30;enemyFire[0].ballY=enemyFire[0].y-30;}
        else if(enemyFire[0].sagGuverte==1){enemyFire[0].ballX=enemyFire[0].x+35;enemyFire[0].ballY=enemyFire[0].y-10;}
        else if(enemyFire[0].sagGuverte==2){enemyFire[0].ballX=enemyFire[0].x+35;enemyFire[0].ballY=enemyFire[0].y+10;}
        else if(enemyFire[0].sagGuverte==3){enemyFire[0].ballX=enemyFire[0].x+30;enemyFire[0].ballY=enemyFire[0].y+30;}
      }
      dusmanAtesControl=1;
      patlama.play();
    }
  }
  if(dusmanAtesControl){
    enemyFire[0].draw();
    enemyFire[0].carpmaKontrol();
    if(enemyFire[0].topMenzili==0 || carpmaControl){
      enemyFire.splice(0,1);
      carpmaControl=0;
      dusmanAtesControl=0;
    }
  }
}

function kahramanAtesi(){
  for(let i=0;i<heroFire.length;i++){
    heroFire[i].sagAtes();
    heroFire[i].solAtes();
    heroFire[i].isabet();
    if(heroFire[i].yokOl==1)heroFire.splice(i,1);
    else if(heroFire[i].topMenzili==0){
      heroFire.splice(i,1);
      
    }
  }
}
function gemiCarpismasi(){
  if(dusmanGemiControl){
    if((heroGalleon.carpmaCemberi/2+enemyGalleons[0].carpmaCemberi/2)>=dist(heroGalleon.x,heroGalleon.y,enemyGalleons[0].x,enemyGalleons[0].y)){
      enemyGalleons.splice(0,1);
      dusmanGemiControl=0;
      heroGalleon.can-=30;
      tempPuan+=10;
    }
  }
}

function keyPressed(){
  if(mainMenu){
    if(keyCode===ENTER){
      mainMenu=false;
      heroGalleon=new Kalyon(300,800,1,100);
      enemyGalleons[0]=new Kalyon(random(30,470),0,0,25);
      if(!mainMenu){
        dalgaOlustur();
        tasOlustur();
      }
      if(musControl!=1){
        mSeaOfThieves.loop();
        musControl=1;
      }
    }
  }
  if(!mainMenu){
  if(keyCode===49){
      if(musControl!=1){
        mSeaOfThieves.stop();
        mSeaOfThieves.loop();
        mCarPirate.stop();
        mYelkenlerBic.stop();
        musControl=1;
      }
    }
  
  if(keyCode===50){
    if(musControl!=2){
      mCarPirate.loop();
      mSeaOfThieves.stop();
      mSeaOfThieves.stop();
      mYelkenlerBic.stop();
      musControl=2;
    }
  }
  if(keyCode===51){
    if(musControl!=3){
      mCarPirate.stop();
      mSeaOfThieves.stop();
      mYelkenlerBic.loop();
      musControl=3;
    }
  }
  if(keyCode===65){
      if(heroGalleon.ammo>0){
    patlama.play();
    heroFire[heroFire.length]= new KahramanTopu(heroGalleon.x,heroGalleon.y,0);
    if(heroFire[heroFire.length-1].solGuverte==0){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x-30;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y-30;
    }
    else if(heroFire[heroFire.length-1].solGuverte==1){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x-35;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y-10;
    }
    else if(heroFire[heroFire.length-1].solGuverte==2){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x-35;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y+10;
    }
    else if(heroFire[heroFire.length-1].solGuverte==3){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x-30;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y+30;
    }
        heroGalleon.ammo--;
      } 
  }
  if(keyCode===68){
    if(!mainMenu){
      if(heroGalleon.ammo>0){
    patlama.play();
    heroFire[heroFire.length]= new KahramanTopu(heroGalleon.x,heroGalleon.y,1);
    if(heroFire[heroFire.length-1].sagGuverte==0){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x+30;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y-30;
    }
    else if(heroFire[heroFire.length-1].sagGuverte==1){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x+35;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y-10;
    }
    else if(heroFire[heroFire.length-1].sagGuverte==2){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x+35;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y+10;
    }
    else if(heroFire[heroFire.length-1].sagGuverte==3){
      heroFire[heroFire.length-1].ballX=heroFire[heroFire.length-1].x+30;
      heroFire[heroFire.length-1].ballY=heroFire[heroFire.length-1].y+30;
    }
        heroGalleon.ammo--;
      }
    }
  }
  }
}
