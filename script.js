// global variables 
const getBoardPosition = Array.from(document.querySelectorAll('.board td'));
let board;
let trackPlayersTurn = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

// array for results
function gameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
}

// respond to the player clicking a position. Check for winning combination after every play. 
function respondToGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].addEventListener('click', playersTurn); // find alternative to once. , { once: true }
    }
}

// track players turn and adds either X or O to game board board.
function playersTurn() {
    if (this.textContent === '') {     
        if (trackPlayersTurn % 2 === 0) {
            this.textContent = 'X';
            trackPlayersTurn++
        } else {
            this.textContent = 'O';
            trackPlayersTurn++;
        };
        updateGameBoard();
        findWinner();
        draw();
    }
}

function updateGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        if (getBoardPosition[i].textContent === "X") {
            board[i] = true;
        } else if (getBoardPosition[i].textContent === "O") {
            board[i] = false;
        }
    }
}

function findWinner() {
    if (
        (board[0] && board[1] && board[2] || board[0] === false && board[1] === false && board[2] === false) ||
        (board[3] && board[4] && board[5] || board[3] === false && board[4] === false && board[5] === false) ||
        (board[6] && board[7] && board[8] || board[6] === false && board[7] === false && board[8] === false) ||
        (board[0] && board[3] && board[6] || board[0] === false && board[3] === false && board[6] === false) ||
        (board[1] && board[4] && board[7] || board[1] === false && board[4] === false && board[7] === false) ||
        (board[2] && board[5] && board[8] || board[2] === false && board[5] === false && board[8] === false) ||
        (board[0] && board[4] && board[8] || board[0] === false && board[4] === false && board[8] === false) ||
        (board[2] && board[4] && board[6] || board[2] === false && board[4] === false && board[6] === false)) {
        announceWinner();
    }
}

function announceWinner() {
    const playerOne = "Player One";
    const playerTwo = "Player Two";
    const playerOneCurrentScore = document.getElementById('playerOneScore');
    const playerTwoCurrentScore = document.getElementById('playerTwoScore');

    if (trackPlayersTurn % 2 !== 0) {
        playerOneScore++;
        playerOneCurrentScore.textContent = playerOneScore;
        resultsScreen(playerOne);
    } else {
        playerTwoScore++;
        playerTwoCurrentScore.textContent = playerTwoScore;
        resultsScreen(playerTwo);
    }
    gameBoard();
    resetGameBoard();
}

function draw() {
    if (board.includes('') === false) {
        alert(`Draw`);
        gameBoard();
        resetGameBoard();
    }
}

function resultsScreen(player) {
    alert(`${player} Wins`)
};

function resetGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].textContent = '';
    }
}

function highlightPlayer() {
    const playerOne = document.getElementById('playerOne');
    const playerTwo = document.getElementById('playerTwo');
}

gameBoard();
respondToGameBoard();