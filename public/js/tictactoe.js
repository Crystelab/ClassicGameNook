let name;
let turn = "X's turn";
let gameActive = true;
let mode = document.getElementById("tictactoeMode").value;

document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";
document.getElementById("valueCont").style.display = "none";
document.getElementById("whosTurn").style.display = "block";
document.getElementById("enterName").style.display = "none";
document.getElementById("name").style.display = "none";
document.getElementById("find").style.display = "none";
document.getElementById("loading").style.display = "none";
document.getElementById("bigcont").style.display = "block";
document.getElementById("restart").style.display = "block";
updateHoverEffect();
friendOrSolo();
function changeMode() {
  mode = document.getElementById("tictactoeMode").value;

  restart();

  if (mode === "friend" || mode === "solo") {
    document.getElementById("userCont").style.display = "none";
    document.getElementById("oppNameCont").style.display = "none";
    document.getElementById("valueCont").style.display = "none";
    document.getElementById("whosTurn").style.display = "block";
    document.getElementById("enterName").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("find").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("bigcont").style.display = "block";
    document.getElementById("restart").style.display = "block";
    updateHoverEffect();
    friendOrSolo();
  } else if (mode === "online") {
    document.getElementById("loading").style.display = "none";
    document.getElementById("bigcont").style.display = "none";
    document.getElementById("userCont").style.display = "none";
    document.getElementById("oppNameCont").style.display = "none";
    document.getElementById("valueCont").style.display = "none";
    document.getElementById("whosTurn").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementById("enterName").style.display = "block";
    document.getElementById("name").style.display = "block";
    document.getElementById("find").style.display = "block";
    online();
  }
}
function online() {
  console.log(mode);
  const socket = io();

  document.getElementById("find").addEventListener("click", function () {
    name = document.getElementById("name").value;
    document.getElementById("user").innerText = name;
    if (!name) {
      alert("Please enter a name");
    } else {
      socket.emit("find", { name: name });

      document.getElementById("loading").style.display = "block";
      document.getElementById("find").disabled = true;
    }
  });

  socket.on("find", (e) => {
    let allPlayersArray = e.allPlayers;
    console.log("html", allPlayersArray);

    if (name) {
      document.getElementById("userCont").style.display = "block";
      document.getElementById("oppNameCont").style.display = "block";
      document.getElementById("valueCont").style.display = "block";
      document.getElementById("loading").style.display = "none";
      document.getElementById("name").style.display = "none";
      document.getElementById("find").style.display = "none";
      document.getElementById("enterName").style.display = "none";
      document.getElementById("bigcont").style.display = "block";
      document.getElementById("whosTurn").style.display = "block";
      document.getElementById("whosTurn").innerText = "X's turn";
    }

    let oppName;
    let value;

    const foundObject = allPlayersArray.find(
      (obj) => obj.p1.p1name === name || obj.p2.p2name === name
    );
    if (foundObject) {
      oppName =
        foundObject.p1.p1name === name
          ? foundObject.p2.p2name
          : foundObject.p1.p1name;
      value =
        foundObject.p1.p1name === name
          ? foundObject.p1.p1value
          : foundObject.p2.p2value;

      document.getElementById("oppName").innerText = oppName;
      document.getElementById("value").innerText = value;
    }
  });

  document.querySelectorAll(".btnTictactoe").forEach((e) => {
    e.addEventListener("click", function () {
      let currentTurn = document.getElementById("whosTurn").innerText;
      let value = document.getElementById("value").innerText;

      if (
        (value === "X" && currentTurn === "X's turn") ||
        (value === "O" && currentTurn === "O's turn" && gameActive)
      ) {
        const svgPath =
          value === "X"
            ? "assets/tictactoe/x.html"
            : "assets/tictactoe/o.html";

        fetch(svgPath)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok " + response.statusText
              );
            }
            return response.text();
          })
          .then((svgHtml) => {
            e.innerHTML = svgHtml;
            e.setAttribute("data-value", value);
            e.disabled = true;
            updateHoverEffect();
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
          });

        socket.emit("playing", { value: value, id: e.id, name: name });
      } else {
        alert("It's not your turn!");
      }
    });
  });

  socket.on("playing", (e) => {
    if (!gameActive) return;

    const foundObject = e.allPlayers.find(
      (obj) => obj.p1.p1name === name || obj.p2.p2name === name
    );

    if (!foundObject) return;

    let p1id = foundObject.p1.p1move;
    let p2id = foundObject.p2.p2move;

    if (turn === "X's turn" && p1id && gameActive) {
      const p1Button = document.getElementById(`${p1id}`);
      fetch("assets/tictactoe/x.html")
        .then((response) => response.text())
        .then((svgHtml) => {
          p1Button.innerHTML = svgHtml;
          p1Button.setAttribute("data-value", "X");
          p1Button.disabled = true;
          check(turn);

          if (gameActive) {
            turn = "O's turn";
            document.getElementById("whosTurn").innerText = turn;
            updateHoverEffect();
          }
        });
    } else if (turn === "O's turn" && p2id && gameActive) {
      const p2Button = document.getElementById(`${p2id}`);
      fetch("assets/tictactoe/o.html")
        .then((response) => response.text())
        .then((svgHtml) => {
          p2Button.innerHTML = svgHtml;
          p2Button.setAttribute("data-value", "O");
          p2Button.disabled = true;
          check(turn);

          if (gameActive) {
            turn = "X's turn";
            document.getElementById("whosTurn").innerText = turn;
            updateHoverEffect();
          }
        });
    }
  });
}

