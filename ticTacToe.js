function createPlayer(name, number) {
    let token;

    if (number === '1') {
        token= 'X';
    } else if (numer === '2') {
        token= 'O';
    } else {
        alert('Stop trying to hack my program');
    }

    const getToken = () => token;

    return {name, getToken};
}

function render() {

}

function bindEvents() {

}

function makeMove(token, square) {

}

function declareWinner(name) {
    
}