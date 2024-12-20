const light = document.getElementById("light");
light.addEventListener("click", () => {
  if (light.classList.contains("fa-solid")) {
    change("light");
  } else {
    change("dark");
  }
});
function change(mood) {
  if (mood === "light") {
    document.body.style.backgroundColor = "#dadada";
    light.classList.remove("fa-solid");
    light.classList.add("fa-regular");
    light.style.color = "#000";
    document.body.style.color = "#000";
    localStorage.setItem("mood", "light");
  } else {
    document.body.style.backgroundColor = "#1b182cf4";
    light.classList.add("fa-solid");
    light.classList.remove("fa-regular");
    light.style.color = "#fff";
    document.body.style.color = "#fff";
    localStorage.setItem("mood", "dark");
  }
}
const getMood = localStorage.getItem("mood") || "dark";
change(getMood);
//
let boxes = document.querySelectorAll(".box");
let turn = "x";
let gameOver = false;
const result = document.getElementById("result");
const playAgain = document.getElementById("play-again");
const bg = document.querySelector(".bg");

boxes.forEach((e) => {
  e.innerHTML = "";
  e.addEventListener("click", () => {
    if (e.innerHTML === "" && !gameOver) {
      e.innerHTML = turn;
      checkWin();
      checkDraw();
      if (!gameOver) {
        switchTurn();
      }
    }
  });
});

function switchTurn() {
  if (turn === "x") {
    turn = "o";
    bg.style.left = "5rem";
  } else {
    turn = "x";
    bg.style.left = "0";
  }
}

function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;
    if (v0 != "" && v0 === v1 && v1 === v2) {
      gameOver = true;
      result.innerHTML = `${turn} win`;
      playAgain.style.display = "inline";

      for (j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "#1a6aa0";
        boxes[winConditions[i][j]].style.color = "orange";
      }
    }
  }
}
function checkDraw() {
  if (!gameOver) {
    let draw = true;
    boxes.forEach((e) => {
      if (e.innerHTML === "") {
        draw = false;
      }
    });
    if (draw) {
      gameOver = true;
      result.innerHTML = `draw`;
      playAgain.style.display = "inline";
    }
  }
}
playAgain.addEventListener("click", () => {
  gameOver = false;
  turn = "x";
  bg.style.left = "0";
  result.innerHTML = "";
  playAgain.style.display = "none";
  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.removeProperty("color");
  });
});
