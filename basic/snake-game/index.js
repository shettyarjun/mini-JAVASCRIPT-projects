const gameboard = document.querySelector("#gamecanvas");
const scoretest = document.querySelector("#score");
const resetgame = document.querySelector("#reset");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;

const ctx = gameboard.getContext('2d');

const boardbackground = "black";
const snakecolor = "green";
const foodcolor = "yellow";
const snakeborder = "black";
const unitsize = 20;
let score = 0;
// Size of each unit of snake, also the speed of snake
let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let snake = [
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
]; // Body of the snake


window.addEventListener("keydown", changeDirection);
resetgame.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running= true;
    scoretest.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;
        return randNum;
    }
    foodX = randomFood(0, gamewidth - unitsize);
    foodY = randomFood(0, gamewidth - unitsize);
};
function drawFood(){
    ctx.fillStyle = foodcolor;
    ctx.fillRect(foodX, foodY, unitsize, unitsize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=10;
        scoretest.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }     
};
function drawSnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitsize);
    const goingDown = (yVelocity == unitsize);
    const goingRight = (xVelocity == unitsize);
    const goingLeft = (xVelocity == -unitsize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitsize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitsize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitsize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitsize;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gamewidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameheight):
                running = false;
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gamewidth / 2, gameheight / 2);
    running = false;
};
function resetGame(){
    score = 0;
    xVelocity = unitsize;
    yVelocity = 0;
    snake = [
        {x:unitsize * 3, y:0},
        {x:unitsize * 2, y:0},
        {x:unitsize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};