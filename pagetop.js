///////////////////////////////////////
// Add current time to page Footer

// Store a pointer to the .clock element
const clock = document.querySelector('.clock');

// Write the date and time to the page
const tickTock = () => {

    // Get unformatted Date
    const currentTime = new Date();

    // Get Date
    const date = currentTime.toDateString();

    // Get current hours,minutes,seconds
    const hours = currentTime.getHours()
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Build time string including leading zeroes
    var writeTime = `${date} - `;
    if (hours<10) {writeTime += "0";}
        writeTime += hours + ":";
    if (minutes<10) {writeTime += "0";}
        writeTime += minutes + ":";
    if (seconds<10) {writeTime += "0";}
        writeTime += seconds;

    // Inject time string into .clock element
    clock.innerHTML = writeTime;

}

// Call tickTock on page load, so time appears immediately
tickTock();

// Then call tickTock every 1000ms, so time updates every second
setInterval(tickTock, 1000)







// grab width of photograph to use for canvas overlay
let widePic = document.getElementById('wide-pic');

// set 'frame rate', lower is faster
const animationSpeed = 5;






// create cell class
class Cell
{
    // does not work as var or const
    static width = 10;
    static height = 10;

    constructor (context, gridX, gridY)
    {
        this.context = context;


        // set canvas context composite mode
        this.context.globalCompositeOperation = 'destination-over';


        // Store the position of this cell in the grid
        this.gridX = gridX;
        this.gridY = gridY;

        // starting seed - each cell has 50% chance of starting alive
        this.alive = Math.random() > 0.5;
    }

    draw() {
        // draw alive cells with opacity relative to gridY position
        this.context.fillStyle = this.alive?'rgba(0,0,0,'+0.0075*this.gridY+')':'rgba(0,0,0,0)';
        this.context.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height);
    }
}

class GameWorld {

    static numColumns = 150;
    static numRows = 150;
    

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.gameObjects = [];

        this.createGrid();

        // call gameLoop() via animation frame request
        window.requestAnimationFrame(() => this.gameLoop());
    }

    createGrid()
    {
        for (let y = 0; y < GameWorld.numRows; y++) {
            for (let x = 0; x < GameWorld.numColumns; x++) {
                this.gameObjects.push(new Cell(this.context, x, y));
            }
        }
    }

    isAlive(x, y)
    {
        if (x < 0 || x >= GameWorld.numColumns || y < 0 || y >= GameWorld.numRows){
            return false;
        }

        return this.gameObjects[this.gridToIndex(x, y)].alive?1:0;
    }

    gridToIndex(x, y){
        return x + (y * GameWorld.numColumns);
    }

    checkSurrounding ()
    {
        // loop over cells
        for (let x = 0; x < GameWorld.numColumns; x++) {
            for (let y = 0; y < GameWorld.numRows; y++) {

                // count live neighbours
                let numAlive =  this.isAlive(x - 1, y - 1) + 
                                this.isAlive(x, y - 1) + 
                                this.isAlive(x + 1, y - 1) + 
                                this.isAlive(x - 1, y) + 
                                this.isAlive(x + 1, y) + 
                                this.isAlive(x - 1, y + 1) + 
                                this.isAlive(x, y + 1) + 
                                this.isAlive(x + 1, y + 1);

                let centerIndex = this.gridToIndex(x, y);

                if (numAlive == 2){
                    // cell stays the same
                    this.gameObjects[centerIndex].nextAlive = this.gameObjects[centerIndex].alive;
                }else if (numAlive == 3){
                    // cell becomes alive
                    this.gameObjects[centerIndex].nextAlive = true;
                }else{
                    // cell becomes dead
                    this.gameObjects[centerIndex].nextAlive = false;
                }
            }
        }

        // switch cells state to next frame
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].alive = this.gameObjects[i].nextAlive;
        }
    }

    gameLoop() {

        

        this.canvas.width = widePic.offsetWidth;
        this.canvas.height = widePic.offsetHeight;

        this.canvas.style.left = '0';
        this.canvas.style.top = `-${this.canvas.height+6}px`;

        

        // calculate number of neighbours
        this.checkSurrounding();

        // rotate canvas 2 degrees when wider screen detected
        if(this.canvas.width>720){
            this.context.rotate(-2*Math.PI/180);
        }

        // clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw the cells
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // The loop function has reached it's end, keep requesting new frames
        setTimeout( () => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, animationSpeed)


        // //draw noise
        // for(var i=0;i<5000;i++){
        //     let xPos = Math.random()*widePic.offsetWidth;
        //     let yPos = Math.random()*widePic.offsetHeight;
        //     this.context.fillStyle = 'rgba(0,0,0,'+0.00025*yPos+')';
        //     this.context.fillRect( xPos, yPos, 2, 2 );
        // }

    }
}

window.onload = () => {
  // start conway animation on page load
  // check if toggled on
 //let gameWorld = new GameWorld('canvas');
}