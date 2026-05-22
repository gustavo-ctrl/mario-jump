const mario = document.querySelector('.mario');
const pipes = document.querySelectorAll('.pipe');
const scoreBoard = document.querySelector('.score');
const gameOverScreen = document.querySelector('.game-over');
const restartBtn = document.querySelector('#restartBtn');

let score = 0;
let gameOver = false;

/* PULO */
const jump = () => {
    if (mario.classList.contains('jump') || gameOver) return;

    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 850);
};

/* TECLA ESPAÇO */
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        jump();
    }
});

/* LOOP DO JOGO */
let loop = setInterval(() => {

    if (gameOver) return;

    const marioBottom = parseInt(window.getComputedStyle(mario).bottom);

    pipes.forEach((pipe) => {

        const pipeLeft = pipe.offsetLeft;

        /* COLISÃO */
        if (pipeLeft < 120 && pipeLeft > 0 && marioBottom < 80) {

            gameOver = true;
            clearInterval(loop);

            pipes.forEach(p => p.style.animation = 'none');

            mario.style.animation = 'none';
            mario.style.bottom = `${marioBottom}px`;

            mario.src = "./imagens/game-over.png";

            gameOverScreen.style.display = 'flex';
        }

        /* 🔥 PONTUAÇÃO CORRIGIDA */
        if (pipeLeft < 0) {
            if (!pipe.dataset.counted) {
                score++;
                pipe.dataset.counted = "true";
                scoreBoard.innerHTML = score;
            }
        }

        /* 🔁 RESET DO PIPE (IMPORTANTE) */
        if (pipeLeft > window.innerWidth) {
            pipe.dataset.counted = "";
        }

    });

}, 10);

/* REINICIAR */
restartBtn.addEventListener('click', () => {
    location.reload();
});