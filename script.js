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
function gameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
}

// updates the results array with true for X and false for O
function updateGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        if (getBoardPosition[i].innerHTML === crossIcon) {
            board[i] = true;
            console.log("update gameboard with X")
        } else if (getBoardPosition[i].innerHTML === circleIcon) {
            board[i] = false;
            console.log("update gameboard with O")
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
            console.log("players turn update from x")
            console.log("track players turn x " + trackPlayersTurn)
            
        } else if (computer === false) {
            this.innerHTML = circleIcon;
            trackPlayersTurn = true;
        }
    updateGameBoard();
    findWinner();
    draw();
    highlightPlayer();
    setTimeout(computerLogic, 1000);
    console.log(board)
    }
}
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
    trackPlayersTurn = true;
    console.log("track players turn o " + trackPlayersTurn)
    updateGameBoard();
    findWinner();
    draw();
    highlightPlayer();
    console.log("computer logic gameboard update")
    console.log("computer logic run finished")
    console.log(board)   
}

function computerMode() {
    document.querySelector('.multiplayerMode').classList.remove('settingsMenuSelected') 
    document.querySelector('.computerMode').classList.add('settingsMenuSelected')
    computer = true;
}

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
        console.log("find winner executed")
        return true;
        
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
        // return true;
    }
}
// clears the game board and results array for a new round
function resetGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].innerHTML = '';
    }
    gameBoard();
    computerLogic();
}

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
function turnResultsOverlayOff() {
    handleAnimationEnd('.overlay', 'fadeIn');
    animateCSS('.overlay', 'fadeOut', '.removeOverlay', 'faster')
    setTimeout(clearAnimationClasses, 500);
}
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
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}
// close settings nav
function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";
}

// ANIMATIONS END HERE


gameBoard();
computerLogic();
highlightPlayer();
respondToGameBoard();