function friendOrSolo() {
  document.querySelectorAll(".btnTictactoe").forEach((e) => {
    e.addEventListener("click", function () {
      if (e.innerHTML === "" && gameActive) {
        const svgPath =
          turn === "X's turn"
            ? "assets/tictactoe/x.html"
            : "assets/tictactoe/o.html";
        fetch(svgPath)
          .then((response) => response.text())
          .then((svgHtml) => {
            e.innerHTML = svgHtml;
            e.disabled = true;
            check(turn);
            if (checkWinner()) {
              gameActive = false;
            } else if (isDraw()) {
              gameActive = false;
            } else {
              turn = turn === "X's turn" ? "O's turn" : "X's turn";
              document.getElementById("whosTurn").innerText = turn;
              if (mode === "solo" && turn === "O's turn") {
                console.log(turn);
                setTimeout(computerMove, 1000);
              }
            }
            updateHoverEffect();
          })
          .catch((error) => console.error("Error loading the SVG:", error));
      }
    });
  });
}

function updateTurnStatus() {
  const whosTurnElement = document.getElementById("whosTurn");

  if (whosTurnElement) {
    whosTurnElement.textContent = turn;
  } else {
    console.error("'whosTurn' element not found!");
  }
}

function check(lastTurn) {
  if (checkWinner()) {
    let winMessage = lastTurn === "X's turn" ? "X WON !!" : "O WON !!";
    document.getElementById("whosTurn").innerText = winMessage;
    gameActive = false;
    updateHoverEffect();
    document.getElementById("restart").style.display = "block";
  } else if (isDraw()) {
    document.getElementById("whosTurn").innerText = "It's a Draw !!";
    gameActive = false;
    updateHoverEffect();
    document.getElementById("restart").style.display = "block";
  }
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
  if (mode === "friend" || mode === "solo") {
    return winningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        buttons[a].innerHTML !== "" &&
        buttons[a].innerHTML === buttons[b].innerHTML &&
        buttons[a].innerHTML === buttons[c].innerHTML
      );
    });
  }
  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      buttons[a].getAttribute("data-value") !== null &&
      buttons[a].getAttribute("data-value") ===
        buttons[b].getAttribute("data-value") &&
      buttons[a].getAttribute("data-value") ===
        buttons[c].getAttribute("data-value")
    );
  });
}

function isDraw() {
  const buttons = document.querySelectorAll(".btnTictactoe");
return [...buttons].every((button) => button.innerHTML !== "");
}
function updateHoverEffect() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  buttons.forEach((button) => {
    button.classList.remove("hover-x", "hover-o");
    if (button.innerHTML === "" && gameActive) {
      button.classList.add(turn === "X's turn" ? "hover-x" : "hover-o");
    }
    // Disable click and hover if the game is over or the button already has a value
    if (button.getAttribute("data-value") !== null || !gameActive) {
      button.classList.remove("hover-x", "hover-o");
      button.disabled = true;
    }
    if (mode === "friend") {
      button.disabled = false;
      button.classList.add(turn === "X's turn" ? "hover-x" : "hover-o");
    }
  });
}
function restart() {
  document.querySelectorAll(".btnTictactoe").forEach((button) => {
    button.innerHTML = "";
    button.removeAttribute("data-value");
    button.disabled = false;
  });
  turn = "X's turn";
  gameActive = true;
  document.getElementById("whosTurn").innerText = turn;
  document.getElementById("restart").style.display = "none";
  updateHoverEffect();
}

function computerMove() {
  const buttons = document.querySelectorAll(".btnTictactoe");
  const emptyButtons = [...buttons].filter(
    (button) => button.innerHTML === ""
  );

  if (emptyButtons.length > 0) {
    const randomButton =
      emptyButtons[Math.floor(Math.random() * emptyButtons.length)];

    fetch("assets/tictactoe/o.html")
      .then((response) => response.text())
      .then((svgHtml) => {
        randomButton.innerHTML = svgHtml;

        check();
      })
      .catch((error) => console.error("Error loading the SVG:", error));
  }
}