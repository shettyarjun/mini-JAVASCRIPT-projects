const gameboard = document.querySelector("#pong");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#reset");
const gamewidth = gameboard.width;
const gameheight = gameboard.height;
const borderbackground = "black";
const paddle1color = "black";
const paddle2color = "black";
const paddleborder = "white";
const ballcolor = "white";
const ballbordercolor = "black";
const ballRadius = 13;
const paddleSpeed = 60;
let interval;
let ballSpeed;
let ballX = gamewidth / 2;
let ballY = gameheight / 2;
let balldirectionY = 0;
let balldirectionX = 0;
let player1score = 0;
let player2score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y:gameheight/2 - 50,
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gamewidth - 25,
    y:gameheight/2 - 50,
};

window.addEventListener("keydown", changepaddledir);
resetbtn.addEventListener("click", resetgame);

gamestart();

function gamestart(){
    createball();
    nextTick();
};
function nextTick(){
    interval = setTimeout(() => {
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballX, ballY);
        checkcollision();
        nextTick();
    }, 10)
};
function clearboard(){
    ctx.fillStyle = borderbackground;
    ctx.fillRect(0, 0, gamewidth, gameheight);
};
function drawpaddles(){
    ctx.strokeStyle = paddleborder;

    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
function createball(){
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        balldirectionY =  1; 
    }
    else{
        balldirectionY = -1; 
    }
    if(Math.round(Math.random()) == 1){
        balldirectionX = Math.random() * 1; //more random directions
    }
    else{
        balldirectionX = Math.random() * -1; //more random directions
    }
    ballX = gamewidth / 2;
    ballY = gameheight / 2;
    drawball(ballX, ballY);
};
function moveball(){
    ballX += (ballSpeed * balldirectionY);
    ballY += (ballSpeed * balldirectionX);
};
function drawball(ballX, ballY){
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballbordercolor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
function checkcollision(){
    if(ballY <= 0 + ballRadius){
        balldirectionX *= -1;
    }
    if(ballY >= gameheight - ballRadius){
        balldirectionX *= -1;
    }
    if(ballX <= 0){
        player2score+=1;
        updateScore();
        createball();
        return;
    }
    if(ballX >= gamewidth){
        player1score+=1;
        updateScore();
        createball();
        return;
    }
    if(ballX <= (paddle1.x + paddle1.width + ballRadius)){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
            balldirectionY *= -1;
            ballSpeed += 0.5;
        }
    }
    if(ballX >= (paddle2.x - ballRadius)){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius; // if ball gets stuck
            balldirectionY *= -1;
            ballSpeed += 0.5;
        }
    }
};
function changepaddledir(event){
    const keyPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keyPressed){
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if(paddle1.y < gameheight - paddle1.height){
                paddle1.y += paddleSpeed;
            }
            break;
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if(paddle2.y < gameheight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;
    }
};
function updateScore(){
    scoretext.textContent = `${player1score} : ${player2score}`;
};
function resetgame(){
    player1score = 0;
    player2score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y:gameheight/2 - 50,
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gamewidth - 25,
        y:gameheight/2 - 50,
    };
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    balldirectionY = 0;
    balldirectionX = 0;
    updateScore();
    clearInterval(interval);
    gamestart();
};