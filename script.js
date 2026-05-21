const player = document.getElementById("player");

let isJumping = false;
let position = 100;
let gravity = 5;
let jumpLimit = 180;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

function jump() {
  if (isJumping) return;

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