const canv = document.querySelector('canvas');
const ctx = canv.getContext('2d');

canv.width = 1000;
canv.height = 500;

const canH = canv.height;
const canW = canv.width;

const ballSize = 20;
let ballX = canW /2 - ballSize /2;
let ballY = canH /2 - ballSize /2;

const paddleH = 100;
const paddleW = 20;

const playerX = 70;
const aiX = 910;

let aiY = 200;
let playerY = 200;

const lineW = 6;
const lineH = 16;

const minOrPlusOne = [1, -1];
let ballSpeedX = minOrPlusOne[Math.floor(Math.random() * minOrPlusOne.length)];
let ballSpeedY = minOrPlusOne[Math.floor(Math.random() * minOrPlusOne.length)];

let scorePlayer = 0;
let scoreAi = 0;

let isPause = false;
const preference = [];

function player() {
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, paddleW, paddleH);

    if ((ballX <= playerX + paddleW) && (ballY + ballSize / 2 >= playerY) && (ballY + ballSize / 2 <= playerY + paddleH)) {
        ballX += 5;
        ballSpeedX = -ballSpeedX;
        speedUp();
        pickupSound();
    }
}

function ai() {
    ctx.fillStyle = 'white';
    ctx.fillRect(aiX, aiY, paddleW, paddleH);

    if ((ballX + ballSize >= aiX) && (ballY + ballSize / 2 >= aiY) && (ballY + ballSize / 2 <= aiY + paddleH)) {
        ballX -= 5;
        ballSpeedX = -ballSpeedX;
        speedUp();
        pickupSound();
    }
}

function ball() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= canH) {
        ballSpeedY = -ballSpeedY;
        speedUp();
        pickupSound();
    }

    if (ballX <= 0) {
        scoreAi += 1;

        ballSpeedX = -1;
        ballSpeedY = minOrPlusOne[Math.floor(Math.random() * minOrPlusOne.length)];

        ballX = canW /2 - ballSize /2;
        ballY = canH /2 - ballSize /2;
    } else if (ballX >= canW) {
        scorePlayer += 1;

        ballSpeedX = 1;
        ballSpeedY = minOrPlusOne[Math.floor(Math.random() * minOrPlusOne.length)];

        ballX = canW /2 - ballSize /2;
        ballY = canH /2 - ballSize /2;
     }
}

function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canW, canH);

    for (let linePos = 20; linePos < canH; linePos += 30) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(canW /2 - lineW /2, linePos, lineW, lineH);
    }
}

