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
        getBoardPosition[i].addEventListener('click', playersTurn);
    }
    document.getElementById('restartGame').addEventListener('click', resetGameBoard);
}

// track players turn and adds either X or O to game board board.
function playersTurn() {
    if (this.textContent === '') {
        if (trackPlayersTurn % 2 === 0) {
            this.textContent = 'X';
            trackPlayersTurn++
            playerOne.style.boxShadow = '0 4px 8px 0 rgba(82, 113, 255, 0.8)';
            playerTwo.style.boxShadow = 'none';
        } else {
            this.textContent = 'O';
            trackPlayersTurn++;
            playerTwo.style.boxShadow = '0 4px 8px 0 rgba(82, 113, 255, 0.8)';
            playerOne.style.boxShadow = 'none';
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
    highlightPlayer();
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
    const playerOne = "X WINS";
    const playerTwo = "O WINS";
    const playerOneCurrentScore = document.getElementById('playerOneScore');
    const playerTwoCurrentScore = document.getElementById('playerTwoScore');

    if (trackPlayersTurn % 2 !== 0) {
        playerOneScore++;
        playerOneCurrentScore.textContent = playerOneScore;
        resultsOverlay(playerOne)
    } else {
        playerTwoScore++;
        playerTwoCurrentScore.textContent = playerTwoScore;
        resultsOverlay(playerTwo)
    }
    resetGameBoard();
}

function draw() {
    const gameTied = 'DRAW';
    if (board.includes('') === false) {
        resultsOverlay(gameTied);
        resetGameBoard();
    }
}

// Overlay to annouce who won the game or if the game was a tie. 
function resultsOverlay(result) {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
    document.getElementById('resultOverlayText').innerText = result;
    overlay.addEventListener('click', turnResultsOverlayOff);
}

function turnResultsOverlayOff() {
    this.style.display = 'none';
}

function resetGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].textContent = '';
    }
    gameBoard();
}

function highlightPlayer() {
    const playerOne = document.querySelector('.playerHighlightOne');
    const playerTwo = document.querySelector('.playerHighlightTwo');
    if (trackPlayersTurn % 2 === 0) {
        playerOne.style.boxShadow = '0 4px 8px 0 rgba(82, 113, 255, 0.8)';
        playerTwo.style.boxShadow = 'none';
    } else {
        playerTwo.style.boxShadow = '0 4px 8px 0 rgba(82, 113, 255, 0.8)';
        playerOne.style.boxShadow = 'none';
    };
}

function animateCSS(element, animationName, callback) {
    const animate = document.querySelector(element)
    animate.classList.add('animated', animationName)

    function handleAnimationEnd() {
        animate.classList.remove('animated', animationName)
        animate.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }
    
    animate.addEventListener('animationend', handleAnimationEnd)
}

gameBoard();
highlightPlayer()
respondToGameBoard();