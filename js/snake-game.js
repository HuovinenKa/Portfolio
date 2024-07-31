
const snakeGameboard = document.getElementById('gameboard');
const controls = document.getElementById('snakeControls');
const startButton = document.getElementById('startButton');
const rows = 20;
const cols = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = { x: 15, y: 15 };
let interval;
let upKey = 'w';
let leftKey = 'a';
let downKey = 's';
let rightKey = 'd';

function createBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const snakeCell = document.createElement('div');
      snakeCell.classList.add('snakeCell');
      snakeCell.id = `snakeCell-${i}-${j}`;
      snakeGameboard.appendChild(snakeCell);
    }
  }
}

function drawSnake() {
  snake.forEach(segment => {
    const snakeCell = document.getElementById(`snakeCell-${segment.x}-${segment.y}`);
    snakeCell.classList.add('snake');
  });
}

function drawFood() {
  const foodCell = document.getElementById(`snakeCell-${food.x}-${food.y}`);
  foodCell.classList.add('food');
}

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.x--;
      break;
    case 'down':
      head.x++;
      break;
    case 'left':
      head.y--;
      break;
    case 'right':
      head.y++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * rows);
    food.y = Math.floor(Math.random() * cols);
  } else {
    snake.pop();
  }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
      gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
      }
    }
  }

function gameOver() {
  clearInterval(interval);
  alert('Game Over!');
  location.reload();
}

function gameLoop() {
  moveSnake();
  checkCollision();
  snakeGameboard.innerHTML = '';
  createBoard();
  drawSnake();
  drawFood();
}

startButton.addEventListener('click', () => {
//  createBoard();
//  drawSnake();
  drawFood();
  interval = setInterval(gameLoop, 100);
});


// Pidetään pelialue koko ajan näkyvillä
createBoard();
drawSnake();

/*
controls.addEventListener('input', (event) => {
  const inputId = event.target.id;
  const inputValue = event.target.value;
  switch (inputId) {
    case 'up':
      upKey = inputValue;
      break;
    case 'left':
      leftKey = inputValue;
      break;
    case 'down':
      downKey = inputValue;
      break;
    case 'right':
      rightKey = inputValue;
      break;
  }
});
*/

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key === upKey && direction !== 'down') {
    direction = 'up';
  } else if (key === downKey && direction !== 'up') {
    direction = 'down';
  } else if (key === leftKey && direction !== 'right') {
    direction = 'left';
  } else if (key === rightKey && direction !== 'left') {
    direction = 'right';
  }
});