function scoreBoard() {
    ctx.fillStyle = 'white';
    if (scorePlayer === 0) {
        ctx.fillRect(422, 54, 16, 50);
        ctx.fillRect(374, 54, 16, 50);
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(390, 104, 32, 16);
    } else if (scorePlayer === 1) {
        ctx.fillRect(406, 38, 16, 80);
        ctx.fillRect(390, 54, 16, 16);
    } else if (scorePlayer === 2) {
        ctx.fillRect(374, 54, 16, 16);
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(422, 54, 16, 16);
        ctx.fillRect(406, 70, 16, 16);
        ctx.fillRect(390, 86, 16, 16);
        ctx.fillRect(374, 102, 64, 16);
    } else if (scorePlayer === 3) {
        ctx.fillRect(374, 54, 16, 16);
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(422, 54, 16, 16);
        ctx.fillRect(406, 70, 16, 16);
        ctx.fillRect(374, 86, 16, 16);
        ctx.fillRect(422, 86, 16, 16);
        ctx.fillRect(390, 102, 32, 16);
    } else if (scorePlayer === 4) {
        ctx.fillRect(406, 38, 16, 80);
        ctx.fillRect(390, 54, 16, 16);
        ctx.fillRect(374, 70, 16, 16);
        ctx.fillRect(374, 86, 64, 16);
    } else if (scorePlayer === 5) {
        ctx.fillRect(374, 38, 64, 16);
        ctx.fillRect(374, 54, 16, 32);
        ctx.fillRect(390, 70, 32, 16);
        ctx.fillRect(422, 86, 16, 16);
        ctx.fillRect(374, 102, 48, 16)
    } else if (scorePlayer === 6) {
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(374, 54, 16, 48);
        ctx.fillRect(390, 70, 32, 16);
        ctx.fillRect(422, 86, 16, 16);
        ctx.fillRect(390, 102, 32, 16);
    } else if (scorePlayer === 7) {
        ctx.fillRect(374, 38, 64, 16);
        ctx.fillRect(422, 54, 16, 32);
        ctx.fillRect(406, 86, 16, 32);
    } else if (scorePlayer === 8) {
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(374, 54, 16, 16);
        ctx.fillRect(422, 54, 16, 16);
        ctx.fillRect(390, 70, 32, 16);
        ctx.fillRect(374, 86, 16, 16);
        ctx.fillRect(422, 86, 16, 16);
        ctx.fillRect(390, 102, 32, 16);
    } else if (scorePlayer === 9) {
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(374, 54, 16, 16);
        ctx.fillRect(422, 54, 16, 16);
        ctx.fillRect(390, 70, 48, 16);
        ctx.fillRect(422, 86, 16, 16);
        ctx.fillRect(390, 102, 32, 16);
    } else if (scorePlayer === 10) {
        ctx.fillRect(342, 38, 16, 80);
        ctx.fillRect(326, 54, 16, 16);

        ctx.fillRect(422, 54, 16, 50);
        ctx.fillRect(374, 54, 16, 50);
        ctx.fillRect(390, 38, 32, 16);
        ctx.fillRect(390, 104, 32, 16);

        // W
        ctx.fillRect(294, 140, 12, 60);
        ctx.fillRect(306, 176, 12, 12);
        ctx.fillRect(318, 164, 12, 12);
        ctx.fillRect(330, 176, 12, 12);
        ctx.fillRect(342, 140, 12, 60);

        // I
        ctx.fillRect(368, 140, 36, 12);
        ctx.fillRect(380, 152, 12, 36);
        ctx.fillRect(368, 188, 36, 12);

        aiY = 200;
        playerY = 200;

        ballX = canW /2 - ballSize /2;
        ballY = canH /2 - ballSize /2;
        
        setTimeout(() => { clearInterval(gameInterval); }, 100);
    }
    if (scoreAi === 0) {
        ctx.fillRect(560, 54, 16, 50);
        ctx.fillRect(608, 54, 16, 50);
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(576, 104, 32, 16);
    } else if (scoreAi === 1) {
        ctx.fillRect(592, 38, 16, 80);
        ctx.fillRect(576, 54, 16, 16);
    } else if (scoreAi === 2) {
        ctx.fillRect(560, 54, 16, 16);
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(608, 54, 16, 16);
        ctx.fillRect(592, 70, 16, 16);
        ctx.fillRect(576, 86, 16, 16);
        ctx.fillRect(560, 102, 64, 16);
    } else if (scoreAi === 3) {
        ctx.fillRect(560, 54, 16, 16);
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(608, 54, 16, 16);
        ctx.fillRect(592, 70, 16, 16);
        ctx.fillRect(560, 86, 16, 16);
        ctx.fillRect(608, 86, 16, 16);
        ctx.fillRect(576, 102, 32, 16);
    } else if (scoreAi === 4) {
        ctx.fillRect(592, 38, 16, 80);
        ctx.fillRect(576, 54, 16, 16);
        ctx.fillRect(560, 70, 16, 16);
        ctx.fillRect(560, 86, 64, 16);
    } else if (scoreAi === 5) {
        ctx.fillRect(560, 38, 64, 16);
        ctx.fillRect(560, 54, 16, 32);
        ctx.fillRect(576, 70, 32, 16);
        ctx.fillRect(608, 86, 16, 16);
        ctx.fillRect(560, 102, 48, 16)
    } else if (scoreAi === 6) {
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(560, 54, 16, 48);
        ctx.fillRect(576, 70, 32, 16);
        ctx.fillRect(608, 86, 16, 16);
        ctx.fillRect(576, 102, 32, 16);
    } else if (scoreAi === 7) {
        ctx.fillRect(560, 38, 64, 16);
        ctx.fillRect(608, 54, 16, 32);
        ctx.fillRect(592, 86, 16, 32);
    } else if (scoreAi === 8) {
        ctx.fillRect(560, 54, 16, 16);
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(608, 54, 16, 16);
        ctx.fillRect(576, 70, 32, 16);
        ctx.fillRect(560, 86, 16, 16);
        ctx.fillRect(608, 86, 16, 16);
        ctx.fillRect(576, 102, 32, 16);
    } else if (scoreAi === 9) {
        ctx.fillRect(560, 54, 16, 16);
        ctx.fillRect(576, 38, 32, 16);
        ctx.fillRect(608, 54, 16, 16);
        ctx.fillRect(576, 70, 48, 16);
        ctx.fillRect(608, 86, 16, 16);
        ctx.fillRect(576, 102, 32, 16);
    } else if (scoreAi === 10) {
        ctx.fillRect(592, 38, 16, 80);
        ctx.fillRect(576, 54, 16, 16);

        ctx.fillRect(640, 38, 32, 16);
        ctx.fillRect(624, 54, 16, 48);
        ctx.fillRect(672, 54, 16, 48);
        ctx.fillRect(640, 102, 32, 16);

        aiY = 200;
        playerY = 200;

        ballX = canW /2 - ballSize /2;
        ballY = canH /2 - ballSize /2;
        
        setTimeout(() => { clearInterval(gameInterval); }, 100);
    }
}

