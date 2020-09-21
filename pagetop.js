

let widePic = document.getElementById('wide-pic');

// set 'frame rate', lower is faster
const animationSpeed = 5;




function drawDots(){

    for(var i=0;i<10000;i++){
        let xPos = Math.random()*widePic.offsetWidth;
        let yPos = Math.random()*widePic.offsetHeight;
        this.context.fillStyle = "rgba(0,0,0,1)";
        this.context.fillRect( xPos, yPos, 2, 2 );
    }
}

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
        // Loop over cells
        for (let x = 0; x < GameWorld.numColumns; x++) {
            for (let y = 0; y < GameWorld.numRows; y++) {

                // Count neighbours
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
                    // Do nothing
                    this.gameObjects[centerIndex].nextAlive = this.gameObjects[centerIndex].alive;
                }else if (numAlive == 3){
                    // Make alive
                    this.gameObjects[centerIndex].nextAlive = true;
                }else{
                    // Make dead
                    this.gameObjects[centerIndex].nextAlive = false;
                }
            }
        }

        // Apply the new state to the cells
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

        for(var i=0;i<5000;i++){
            let xPos = Math.random()*widePic.offsetWidth;
            let yPos = Math.random()*widePic.offsetHeight;
            this.context.fillStyle = 'rgba(0,0,0,'+0.00025*yPos+')';
            this.context.fillRect( xPos, yPos, 2, 2 );
        }
    }
}

window.onload = () => {
  // The page has loaded, start the game
  let gameWorld = new GameWorld('canvas');
}