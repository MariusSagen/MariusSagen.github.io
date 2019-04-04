const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Steve{
    constructor(x,y,h,b){
        this.x = x;
        this.y = y;
        this.h = h;
        this.b = b;
    }

    beveg(){
        this.x = this.x + Math.random()*10-5;
        this.y = this.y + Math.random()*10-5;
        this.h = this.x + Math.random()*100-5;
        this.b = this.y + Math.random()*100-5;
    }

    tegn(){
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.drawImage(buscemmi, this.x, this.y, this.b, this.h);
        ctx.stroke()
    }
}

var buscemmi = new Image;
buscemmi.src = "steve buscemmi.jpg";

let steve1 = new Steve(1000,200,100,100);
let steve2 = new Steve(700,100,100,100);
let steve3 = new Steve(100,100,100,100);
let steve4 = new Steve(1000,110,100,100);
let steve5 = new Steve(500,100,100,100);
let steve6 = new Steve(100,400,100,100);
let steve7 = new Steve(1100,400,100,100);
let steve8 = new Steve(700,300,100,100);
let steve9 = new Steve(50,600,100,100);
let steve10 = new Steve(150,450,100,100);
let steve11 = new Steve(800,400,100,100);

gameloop();

function gameloop() {
    tegnBakgrunn();
    steve1.tegn();
    steve1.beveg();
    steve2.tegn();
    steve2.beveg();
    steve3.tegn();
    steve3.beveg();
    steve4.tegn();
    steve4.beveg();
    steve5.tegn();
    steve5.beveg();
    steve6.tegn();
    steve6.beveg();
    steve7.tegn();
    steve7.beveg();
    steve8.tegn();
    steve8.beveg();
    steve9.tegn();
    steve9.beveg();
    steve10.tegn();
    steve10.beveg();
    steve11.tegn();
    steve11.beveg();
    requestAnimationFrame(gameloop);
}

function tegnBakgrunn() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}