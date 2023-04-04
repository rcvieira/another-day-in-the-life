const man = document.getElementById("man");
const shit = document.getElementById("shit");
const landscape1 = document.getElementById("landscape1");
const life = document.getElementById("life");
const gameStatus = document.getElementById("status");

let gameState = "paused";
let lifeCount = 5;

function jump() {
  if (man.classList != "jump") {
    man.classList.remove("walk");
    man.classList.add("jump");

    setTimeout(function () {
      man.classList.remove("jump");
      man.classList.add("walk");
    }, 500);
  }
}

function donothing() {}

function updateLifeDiv() {
  let lifeTotal = lifeCount * 25;
  life.style.width = "" + lifeTotal + "px";
}

let isAlive = setInterval(function () {
  // get current dino Y position
  let manTop = parseInt(window.getComputedStyle(man).getPropertyValue("top"));

  // get current cactus X position
  let shitLeft = parseInt(
    window.getComputedStyle(shit).getPropertyValue("left")
  );

  // detect collision
  if (shitLeft < 25 && shitLeft > 0 && manTop >= 150) {
    // collision
    if (lifeCount > 0) {
      setTimeout(donothing, 50);
      lifeCount = lifeCount - 1;
      updateLifeDiv();
    }

    if (lifeCount <= 0) {
      gameStatus.classList.remove("hidden");
      landscape1.classList.remove("landscape-start");
      shit.classList.remove("shit-start");
      man.classList.remove("walk");
      gameState = "gameover";
    }
  }
}, 100);

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (gameState === "paused" || gameState === "gameover") {
      gameStatus.classList.add("hidden");
      landscape1.classList.add("landscape-start");
      shit.classList.add("shit-start");
      man.classList.add("walk");
      lifeCount = 5;
      updateLifeDiv();
      gameState = "started";
    } else {
      jump();
    }
  }
});
