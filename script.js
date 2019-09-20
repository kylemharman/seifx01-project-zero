// global variables 
const getBoardPosition = Array.from(document.querySelectorAll('.board td'));
const crossIcon = document.querySelector('.crossIcon').innerHTML;
const circleIcon = document.querySelector('.circleIcon').innerHTML;
let board;
let trackPlayersTurn = true;
let playerOneScore = 0;
let playerTwoScore = 0;
let computer = true;

// GAME LOGIC STARTS HERE
// array to store results
const resultsArr = () => board = ['', '', '', '', '', '', '', '', ''];

// updates the results array with true for X and false for O
function updateGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        if (getBoardPosition[i].innerHTML === crossIcon) {
            board[i] = true;
        } else if (getBoardPosition[i].innerHTML === circleIcon) {
            board[i] = false;
        }
    }
}

// respond to the player clicking a position and the restart button.
function respondToGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].addEventListener('click', playersTurn);
    }
}

// track players turn and adds either X or O to game board board. Check for win or draw after every play.
function playersTurn() {
    if (this.innerHTML === '') {
        if (trackPlayersTurn) {
            this.innerHTML = crossIcon;
            trackPlayersTurn = false;
        } else if (computer === false) {
            this.innerHTML = circleIcon;
            trackPlayersTurn = true;
        }
        updateGameBoard();
        findWinner();
        draw();
        highlightPlayer();
        if (computer) setTimeout(computerLogic, 1000);
    }
}

// uses finds empty spaces on gameboard and randomly places an O into one of those spaces
function computerLogic() {
    if (computer && !trackPlayersTurn) {
        let emptySpaces = [];
        for (let i = 0; i < getBoardPosition.length; i++) {
            if (getBoardPosition[i].innerHTML === '')
                emptySpaces.push(i)
        } if (emptySpaces.length > 0) {
            let randomSpace = Math.floor(Math.random() * emptySpaces.length)
            let randomValue = emptySpaces[randomSpace];
            getBoardPosition[randomValue].innerHTML = circleIcon
        }
    }
    updateGameBoard();
    findWinner();
    draw();
    trackPlayersTurn = true;
    highlightPlayer();
}

// makes the computer mode icon in the menu blue and initiates computerLogic
function computerMode() {
    document.querySelector('.multiplayerMode').classList.remove('settingsMenuSelected')
    document.querySelector('.computerMode').classList.add('settingsMenuSelected')
    computer = true;
}

// makes the multiplayer mode icon in the menu blue and initiates turns off computer mode
function multiplayerMode() {
    document.querySelector('.computerMode').classList.remove('settingsMenuSelected')
    document.querySelector('.multiplayerMode').classList.add('settingsMenuSelected')
    computer = false;
}

//checks for a winner
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
        setTimeout(announceWinner, 500)
    }
}

// announces winner with an overlay
function announceWinner() {
    const wins = 'WINS'
    if (!trackPlayersTurn) {
        playerOneScore++;
        resultsOverlay(crossIcon, wins)
    } else {
        playerTwoScore++;
        resultsOverlay(circleIcon, wins)
    }
    updatePlayersScore();
    resetGameBoard();
}

// updates the players score
function updatePlayersScore() {
    const playerOneCurrentScore = document.querySelector('.playerOneScore');
    const playerTwoCurrentScore = document.querySelector('.playerTwoScore');
    playerOneCurrentScore.textContent = playerOneScore;
    playerTwoCurrentScore.textContent = playerTwoScore;
}

// announces a draw with overlay
function draw() {
    const drawIcons = [crossIcon, circleIcon]
    const gameTied = 'DRAW';
    if (board.includes('') === false) {
        resultsOverlay(drawIcons, gameTied);
        resetGameBoard();
    }
}

// clears the game board and results array for a new round
function resetGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].innerHTML = '';
    }
    resultsArr();
    if (computer) setTimeout(computerLogic, 1000);
}

// clears score
function resetScores() {
    playerOneScore = 0;
    playerTwoScore = 0;
    updatePlayersScore();
}

// Overlay to annouce who won the game or if the game was a tie. 
function resultsOverlay(icon, result) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'flex';
    if (icon[0] === crossIcon) {
        document.querySelector('.resultOverlayIcon').innerHTML = icon.join('');
    } else {
        document.querySelector('.resultOverlayIcon').innerHTML = icon;
    }
    document.querySelector('.resultOverlayText').innerHTML = result;
    overlay.addEventListener('click', turnResultsOverlayOff);
    setTimeout(turnResultsOverlayOff, 2200);
    animateCSS('.overlay', 'fadeIn');
}

// turns off the overlay
function turnResultsOverlayOff() {
    handleAnimationEnd('.overlay', 'fadeIn');
    animateCSS('.overlay', 'fadeOut', '.removeOverlay', 'faster')
    setTimeout(clearAnimationClasses, 500);
}

// clears the overlay
function clearAnimationClasses() {
    const overlay = document.querySelector('.overlay');
    handleAnimationEnd('.overlay', 'fadeOut', '.removeOverlay', 'faster')
    overlay.style.display = 'none';
}

// GAME LOGIC ENDS HERE

//  ANIMATIONS START HERE
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
    if (trackPlayersTurn) {
        animateCSS('.playerOne', 'pulse', 'playerBackground', 'infinite');
        handleAnimationEnd('.playerTwo', 'pulse', 'playerBackground', 'infinite');
    } else {
        animateCSS('.playerTwo', 'pulse', 'playerBackground', 'infinite');
        handleAnimationEnd('.playerOne', 'pulse', 'playerBackground', 'infinite');
    };
}

// open settings nav
const openNav = () => document.getElementById("mySidenav").style.width = "300px";

// close settings nav
const closeNav = () => document.getElementById("mySidenav").style.width = "0px";

// ANIMATIONS END HERE

// CALL FUNCTIONS
resultsArr();
computerLogic();
highlightPlayer();
respondToGameBoard();