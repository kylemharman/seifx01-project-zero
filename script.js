let board;
const getBoardPosition = Array.from(document.querySelectorAll('.board td'));
let trackPlayersTurn = 0;

function gameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
}

// respond to the player clicking a position. Check for winning combination after every play. 
function respondToGameBoard() {
    for (let i = 0; i < getBoardPosition.length; i++) {
        getBoardPosition[i].addEventListener('click', playersTurn, { once: true }); // find alternative to once. , { once: true }
        getBoardPosition[i].addEventListener('click', updateGameBoard);
        getBoardPosition[i].addEventListener('click', findWinner);
    }
}

// track players turn and return either X or O. This gets called from the respondToGameBoard function. 
function playersTurn() {
    if (trackPlayersTurn % 2 === 0) {
        this.textContent = 'X';
        trackPlayersTurn++
    } else {
        this.textContent = 'O';
        trackPlayersTurn++;
    };
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
    let playerOne = 0;
    let playerTwo = 0;
    const playerOneCurrentScore = document.getElementById('playerOneScore');
    const playerTwoCurrentScore = document.getElementById('playerTwoScore');

    if (trackPlayersTurn % 2 !== 0) {
        playerOne++;
        playerOneCurrentScore.textContent = playerOne;
        winnerScreen();
    } else {
        playerTwo++;
        playerTwoCurrentScore.textContent = playerTwo;
        winnerScreen();
    }
}

function winnerScreen() {

};

function highlightPlayer() {
    const playerOne = document.getElementById('playerOne');
    const playerTwo = document.getElementById('playerTwo');
}

gameBoard();
respondToGameBoard();


console.log(getBoardPosition)
console.log(board)