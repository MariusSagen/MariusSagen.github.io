const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Figur{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    beveg(){
        this.x = this.x + Math.random()*10-5;
        this.y = this.y + Math.random()*10-5;
    }

    tegn(){
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.stroke()
    }
}

class Bubble extends Figur{
    constructor(x,y,r){
        super(x,y,r);
    }
}

class Firkant extends Figur{
    constructor(x,y,r){
        super(x,y,r);
    }

}

let boble1 = new Bubble(100,200,50);
let boble2 = new Bubble(300,500,50);
let firkant1 = new Firkant(300,500,50);
let firkant2 = new Firkant(300,500,50);

gameloop();

function gameloop() {
    tegnBakgrunn();
    boble1.tegn();
    boble1.beveg();
    boble2.tegn();
    boble2.beveg();
    firkant1.tegn();
    firkant1.beveg();
    firkant2.tegn();
    firkant2.beveg();
    requestAnimationFrame(gameloop);
}

function tegnBakgrunn() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}