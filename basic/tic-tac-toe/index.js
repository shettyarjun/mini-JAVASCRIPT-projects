const cells = document.querySelectorAll('.cell');
const reset = document.querySelector('#reset');
const result = document.querySelector('#result');
let currentPlayer = 'X';
let moves = 0;
let options = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let running = false;
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializegame();

function initializegame() {
    cells.forEach(cell => {
        cell.addEventListener('click', cellclick);
    });
    reset.addEventListener('click', resetgame);
    result.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellclick() {
    if (!running || gameOver) return;
    const cellIndex = this.getAttribute("cellindex");
    if (this.textContent == '') {
        updatecell(this, cellIndex);
        checkWinner();
        changeplayer();
    }
}

function updatecell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moves++;
}

function changeplayer() {
    if (gameOver) {
        return;
    }
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    result.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let winner = false;
    for (let i = 0; i < winningCombos.length; i++) {
        const condition = winningCombos[i];
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a == b && b == c) {
            winner = true;
            break;
        }
    }
    if (winner) {
        gameOver = true;
        result.textContent = `${currentPlayer} wins!`;
    }
    if (moves == 9) {
        gameOver = true;
        result.textContent = "Draw!";
    }
}

function resetgame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    result.textContent = `${currentPlayer}'s turn`;
    moves = 0;
    gameOver = false;
}
