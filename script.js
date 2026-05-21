const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreBoard = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const restartBtn = document.querySelector('#restartBtn');

let score = 0;
let gameOver = false;

const jump = () => {
    if (mario.classList.contains('jump') || gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 850);
};

document.addEventListener('keydown', jump);

// LOOP DO JOGO
let loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // COLISÃO
    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./imagens/game-over.png";

        gameOver = true;

        clearInterval(loop);

        // mostra tela de game over
        gameOverScreen.style.display = 'flex';
    }

    // PONTUAÇÃO
    if (pipePosition < 0 && !gameOver) {
        score++;
        scoreBoard.innerHTML = score;
    }

}, 10);

// RESTART
restartBtn.addEventListener('click', () => {
    location.reload();
});