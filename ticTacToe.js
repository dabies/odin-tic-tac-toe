//cache DOM
const $playBtn = document.querySelector('.play');
const $boardBtn = document.querySelectorAll('.square');
const $banner = document.querySelector('.banner');
const $playerOneName = document.getElementById('playerOne');
const $playerTwoName = document.getElementById('playerTwo');

//bind events
$playBtn.addEventListener('click', startGame);
function startGame() {
    $boardBtn.forEach((item) => {
        item.addEventListener('click', makeMove);
    });
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

const game = (function() {
    let playerOne = createPlayer($playerOneName.value, '1');
    let playerTwo = createPlayer($playerTwoName.value, '2');

    return {playerOne, playerTwo}
})();

function makeMove(event) {
    if (counter.getCount() % 2 === 0) {
        event.target.textContent = `${game.playerOne.token()}`;
        counter.addCount();
    } else {
        event.target.textContent = `${game.playerTwo.token()}`;
        counter.addCount();
    }
}

function declareWinner() {

}