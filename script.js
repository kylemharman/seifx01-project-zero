// global variables 
const getBoardPosition = Array.from(document.querySelectorAll('.board td'));
const crossIcon = document.querySelector('.crossIcon');
const circleIcon = document.querySelector('.circleIcon');
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
    document.querySelector('.restartGame').addEventListener('click', resetGameBoard);
}

// track players turn and adds either X or O to game board board.
function playersTurn() {
    if (this.innerHTML === '') {
        if (trackPlayersTurn % 2 === 0) {
            this.innerHTML = crossIcon.innerHTML;
            trackPlayersTurn++
        } else {
            this.innerHTML = circleIcon.innerHTML;
            trackPlayersTurn++;
        };
        updateGameBoard();
        findWinner();
        draw();
    }
}

function updateGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        if (getBoardPosition[i].innerHTML === crossIcon.innerHTML) {
            board[i] = true;
        } else if (getBoardPosition[i].innerHTML === circleIcon.innerHTML) {
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
    const playerOne = crossIcon.innerHTML;
    const playerTwo = circleIcon.innerHTML;
    const playerOneCurrentScore = document.querySelector('.playerOneScore');
    const playerTwoCurrentScore = document.querySelector('.playerTwoScore');
    const wins = 'WINS'
    
    if (trackPlayersTurn % 2 !== 0) {
        playerOneScore++;
        playerOneCurrentScore.textContent = playerOneScore;
        resultsOverlay(playerOne, wins)
    } else {
        playerTwoScore++;
        playerTwoCurrentScore.textContent = playerTwoScore;
        resultsOverlay(playerTwo, wins)
    }
    resetGameBoard();
}

function draw() {
    const gameTied = 'DRAW';
    if (board.includes('') === false) {
        resultsOverlay('',gameTied);
        resetGameBoard();
    }
}

function resetGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].innerHTML = '';
    }
    gameBoard();
}


// Overlay to annouce who won the game or if the game was a tie. 
function resultsOverlay(icon, result) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'flex';
    document.querySelector('.resultOverlayIcon').innerHTML = icon;
    document.querySelector('.resultOverlayText').innerHTML = result;
    overlay.addEventListener('click', turnResultsOverlayOff);
}

function turnResultsOverlayOff() {
    this.style.display = 'none';
}


// Animations Start Here

// this function applies an animation to a selected node.
function animateCSS(element, animationName, background, duration) {
    const animate = document.querySelector(element)
    animate.classList.add('animated', animationName, background, duration)
}
// this function removes an animation to a selected node.
function handleAnimationEnd(element, animationName, background, duration) {
    const animate = document.querySelector(element)
    animate.classList.remove('animated', animationName, background, duration)
}

// Animate players turn - background colour and animation.
function highlightPlayer() {
    if (trackPlayersTurn % 2 === 0) {
        animateCSS('.playerOne', 'pulse', 'playerBackground', 'infinite');
        handleAnimationEnd('.playerTwo', 'pulse', 'playerBackground', 'infinite');
    } else {
        animateCSS('.playerTwo', 'pulse', 'playerBackground', 'infinite');
        handleAnimationEnd('.playerOne', 'pulse', 'playerBackground', 'infinite');
    };
}

// Animations End Here


gameBoard();
highlightPlayer();
respondToGameBoard();