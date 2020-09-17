
var gallery = document.getElementById('gallery');

console.log(gallery.offsetWidth);
var canvas = document.getElementById('portfolio-canvas');
var ctx = canvas.getContext("2d");

canvas.width = gallery.offsetWidth;
canvas.height = gallery.offsetHeight;

width = gallery.offsetWidth;
height = gallery.offsetHeight;

const numOfCircles = 60;
const maxCircleSize = 100;

testCanvas();


// run adjustments when window resized
window.addEventListener("resize",sizeStyleAdjustments);

function sizeStyleAdjustments() {

canvas.width = gallery.offsetWidth;
canvas.height = gallery.offsetHeight;

width = gallery.offsetWidth;
height = gallery.offsetHeight;

testCanvas();

}

function testCanvas(){
    for(let i=0; i<numOfCircles; i++){

        let colA = Math.random()*240;

        let red = colA/2; //Math.random()*200;
        let green = colA; //Math.random()*255;
        let blue = colA/2; //Math.random()*200;
        let opacity = Math.random()*0.4;
        color = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
    
        drawCircle(width/4+Math.random()*width/2,height/4+Math.random()*height/2,Math.random()*maxCircleSize,color);
    }
}


function drawCircle(xPos,yPos,radius,col){
    ctx.beginPath();
    ctx.arc(xPos,yPos,radius,0,2*Math.PI);
    ctx.fillStyle = col;
    ctx.fill();
}

