const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreBoard = document.querySelector('.score');

let score = 0;
let gameOver = false;

// PULO
const jump = () => {
    if (mario.classList.contains('jump')) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

document.addEventListener('keydown', jump);

// LOOP DO JOGO (colisão + pontuação)
const loop = setInterval(() => {

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
    }

    // PONTUAÇÃO
    if (pipePosition < 0 && !gameOver) {
        score++;
        scoreBoard.innerHTML = score;
    }

}, 10);