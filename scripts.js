const obstacles = [
  "dogshit",
  "dogshit",
  "dogshit",
  "dogshit",
  "dogshit",
  "trash",
  "trash",
  "trash",
  "hole",
  "hole"
];

const man = document.getElementById("man");
const obstacle = document.getElementById("obstacle");
const landscape1 = document.getElementById("landscape1");
const life = document.getElementById("life");
const gameStatus = document.getElementById("status");
const score = document.getElementById("score");

let gameState = "paused";
let lifeCount = 5;
let obstacleStartClassName = "dogshit-start";
let obstacleCollision = false;

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
  let obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );

  // detect collision
  if (
    obstacleLeft < 25 &&
    obstacleLeft > 0 &&
    manTop >= 150 &&
    !obstacleCollision
  ) {
    // collision
    obstacleCollision = true;
    if (lifeCount > 0) {
      // Timeout to avoid detecting multiple collisions in the same obstacle.
      // setTimeout(donothing, 50);
      lifeCount = lifeCount - 1;
      updateLifeDiv();
    }

    if (lifeCount <= 0) {
      gameStatus.classList.remove("hidden");
      landscape1.classList.remove("landscape-start");
      obstacle.classList.remove(obstacleStartClassName);
      man.classList.remove("walk");
      gameState = "gameover";
    }
    // detect obstacle went out of screen
  } else if (obstacleLeft < -10 && obstacleLeft >= -25) {
    changeObstacle();
    obstacleCollision = false;
  }

  if (gameState === "started") {
    let distance = parseInt(score.textContent);
    let newDistance = distance + 10;
    score.textContent = "" + newDistance;
  }
}, 100);

function changeObstacle() {
  let idx = parseInt(Math.random() * 100) % obstacles.length;
  obstacle.className = "";
  obstacle.classList.add(obstacles[idx]);
  obstacleStartClassName = obstacles[idx] + "-start";
  obstacle.classList.add(obstacleStartClassName);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    if (gameState === "paused" || gameState === "gameover") {
      gameStatus.classList.add("hidden");
      landscape1.classList.add("landscape-start");
      obstacle.classList.add(obstacleStartClassName);
      man.classList.add("walk");
      score.textContent = "0";
      lifeCount = 5;
      updateLifeDiv();
      gameState = "started";
    } else {
      jump();
    }
  }
});
