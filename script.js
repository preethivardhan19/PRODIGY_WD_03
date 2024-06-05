const X_CLASS = 'X';
const O_CLASS = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset-btn');
const playerWinsDisplay = document.getElementById('playerWins');
const computerWinsDisplay = document.getElementById('computerWins');
const drawDisplay = document.getElementById('draws');
const startButton = document.getElementById('start-btn');

let currentPlayer = X_CLASS;
let gameActive = false;
let playerWins = 0;
let computerWins = 0;
let draws = 0;

startButton.addEventListener('click', startGame);

function startGame() {
    gameActive = true;
    startButton.disabled = true; // Disable the start button once the game starts
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener('click', handleClick);
    });
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    currentPlayer = X_CLASS;
}

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === '' && gameActive) {
        const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            if (currentClass === X_CLASS) {
                playerWins++;
                playerWinsDisplay.textContent = playerWins;
                endGame('Player');
            } else {
                computerWins++;
                computerWinsDisplay.textContent = computerWins;
                endGame('Computer');
            }
        } else if (isDraw()) {
            draws++;
            drawDisplay.textContent = draws;
            endGame('Draw');
        } else {
            swapTurns();
            if (currentPlayer === O_CLASS) {
                setTimeout(computerTurn, 500); // Computer's turn after a short delay
            }
        }
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
    board.classList.toggle(X_CLASS);
    board.classList.toggle(O_CLASS);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === X_CLASS || cell.textContent === O_CLASS;
    });
}

function endGame(winner) {
    gameActive = false;
    startButton.disabled = false; // Enable the start button when the game ends
    if (winner === 'Draw') {
        alert('It\'s a draw!');
    } else {
        alert(`${winner} wins!`);
    }
}

function computerTurn() {
    const emptyCells = [...cells].filter(cell => cell.textContent === '');
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    placeMark(cell, O_CLASS);
    if (checkWin(O_CLASS)) {
        computerWins++;
        computerWinsDisplay.textContent = computerWins;
        endGame('Computer');
    } else if (isDraw()) {
        draws++;
        drawDisplay.textContent = draws;
        endGame('Draw');
    } else {
        swapTurns();
    }
}

resetButton.addEventListener('click', function() {
    playerWins = 0;
    computerWins = 0;
    draws = 0;
    playerWinsDisplay.textContent = playerWins;
    computerWinsDisplay.textContent = computerWins;
    drawDisplay.textContent = draws;
    startGame();
});
