var spill = document.getElementById("spill");
var ctx = spill.getContext("2d");
var GameOn = true;

var bane = {
    bredde: spill.width,
    hoyde: spill.height,
    bgfarge: "lightblue"
};

var giske = {
    radius: 5,
    xpos: 100,
    ypos: 100,
    farge: "yellow",
    xretning: -1,
    yretning: 1,
    xfart: 4,
    yfart: 4
};

var racket = {
    "bredde": 10,
    "hoyde": 50,
    "farge": "White",
    "xpos": bane.bredde - 15,
    "ypos": bane.hoyde / 2,
    "yretning": 0,
    "yfart": 5
};

var latter = new Audio();
latter.src = "OndLatter.mp3";

function tegnBane() {
    console.log("Tegner opp banen");
    ctx.fillStyle = bane.bgfarge;
    ctx.fillRect(0, 0, bane.bredde, bane.hoyde);
}

function tegnGiske() {
    console.log("Tegner opp Giske");
    ctx.beginPath();
    ctx.arc(giske.xpos, giske.ypos, giske.radius, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = giske.farge;
    ctx.fill();
    giske.xpos = giske.xpos + giske.xfart*giske.xretning;
    giske.ypos = giske.ypos + giske.yfart*giske.yretning;
}

function tegnJente() {
    console.log("Tegner opp jente");
}

function tegnRacket() {
    console.log("Tegner opp racket");
    ctx.fillStyle= racket.farge;
    ctx.fillRect(racket.xpos, racket.ypos, racket.bredde, racket.hoyde);
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
        giske.yretning = -1;
    }
    if (giske.ypos <= giske.radius){
        giske.yretning = 1;
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
    }
}

function sjekkOmGiskeTrefferJente() {
    console.log("Sjekker om Giske treffer jente");
    if (giske.xpos > bane.bredde + giske.radius*2) {
        GameOn = false;
        latter.play();
        setTimeout(function (){document.write("DU HAR BLITT TAFSET PÅ!!!");}, 3000);
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
    tegnJente();
    tegnRacket();
    sjekkOmGiskeTrefferVegg();
    sjekkOmGiskeTrefferRacket();
    sjekkOmGiskeTrefferJente();
    if (GameOn){
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();