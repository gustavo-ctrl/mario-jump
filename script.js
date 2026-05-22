const mario = document.querySelector('.mario');
const pipes = document.querySelectorAll('.pipe');
const scoreBoard = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const restartBtn = document.querySelector('#restartBtn');

let score = 0;
let gameOver = false;
let scoredPipes = new Set();

/* PULO */
const jump = () => {
    if (mario.classList.contains('jump') || gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 850);
};

/* TECLADO + TOQUE (CELULAR) */
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});

/* LOOP DO JOGO */
let loop = setInterval(() => {

    if (gameOver) return;

    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    pipes.forEach((pipe) => {

        const pipePosition = pipe.offsetLeft;

        /* COLISÃO */
        if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = "./imagens/game-over.png";

            gameOver = true;
            clearInterval(loop);

            gameOverScreen.style.display = 'flex';
        }

        /* PONTUAÇÃO (SEM BUG) */
        if (pipePosition < 0 && !scoredPipes.has(pipe)) {
            score++;
            scoredPipes.add(pipe);
            scoreBoard.innerHTML = score;
        }

    });

}, 10);

/* REINICIAR */
restartBtn.addEventListener('click', () => {
    location.reload();
});