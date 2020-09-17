// declare seed to be use with
// seeded random using hi-freq sine
let seed = 241;

let projectNumber = 18;



// grab gallery container element
const gallery = document.getElementById('gallery');

let projectLabel = document.getElementById('info');



// grab canvas element
let canvas = document.getElementById('portfolio-canvas');
let ctx = canvas.getContext("2d");

// set width and height of canvas
canvas.width = 450;
canvas.height = gallery.offsetHeight;
width = gallery.offsetWidth;
height = gallery.offsetHeight;


const numOfCircles = 8;
const maxCircleSize = 200;
testCanvas();

let prev = document.getElementById('prev');
let next = document.getElementById('next');

prev.addEventListener("click", prevProject);
next.addEventListener("click", nextProject);


ctx.save();




// run adjustments when window resized
window.addEventListener("resize",sizeStyleAdjustments);

function sizeStyleAdjustments() {
    
    ctx.restore();

    

    let canvas = document.getElementById('portfolio-canvas');
    let ctx = canvas.getContext("2d");

    canvas.width = gallery.offsetWidth;
    canvas.height = gallery.offsetHeight;

    width = gallery.offsetWidth;
    height = gallery.offsetHeight;


    let deviceThreshold = 750;
    let widthFactor = (window.innerWidth-deviceThreshold)/7;

    // scale opacity of navbar to screenwidth
    // using rgba as opacity affected child elements
    let navBar = document.getElementById('big-nav');
    navBar.style.backgroundColor = `rgba(0, 255, 0, ${widthFactor}%)`;




}

function testCanvas(){
    for(let i=0; i<numOfCircles; i++){

        let red = random()*180; 
        let green = random()*240;
        let blue = random()*180;
        let opacity = random()*0.1;
        color = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
    
        drawCircle(width/4+random()*width/2,height/4+random()*height/2,random()*maxCircleSize,color);
    }


}


function drawCircle(xPos,yPos,radius,col){
    ctx.beginPath();
    ctx.arc(xPos,yPos,radius,0,2*Math.PI);
    ctx.fillStyle = col;
    ctx.fill();
}

function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function prevProject() {
    // dummy
    projectNumber -= 1;
    projectLabel.innerHTML = `project: ${projectNumber}`;
    ctx.clearRect(0,0,width,height);
    testCanvas();
}


function nextProject() {
    //dummy
    projectNumber += 1;
    projectLabel.innerHTML = `project: ${projectNumber}`;
    ctx.clearRect(0,0,width,height);
    testCanvas();
}