/*let currentPlayer = "X";
let gameActive = true;
let mode = document.getElementById("tictactoeMode").value;*/

function changeMode() {
  mode = document.getElementById("tictactoeMode").value;
  restart();
}

function makeMove(button) {
  if (button.innerHTML === "" && gameActive) {
    const svgPath = currentPlayer === "X" ? "assets/tictactoe/x.html" : "assets/tictactoe/o.html";
    
    fetch(svgPath)
      .then(response => response.text())
      .then(svgHtml => {
        button.innerHTML = svgHtml;
        if (checkWinner()) {
          displayWinner(currentPlayer);
          gameActive = false;
        } else if (isDraw()) {
          displayDraw();
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          updateTurnStatus();
          if (mode === "solo" && currentPlayer === "O") {
            gameActive = false;
            setTimeout(computerMove, 1000);
          }
        }
        updateHoverEffect();
      })
      .catch(error => console.error("Error loading the SVG:", error));
  }
}

function restart() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  buttons.forEach((button) => {
    button.innerHTML = "";
  });
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("xStatus").textContent = "X's Turn";
  document.getElementById("oStatus").textContent = "";
  updateHoverEffect();
}

function checkWinner() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      buttons[a].innerHTML !== "" &&
      buttons[a].innerHTML === buttons[b].innerHTML &&
      buttons[a].innerHTML === buttons[c].innerHTML
    );
  });
}

function isDraw() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  return [...buttons].every((button) => button.innerHTML !== "");
}

function displayWinner(winner) {
  if (winner === "X") {
    document.getElementById("xStatus").textContent = "X Wins!";
    document.getElementById("oStatus").textContent = "";
  } else if (winner === "O") {
    document.getElementById("oStatus").textContent = "O Wins!";
    document.getElementById("xStatus").textContent = "";
  }
}

function displayDraw() {
  document.getElementById("xStatus").textContent = "It's a Draw!";
  document.getElementById("oStatus").textContent = "It's a Draw!";
}

function updateTurnStatus() {
  if (currentPlayer === "X") {
    document.getElementById("xStatus").textContent = "X's Turn";
    document.getElementById("oStatus").textContent = "";
  } else {
    document.getElementById("xStatus").textContent = "";
    document.getElementById("oStatus").textContent = "O's Turn";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateTurnStatus(); // Set the initial turn status when the game loads
  updateHoverEffect(); // Set the initial hover effect when the game loads
});

function updateHoverEffect() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  buttons.forEach((button) => {
    button.classList.remove("hover-x", "hover-o");
    if (button.innerHTML === "" && gameActive && (mode !== "solo" || currentPlayer === "X")) {
      button.classList.add(currentPlayer === "X" ? "hover-x" : "hover-o");
    }
  });
}

function computerMove() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  const emptyButtons = [...buttons].filter((button) => button.innerHTML === "");

  if (emptyButtons.length > 0) {
    const randomButton = emptyButtons[Math.floor(Math.random() * emptyButtons.length)];

    fetch("assets/tictactoe/o.html")
      .then(response => response.text())
      .then(svgHtml => {
        randomButton.innerHTML = svgHtml;
        if (checkWinner()) {
          displayWinner(currentPlayer);
          gameActive = false;
        } else if (isDraw()) {
          displayDraw();
          gameActive = false;
        } else {
          currentPlayer = "X";
          updateTurnStatus();
          gameActive = true;
        }
        updateHoverEffect();
      })
      .catch(error => console.error("Error loading the SVG:", error));
  }
}