window.addEventListener('mousemove', playerPos);

function playerPos(e) {
    topCanvas = canv.offsetTop;

    playerY = e.clientY - topCanvas - paddleH /2;

    if (playerY >= canH - paddleH) {
        playerY = canH - paddleH;
    }
    
    if (playerY <= 0) {
        playerY = 0;
    }
}

function aiPos() {
    const middlePaddle = aiY + paddleH / 2;
    const middleBall = ballY + ballSize / 2;
    
    if (ballX > 500) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 24;
        } else if (middlePaddle - middleBall > 50) {
            aiY -= 10;
        }

        else if (middlePaddle - middleBall < -200) {
            aiY += 24;
        } else if (middlePaddle - middleBall < -50) {
            aiY += 10;
        }
    }

    if (ballX <= 500 && ballX > 100) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 3;
        } 

        if (middlePaddle - middleBall < -100) {
            aiY += 3;
        }
    }
}

canv.addEventListener('click', pauseGame);

function pauseGame() { 
    if (isPause == false) {
        preference.pop();
        preference.pop();
        preference.push(ballSpeedX, ballSpeedY);
        ballSpeedX = 0;
        ballSpeedY = 0;
        isPause = true;

        ctx.fillStyle = 'white';

        // P
        ctx.fillRect(356, 300, 36, 12);
        ctx.fillRect(356, 300, 12, 60);
        ctx.fillRect(368, 324, 24, 12);
        ctx.fillRect(392, 312, 12, 12);

        // A
        ctx.fillRect(428, 300, 24, 12);
        ctx.fillRect(416, 312, 12, 48);
        ctx.fillRect(428, 324, 24, 12);
        ctx.fillRect(452, 312, 12, 48);

        // U
        ctx.fillRect(476, 300, 12, 48);
        ctx.fillRect(488, 348, 24, 12);
        ctx.fillRect(512, 300, 12, 48);

        // S
        ctx.fillRect(548, 300, 36, 12);
        ctx.fillRect(536, 312, 12, 12);
        ctx.fillRect(548, 324, 24, 12);
        ctx.fillRect(572, 336, 12, 12);
        ctx.fillRect(536, 348, 36, 12);

        // E
        ctx.fillRect(596, 300, 12, 60);
        ctx.fillRect(608, 300, 36, 12);
        ctx.fillRect(608, 324, 24, 12);
        ctx.fillRect(608, 348, 36, 12);

        clearInterval(gameInterval);
    } else {
        ballSpeedX = preference[0];
        ballSpeedY = preference[1];
        isPause = false;
        
        gameInterval = setInterval(game, 1000 / 60);
    }
}

function speedUp() {
    if (ballSpeedX > 0 && ballSpeedX < 10) {
        ballSpeedX += .4;
      } 
    else if (ballSpeedX < 0 && ballSpeedX > -10) {
        ballSpeedX -= .4;
    }

    if (ballSpeedY > 0 && ballSpeedY < 10) {
        ballSpeedY += .3;
    } 
    else if (ballSpeedY < 0 && ballSpeedY > -10) {
        ballSpeedY -= .3;
    }
}

function pickupSound() {
    const sound = new Audio('./assets/audio/pickup.mp3');
    sound.play();
}

function game() {
    table();
    player();
    ai();
    ball();
    aiPos();
    scoreBoard();
}

gameInterval = setInterval(game, 1000 / 60);