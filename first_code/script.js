let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    let condition = winningConditions[i];
    let a = board[condition[0]];
    let b = board[condition[1]];
    let c = board[condition[2]];

    if (a === "" || b === "" || c === "") continue;

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerText = `Player ${currentPlayer} Wins 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.innerText = "Game Draw 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer} Turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.innerText = "Player X Turn";

  cells.forEach(cell => {
    cell.innerText = "";
  });
}
