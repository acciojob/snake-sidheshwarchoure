//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreBoard = document.createElement('div');
scoreBoard.classList.add('scoreBoard');
scoreBoard.textContent = 'Score: 0';
gameContainer.appendChild(scoreBoard);

let score = 0;
let direction = 'right';
let snakeBody = [201, 202, 203];
let foodPosition = Math.floor(Math.random() * 1600); // generate random number between 0 and 1599

// add snake body to game container
for (let i = 0; i < snakeBody.length; i++) {
  const snakeBodyPixel = document.createElement('div');
  snakeBodyPixel.classList.add('pixel', 'snakeBodyPixel');
  snakeBodyPixel.id = `pixel${snakeBody[i]}`;
  gameContainer.appendChild(snakeBodyPixel);
}

// add food to game container
const food = document.createElement('div');
food.classList.add('pixel', 'food');
food.id = `pixel${foodPosition}`;
gameContainer.appendChild(food);

// start moving the snake
const intervalId = setInterval(() => {
  let head = snakeBody[snakeBody.length - 1];

  // determine new head position based on direction
  if (direction === 'right') {
    head += 1;
  } else if (direction === 'left') {
    head -= 1;
  } else if (direction === 'up') {
    head -= 40;
  } else if (direction === 'down') {
    head += 40;
  }

  // check for collision with walls or snake body
  if (head < 1 || head > 1600 || (head % 40 === 0 && direction === 'right') || ((head - 1) % 40 === 0 && direction === 'left') || snakeBody.includes(head)) {
    clearInterval(intervalId);
    alert(`Game over! Your score is ${score}`);
    return;
  }

  snakeBody.push(head);

  // check for collision with food
  if (head === foodPosition) {
    score += 10;
    scoreBoard.textContent = `Score: ${score}`;
    foodPosition = Math.floor(Math.random() * 1600);
    food.id = `pixel${foodPosition}`;
  } else {
    const tail = snakeBody.shift();
    const tailPixel = document.getElementById(`pixel${tail}`);
    tailPixel.classList.remove('snakeBodyPixel');
  }

  // move the snake body pixels
  const headPixel = document.getElementById(`pixel${head}`);
  headPixel.classList.add('snakeBodyPixel');

}, 100);

// add event listener for keyboard input to change direction
document.addEventListener('keydown', (event) =>
