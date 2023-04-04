import level from "./level.js";

let actualLevel = 1;
document.addEventListener("keydown", () => {
  jump();
});
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const score = document.querySelector(".score");
const clouds = document.querySelector(".clouds");
const levelDiv = document.querySelector(".level");
const rocket = document.querySelector(".rocket");
let timeout;
const jump = () => {
  if (!timeout) {
    mario.classList.add("jump");
    timeout = setTimeout(() => {
      timeout = null;
      mario.classList.remove("jump");
    }, 500);
  }
};
// let nextRocket = 1;

const scoreInterval = setInterval(() => {
  score.innerHTML = Number(score.innerHTML) + 1;
}, 100);

const levelInterval = setInterval(() => {
  const pipePosition = pipe.offsetLeft;

  //   if (nextRocket === Number(score.innerHTML)) {
  //     rocket.style.animation = `clouds-animation 3s infinite linear`;
  //     nextRocket += level.find((item) => item.level === actualLevel).rocket;
  //     setTimeout(() => {
  //       rocket.style.animation = `none`;
  //     }, 3000);
  //   }
  if (
    level.find((item) => item.level === actualLevel) &&
    Number(score.innerHTML) + 1 >=
      level.find((item) => item.level === actualLevel).nextLevel &&
    pipePosition < -69
  ) {
    actualLevel++;
    levelDiv.innerHTML = `Level ${actualLevel}`;
    pipe.style.animation = `none`;
    pipe.style.left = `100%`;
    setTimeout(() => {
      pipe.style.left = null;
      const nextLevel = level.find((item) => item.level === actualLevel);
      pipe.style.animation = `pipe-animation ${nextLevel.pipe} infinite linear`;
      clouds.style.animation = `clouds-animation ${nextLevel.clouds} infinite linear;`;
      console.log("maior");
    }, 1000);
  }
}, 10);

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");
  if (pipePosition <= 103 && pipePosition > 0 && marioPosition < 110) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;
    console.log(pipePosition);
    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "../images/lose-3.png";
    mario.style.width = "70px";
    clearInterval(loop);
    clearInterval(scoreInterval);
    clearInterval(levelInterval);
  }
}, 10);
