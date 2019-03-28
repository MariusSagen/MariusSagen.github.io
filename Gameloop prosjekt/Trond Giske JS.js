var spill = document.getElementById("spill");
var ctx = spill.getContext("2d");               //Hvor mange dimensjoner banen er i; 2
var GameOn = true;

var bane = {                //Definerer Banen
    bredde: spill.width,
    hoyde: spill.height,
    bgfarge: "lightblue"
};

var giske = {               //Definerer giske
    radius: 5,
    xpos: 100,
    ypos: 100,
    farge: "lightblue",
    xretning: -1,
    yretning: 1,
    xfart: 1,
    yfart: 1,
    bredde: 25,
    hoyde: 25
};

var giskebilde = new Image;
giskebilde.src = "vedlegg/giskegris.png";

var pepperspray = new Image;
pepperspray.src = "vedlegg/pepperspray.png";

var kvinne = new Image;
kvinne.src = "vedlegg/standing woman.png";

var racket = {              //Definerer racketen
    "bredde": 10,
    "hoyde": 40,
    "farge": "lightblue",
    "xpos": bane.bredde - 15,
    "ypos": bane.hoyde / 2,
    "yretning": 0,
    "yfart": 3
};

const latter = new Audio();        //Latter
latter.src = "OndLatter.mp3";

function tegnBane() {                                   //Oppdaterer banen
    console.log("Tegner opp banen");
    ctx.fillStyle = bane.bgfarge;
    ctx.fillRect(0, 0, bane.bredde, bane.hoyde);
}

function tegnGiske() {                                  //Oppdaterer Trond Giske
    console.log("Tegner opp Giske");
    ctx.beginPath();
    ctx.arc(giske.xpos, giske.ypos, giske.radius, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = giske.farge;
    ctx.fill();
    giske.xpos = giske.xpos + giske.xfart*giske.xretning;
    giske.ypos = giske.ypos + giske.yfart*giske.yretning;
    ctx.drawImage(giskebilde, giske.xpos - giske.hoyde/2, giske.ypos - giske.bredde/2, giske.bredde, giske.hoyde)
}

function tegnRacket() {
    console.log("Tegner opp racket");
    ctx.fillStyle= racket.farge;
    ctx.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde);
    ctx.drawImage(pepperspray, racket.xpos - racket.hoyde/1.3, racket.ypos - racket.bredde/3, racket.bredde + 60, racket.hoyde + 10);
    if (racket.ypos <= 0 && racket.yretning === -1){
        return;
    }
    if (racket.ypos + racket.hoyde >= bane.hoyde && racket.yretning === 1){
        return;
    }
    racket.ypos = racket.ypos + (racket.yfart * racket.yretning);
}

function sjekkOmGiskeTrefferVegg() {
    console.log("Sjekker om Giske treffer vegg");
    if (giske.xpos <= giske.radius){
        giske.xretning = 1;
    }
    if (giske.ypos + giske.radius >= bane.hoyde){
        giske.yretning = -1.2;
    }
    if (giske.ypos <= giske.radius){
        giske.yretning = 1.3;
    }
}

function sjekkOmGiskeTrefferRacket() {
    console.log("Sjekker om Giske treffer racket");
    var giskeErTilVenstre = giske.xpos + giske.radius < racket.xpos;
    var giskeErTilHoyre = giske.xpos - giske.radius > racket.xpos + racket.bredde;
    var giskeErOver = giske.ypos + giske.radius < racket.ypos;
    var giskeErUnder = giske.ypos - giske.radius > racket.ypos + racket.hoyde;
    if (!giskeErTilVenstre && !giskeErTilHoyre && !giskeErOver && !giskeErUnder){
        giske.xretning = -1;
        giske.xfart += 0.5;
        giske.yfart += 0.5;
    }
}

function sjekkOmGiskeTrefferJente() {
    console.log("Sjekker om Giske treffer jente");
    if (giske.xpos > bane.bredde + giske.radius*2) {
        GameOn = false;
        latter.play();
        setTimeout(function (){
            document.body.appendChild(document.createElement('p'));
            document.querySelector("body p:last-child").id = "gameover";
            document.getElementById("gameover").innerHTML = "DU HAR BLITT TAFSET PÅ!";
        }, 3000);
    }
}

document.onkeydown = function (evt) {
    var tastekode = evt.keyCode;
    if (tastekode === 38){
        racket.yretning = -1;
    }
    if (tastekode === 40){
        racket.yretning = 1;
    }
};

document.onkeyup = function (evt) {
    var tastekode = evt.keyCode;
    if (tastekode === 38 && racket.yretning === -1){
        racket.yretning = 0;
    }
    if (tastekode === 40 && racket.yretning === 1){
        racket.yretning = 0;
    }
};

function gameLoop() {
    tegnBane();
    tegnGiske();
    tegnRacket();
    sjekkOmGiskeTrefferVegg();
    sjekkOmGiskeTrefferRacket();
    sjekkOmGiskeTrefferJente();
    if (GameOn){
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();