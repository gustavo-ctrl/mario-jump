const player = document.getElementById("player");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

let isJumping = false;
let position = 100;
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

  let up = setInterval(() => {
    if (position >= 180) {
      clearInterval(up);

      let down = setInterval(() => {
        if (position <= 100) {
          clearInterval(down);
          isJumping = false;
        }

        position -= 5;
        player.style.bottom = position + "px";
      }, 20);
    }

    position += 5;
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