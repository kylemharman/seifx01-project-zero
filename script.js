const board = Array.from(document.getElementsByTagName('td'));

let trackPlayersTurn = 0; 

// respond to the player clicking a position. 
function respondToBoard() {
    const getBoard = document.getElementsByTagName('td');
    for (let i = 0; i < getBoard.length; i++) {   
        getBoard[i].addEventListener('click', playersTurn, { once: true }) // find alternative to once. 
        getBoard[i].addEventListener('click', findWinner);
    }    
    console.log(getBoard)
    console.log(board)
}



// track players turn and return either X or O. This gets passed to respondToBoard function. 
function playersTurn() {
    if (trackPlayersTurn % 2 == 0) {
        // board.push(1);
        this.innerHTML = 'X';
        trackPlayersTurn++
    } else {
        this.innerHTML = 'O';
        // board.push(-1);
        trackPlayersTurn++;     
    }    
}

function findWinner() {
    if (board[0] === 1 && board[2] === 1 && board[4] === 1) {
        console.log("winner");
        console.log(board);
    }
}


function highlightPlayer(){
    const playerOne = document.getElementById('playerOne');
    const playerTwo = document.getElementById('playerTwo');
}

respondToBoard();
findWinner(); 