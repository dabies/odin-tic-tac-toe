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
function startGame() {
    $boardBtn.forEach((item) => {
        item.addEventListener('click', makeMove);
        boardArray.push(item);
    });
    display.onBanner(`${$playerOneName.value}'s turn`)
}

function createPlayer(name, number) {
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

const counter = (function() {
    let count = 0;

    const getCount = () => count;
    const addCount = () => count++;

    return {getCount, addCount}
})();

function makeMove(event) {
    let playerOne = createPlayer($playerOneName.value, '1');
    let playerTwo = createPlayer($playerTwoName.value, '2');

    if (counter.getCount() % 2 === 0) {
        if (event.target.textContent != '') {
            display.onBanner('Someone has already made a move in that square.')
        } else {
            event.target.textContent = `${playerOne.token()}`;
            counter.addCount();
            display.onBanner(`${playerTwo.name}'s turn`);
            readBoard(boardArray);
        }
    } else {
        if (event.target.textContent != '') {
            display.onBanner('Someone has already made a move in that square.')
        } else {
            event.target.textContent = `${playerTwo.token()}`;
            counter.addCount();
            display.onBanner(`${playerOne.name}'s turn`);
            readBoard(boardArray);
        }
    }
}

const display = (function() {
    const resetBoard = function() {
        $boardBtn.forEach((item) => {
            item.textContent = '';
        })};

    const onBanner = (string) => $banner.textContent = string;

    return {resetBoard, onBanner}
})();



function stopGame() {

}

function readBoard(array) {
    if (array[0].textContent === 'X' && array[1].textContent === 'X' && array[2].textContent === 'X' ||
    array[3].textContent === 'X' && array[4].textContent === 'X' && array[5].textContent === 'X' ||
    array[6].textContent === 'X' && array[7].textContent === 'X' && array[8].textContent === 'X' ||
    array[0].textContent === 'X' && array[4].textContent === 'X' && array[8].textContent === 'X' ||
    array[2].textContent === 'X' && array[4].textContent === 'X' && array[6].textContent === 'X') {
        display.onBanner(`${playerOne.value} won!`);
    } else if (array[0].textContent === 'O' && array[1].textContent === 'O' && array[2].textContent === 'O' ||
    array[3].textContent === 'O' && array[4].textContent === 'O' && array[5].textContent === 'O' ||
    array[6].textContent === 'O' && array[7].textContent === 'O' && array[8].textContent === 'O' ||
    array[0].textContent === 'O' && array[4].textContent === 'O' && array[8].textContent === 'O' ||
    array[2].textContent === 'O' && array[4].textContent === 'O' && array[6].textContent === 'O') {
        display.onBanner(`${playerTwo.value} won!`)
    }
}