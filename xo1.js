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
let turn = "justin";
let gameOver = false;
const result = document.getElementById("result");
const playAgain = document.getElementById("play-again");
const bg = document.querySelector(".bg");

const justinImage = "images/Justin.jpg";
const marittaImage = "images/Maritta.jpg";

boxes.forEach((e) => {
  e.innerHTML = "";
  e.addEventListener("click", () => {
    if (e.innerHTML === "" && !gameOver) {
      // e.innerHTML = turn;
      e.innerHTML = `<img src="${
        turn === "justin" ? justinImage : marittaImage
      }" alt="${turn}" class="player-image" />`;
      checkWin();
      checkDraw();
      if (!gameOver) {
        switchTurn();
      }
    }
  });
});

function switchTurn() {
  if (turn === "justin") {
    turn = "maritta";
    bg.style.left = "5rem";
  } else {
    turn = "justin";
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
  winConditions.forEach((w) => {
    let one = boxes[w[0]].innerHTML;
    let two = boxes[w[1]].innerHTML;
    let three = boxes[w[2]].innerHTML;
    if (one !== "" && one === two && two === three) {
      gameOver = true;
      result.innerHTML = `${turn === "justin" ? "Justin" : "Maritta"} wins!`;
      // result.innerHTML = `<img src="${turn === "justin" ? justinImage : marittaImage}" alt="${turn}" class="player-image" style='width:2rem'  /> Wins`;
      // result.innerHTML = `${one.includes("Justin") ? "Justin" : "Maritta"} wins!`;
      // result.innerHTML = `${turn} win`;
      playAgain.style.display = "inline";
      w.forEach((e) => {
        // boxes[e].style.backgroundColor = "gray";
        const img = boxes[e].querySelector("img");
        if (img) {
          img.classList.add("im");
          img.style.border = "3px solid gold";
          img.style.borderRadius = "50%";
        }
      });
      // boxes[w[0]].style.color = "red";
      // boxes[w[1]].style.color = "red";
      // boxes[w[2]].style.color = "red";
      // Style losing boxes
      boxes.forEach((box, index) => {
        if (!w.includes(index)) {
          // Exclude winning boxes
          const img = box.querySelector("img");
          if (img) {
            img.style.opacity = "0.8";
            img.style.filter = "grayscale(80%)";
          }
        }
      });
    }
  });
  // for (i = 0; i < winConditions.length; i++) {
  //   let v0 = boxes[winConditions[i][0]].innerHTML;
  //   let v1 = boxes[winConditions[i][1]].innerHTML;
  //   let v2 = boxes[winConditions[i][2]].innerHTML;
  //   if (v0 != "" && v0 === v1 && v1 === v2) {
  //     gameOver = true;
  //     result.innerHTML = `${turn} win`;
  //     playAgain.style.display = "inline";

  //     for (j = 0; j < 3; j++) {
  //       boxes[winConditions[i][j]].style.backgroundColor = "#1a6aa0";
  //       boxes[winConditions[i][j]].style.color = "orange";
  //     }
  //   }
  // }
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
  turn = "justin";
  bg.style.left = "0";
  result.innerHTML = "";
  playAgain.style.display = "none";
  boxes.forEach((e) => {
    e.innerHTML = "";
    // e.style.removeProperty("background-color");
  });
});