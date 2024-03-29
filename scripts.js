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
const cover = document.getElementById("cover");

let gameState = "initial";
let lifeCount = 5;
let obstacleName = "dogshit";
let obstacleStartClassName = obstacleName + "-start";
let obstacleCollision = false;

function jump() {
  if (man.classList != "jump") {
    man.classList.remove("walk");
    man.classList.add("jump");
    const jumpSound = new Audio("./audio/jump.m4a");
    jumpSound.play();

    setTimeout(function () {
      man.classList.remove("jump");
      man.classList.add("walk");
    }, 500);
  }
}

function updateLifeReading() {
  let lifeTotal = lifeCount * 25;
  life.style.width = "" + lifeTotal + "px";
}

function detectCollision(obstacleLeft, obstacleSize, manTop) {
  return obstacleLeft < 25 && obstacleLeft > 25 - obstacleSize && manTop >= 150;
}

function detectLeftOfScreen(obstacleLeft, obstacleSize) {
  return (
    obstacleLeft < 25 - obstacleSize - 10 &&
    obstacleLeft >= 25 - obstacleSize - 25
  );
}

let isAlive = setInterval(function () {
  let manTop = parseInt(window.getComputedStyle(man).getPropertyValue("top"));
  let obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("left")
  );
  let obstacleSize = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("width")
  );

  if (
    detectCollision(obstacleLeft, obstacleSize, manTop) &&
    !obstacleCollision
  ) {
    obstacleCollision = true;
    if (lifeCount > 0) {
      let obstacleSound = new Audio("audio/" + obstacleName + ".m4a");
      obstacleSound.play();
      lifeCount = lifeCount - 1;
      updateLifeReading();
    }

    if (lifeCount <= 0) {
      stopGame();
    }
  } else if (detectLeftOfScreen(obstacleLeft, obstacleSize)) {
    changeObstacle();
    obstacleCollision = false;
  }

  if (gameState === "started") {
    computeScore();
  }
}, 10);

function computeScore() {
  let distance = parseInt(score.textContent);
  let newDistance = distance + 10;
  score.textContent = "" + newDistance;
}

function changeObstacle() {
  let idx = parseInt(Math.random() * 100) % obstacles.length;
  obstacle.className = "";
  obstacle.classList.add(obstacles[idx]);
  obstacleName = obstacles[idx];
  obstacleStartClassName = obstacles[idx] + "-start";
  obstacle.classList.add(obstacleStartClassName);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    processActionEvent();
  }
});

function processActionEvent() {
  if (gameState == "initial") {
    startGame();
  } else if (gameState === "gameover") {
    showStartScreen();
  } else {
    jump();
  }
}

function showStartScreen() {
  cover.classList.remove("hidden");
  gameStatus.classList.add("hidden");
  gameState = "initial";
}

function startGame() {
  cover.classList.add("hidden");
  gameStatus.classList.add("hidden");
  landscape1.classList.add("landscape-start");
  obstacle.classList.add(obstacleStartClassName);
  landscape1.style.animationPlayState = "running";
  obstacle.style.animationPlayState = "running";
  man.classList.add("walk");
  score.textContent = "0";
  lifeCount = 5;
  updateLifeReading();
  gameState = "started";
}

function stopGame() {
  gameStatus.classList.remove("hidden");
  landscape1.style.animationPlayState = "paused";
  obstacle.style.animationPlayState = "paused";
  man.classList.remove("walk");
  gameState = "gameover";
}
