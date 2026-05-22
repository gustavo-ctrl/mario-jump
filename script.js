const player = document.getElementById("player");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

let isJumping = false;
let position = 100;
let gravity = 5;
let jumpLimit = 180;
let gameOver = false;

/* PULO */
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

function jump() {
  if (isJumping || gameOver) return;

  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= jumpLimit) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 100) {
          clearInterval(downInterval);
          isJumping = false;
        }

        position -= gravity;
        player.style.bottom = position + "px";
      }, 20);
    }

    position += 6;
    player.style.bottom = position + "px";
  }, 20);
}

/* GAME OVER */
function endGame() {
  gameOver = true;
  gameOverScreen.classList.remove("hidden");
}

/* REINICIAR */
restartBtn.addEventListener("click", () => {
  position = 100;
  player.style.bottom = position + "px";

  gameOver = false;
  isJumping = false;

  gameOverScreen.classList.add("hidden");
});