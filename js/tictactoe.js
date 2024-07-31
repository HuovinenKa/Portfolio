let currentPlayer = 'X';
let gameEnded = false;
let cells = document.querySelectorAll('.cell');

function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            cells[a].style.backgroundColor = 'yellow';
            cells[b].style.backgroundColor = 'yellow';
            cells[c].style.backgroundColor = 'yellow';
            gameEnded = true;
            return cells[a].innerText;
        }
    }

    if (!Array.from(cells).some(cell => cell.innerText === '')) {
        gameEnded = true;
        return 'draw';
    }

    return null;
}

function cellClicked(index) {
    if (gameEnded || cells[index].innerText !== '') return;

    cells[index].innerText = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            alert('It\'s a draw!');
        } else {
            alert(`Player ${winner} wins!`);
        }
        gameEnded = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#ddd';
    });
    gameEnded = false;
    currentPlayer = 'X';
}