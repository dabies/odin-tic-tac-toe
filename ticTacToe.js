//cache DOM
const $playBtn = document.querySelector('.play');
const $boardBtn = document.querySelectorAll('.square');
const $banner = document.querySelector('.banner');
const $playerOneName = document.getElementById('playerOne');
const $playerTwoName = document.getElementById('playerTwo');

//array for squares
const boardArray = [];

//bind events
$playBtn.addEventListener('click', startGame);
//function that ensures player names have been input, then adds the makeMove function
//to each square. finally it announces the player who is supposed to make the first move
//and disables the player from changing player names after game has started
function startGame() {
    if (!$playerOneName.value || !playerTwo.value) {
        display.onBanner('Must fill out player names before playing.')
    } else {
        $boardBtn.forEach((item) => {
            item.addEventListener('click', Player.addMakeMove);
            boardArray.push(item);
        });
        if (counter.getCount() % 2 === 0) {
            display.onBanner(`${$playerOneName.value}'s turn`);
            } else {
                display.onBanner(`${$playerTwoName.value}'s turn`);
            }
        display.disableInputs($playerOneName, $playerTwoName);
    }
}
// bind event to attach reset function to button
const reset = () => $playBtn.addEventListener('click', display.resetBoard);

//basic counter function to keep track of turns
const counter = (function() {
    let count = 0;

    const getCount = () => count;
    const addCount = () => count++;

    return {getCount, addCount}
})();

//player function, stores player name and player number to assign their token
const Player = (function() {
    const create = function(name, number) {
        let marker;
    
        if (number === '1') {
            marker= 'X';
        } else if (number === '2') {
            marker= 'O';
        } else {
            alert('Stop trying to hack my program');
        }
    
        const token = () => marker;
    
        return {name, token};
    }
// function to add the makeMove function to an event listener
    const addMakeMove = (event) => Player.makeMove(event);

//function for making moves in game. creates the two players, and then checks whose turn
//it is using the counter function, after first making sure the square is empty
//after every move, the board is scanned to see if a player has won
    const makeMove = function(event) {
        let playerOne = Player.create($playerOneName.value, '1');
        let playerTwo = Player.create($playerTwoName.value, '2');
    
        if (counter.getCount() % 2 === 0) {
            if (event.target.textContent != '') {
                display.onBanner('Someone has already made a move in that square.')
            } else {
                event.target.textContent = `${playerOne.token()}`;
                counter.addCount();
                display.onBanner(`${playerTwo.name}'s turn`);
                gameBoard.findWinner(boardArray);
            }
        } else {
            if (event.target.textContent != '') {
                display.onBanner('Someone has already made a move in that square.')
            } else {
                event.target.textContent = `${playerTwo.token()}`;
                counter.addCount();
                display.onBanner(`${playerOne.name}'s turn`);
                gameBoard.findWinner(boardArray);
            }
        }
    }

    return {create, makeMove, addMakeMove}
})();

//function to handle any display related events
const display = (function() {
    //function that resets the gameboard
    const resetBoard = function() {
        $boardBtn.forEach((item) => {
            item.textContent = '';
        })};
    //function for changing text of button
    const onPlayButton = (string) => $playBtn.textContent = string;
    //function for changing text on display banner
    const onBanner = (string) => $banner.textContent = string;
    //function to disable the inputs after the game has started
    const disableInputs = function(inputOne, inputTwo) {
        inputOne.readOnly = true;
        inputTwo.readOnly = true;
    }

    return {resetBoard, onBanner, disableInputs, onPlayButton}
})();

//function to handle all game board related events
const gameBoard = (function() {
//function that scans for possible win conditions and declares winner if one is found
    const findWinner = function(array) {
        if (array[0].textContent === 'X' && array[1].textContent === 'X' && array[2].textContent === 'X' ||
        array[3].textContent === 'X' && array[4].textContent === 'X' && array[5].textContent === 'X' ||
        array[6].textContent === 'X' && array[7].textContent === 'X' && array[8].textContent === 'X' ||
        array[0].textContent === 'X' && array[4].textContent === 'X' && array[8].textContent === 'X' ||
        array[2].textContent === 'X' && array[4].textContent === 'X' && array[6].textContent === 'X' || 
        array[0].textContent === 'X' && array[3].textContent === 'X' && array[6].textContent === 'X' ||
        array[1].textContent === 'X' && array[4].textContent === 'X' && array[7].textContent === 'X' ||
        array[2].textContent === 'X' && array[5].textContent === 'X' && array[8].textContent === 'X') {
            display.onBanner(`${playerOne.value} won!`);
            stopGame();
            display.onPlayButton('Reset');
            reset();
            
        } else if (array[0].textContent === 'O' && array[1].textContent === 'O' && array[2].textContent === 'O' ||
        array[3].textContent === 'O' && array[4].textContent === 'O' && array[5].textContent === 'O' ||
        array[6].textContent === 'O' && array[7].textContent === 'O' && array[8].textContent === 'O' ||
        array[0].textContent === 'O' && array[4].textContent === 'O' && array[8].textContent === 'O' ||
        array[2].textContent === 'O' && array[4].textContent === 'O' && array[6].textContent === 'O' ||
        array[0].textContent === 'O' && array[3].textContent === 'O' && array[6].textContent === 'O' ||
        array[1].textContent === 'O' && array[4].textContent === 'O' && array[7].textContent === 'O' ||
        array[2].textContent === 'O' && array[5].textContent === 'O' && array[8].textContent === 'O') {
            display.onBanner(`${playerTwo.value} won!`)
            stopGame();
            display.onPlayButton('Reset');
            reset();
        }
    }
//function to stop game if someone has won
    function stopGame() {
        $boardBtn.forEach((item) => {
            item.removeEventListener('click', Player.addMakeMove);
        });
    }

    return {findWinner, stopGame}
})();