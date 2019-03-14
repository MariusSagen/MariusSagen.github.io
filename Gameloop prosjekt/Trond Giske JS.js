var spill = document.getElementById("spill");
var ctx = spill.getContext("2d");
var GameOn = true;
var giske = document.getElementById("giske");


function tegnBane() {
    console.log("Tegner opp banen")
}
function tegnGiske() {
    console.log("Tegner opp Giske")
}
function tegnJente() {
    console.log("Tegner opp jente")
}
function tegnHånd() {
    console.log("Tegner opp vegg")
}
function sjekkOmGiskeTrefferVegg() {
    console.log("Sjekker om Giske treffer vegg")
}
function sjekkOmGiskeTrefferHånd() {
    console.log("Sjekker om Giske treffer hånd")
}
function sjekkOmBallTrefferJente() {
    console.log("Sjekker om Giske treffer jente")
}


function gameLoop() {
    tegnBane();
    tegnGiske();
    tegnJente();
    tegnHånd();
    sjekkOmGiskeTrefferVegg();
    sjekkOmGiskeTrefferHånd();
    sjekkOmBallTrefferJente();
    if (GameOn){
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();


var giske = {
    radius: 8,
    xpos: 300,
    ypos: 300,
    farge: "yellow",
}