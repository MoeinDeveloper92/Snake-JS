const gameBoard = document.querySelector('#gameBoard');//it is the canvas
const ctx = gameBoard.getContext('2d');//applying context on the canvas for using specific funciton
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
//here we should declare a varibale which hold width and height of the container
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
//bear in mind, height and width are attribute which we have already mentioned them on html document
const boardBackground = 'white';
const snakeColor = 'lightgreen';
const snakeBorder = 'black';
const foodColor = 'red';
//we should specify the unitSize of everything within our application
const unitSize = 25;//each tick everything would change 25px
let running = false//we use it to figure out whether the game is running or not
let xVelocity = unitSize; // it indicates how far we move along the x axis
//bear in mind, if xvelocity is a positive number we move to the right otherwise we moove to the left
let yVelocity = 0;//that means we are not moving up or down, however, once we wantd to go up or down it should be passed a number



//herer we need to cordinates our food
let foodX;
let foodY;//where our food should be placed
let score = 0;
//bear in mind, our snake should be an array of objects, it means each body part should be a unique object with unique attributes
let snake = [//this is like state in the React//this is state on the componenet
    { x: unitSize * 3, y: 0 },//here my component is my Snake and its state is its coordinates
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }//this is my tail part which begins from the top left corner
]


///////so I have mentioned all required varibales in the JS document
window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart();


function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();//FoodX and foodY has already be determined in createFood
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 80);
    }
    else {
        displayGameOver();
    }
};
function clearBoard() {
    ctx.fillStyle = boardBackground;//the color of the canvas
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood() {
    //here we should have an inner function to create not only food but also position it randomly within the canvas
    //in order to implement this we need to use a function for generating a random positon for my food
    function ranFood(min, max) {
        const randNum = Math.round(Math.random() * (max - min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = ranFood(0, (gameWidth - unitSize));
    foodY = ranFood(0, (gameHeight - unitSize));
};
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake() {
    const head = {//this is like this.setState
        x: snake[0].x + xVelocity,//x and yVelocity are in prallel of the unitsize
        y: snake[0].y + yVelocity
    }
    snake.unshift(head);//add it to the beginig of the snake
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((mysnake) => {
        ctx.fillRect(mysnake.x, mysnake.y, unitSize, unitSize);
        ctx.strokeRect(mysnake.x, mysnake.y, unitSize, unitSize);
    })
};
function changeDirection(e) {//we invoke this functon whenever we press a button
    const keyPressed = e.key;
    
    const LEFT = 'ArrowLeft';
    const RIGHT = 'ArrowRight';
    const UP = 'ArrowUp';
    const DOWN = 'ArrowDown';
    const goingUp = (yVelocity == -unitSize);
   
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    console.log(goingRight);
    //here we should check to see in which direction we move
    if (keyPressed === LEFT && !goingRight) {
        xVelocity = -unitSize;
        yVelocity = 0;
    }
    else if (keyPressed === RIGHT && !goingLeft) {
        xVelocity = unitSize;
        yVelocity = 0;
    } else if (keyPressed === UP && !goingDown) {
        yVelocity = -unitSize;
        xVelocity = 0;
    } else if (keyPressed === DOWN && !goingUp) {
        yVelocity = unitSize;
        xVelocity = 0;
    }
};
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;

    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            running = false;
            displayGameOver();
        }
    }
};
function displayGameOver() {
    ctx.font = '50px MV Boli';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', gameWidth / 2, gameHeight / 2);
    running = false;
};
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = unitSize;
    snake = [
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ]
    gameStart();
};


