// Variables
let gridSize = 18;
let velocity = { x: 0, y: 0 };
let snake = [{ x: 12, y: 10 }];
let foodDir = { x: 3, y: 5 };
let startTime = 0;
let score = 0;
let speed = 10;
const board = document.querySelector('.board');
const easy = document.querySelector('#easy');
const medium = document.querySelector('#medium');
const hard = document.querySelector('#hard');
const scoreDisplay = document.querySelector('#score');




// operational functions
function collision(snakeArray) {
    for (let i = 1; i < snake.length; i++) {
        if (snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        }
    }
    if (snakeArray[0].x > gridSize || snakeArray[0].x <= 0 || snakeArray[0].y <= 0 || snakeArray[0].y > gridSize) {
        return true;
    }
    return false;
}

function game() {

    // ifcollision
    if (collision(snake)) {
        snake = [{ x: 12, y: 10 }];
        velocity = { x: 0, y: 0 };
        alert(`Game over! Your score ${score}`);
        score = 0;
        scoreDisplay.innerHTML = `${score}`;
    }

    //movingsnake
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += velocity.x;
    snake[0].y += velocity.y;

    // addingNewfood
    if (snake[0].x === foodDir.x && snake[0].y === foodDir.y) {
        snake.unshift({ x: snake[0].x + velocity.x, y: snake[0].y + velocity.y });
        foodDir = { x: 2 + Math.round(16 * Math.random()), y: 2 + Math.round(16 * Math.random()) };
        score += 1;
        scoreDisplay.innerHTML = `${score}`;
    }

    // determining the speed of snake
    easy.addEventListener('click', () => {
        speed = 5;
    });
    medium.addEventListener('click', () => {
        speed = 10;
    });
    hard.addEventListener('click', () => {
        speed = 15;
    });


    // displaying snake
    board.innerHTML = '';
    snake.forEach((e, index) => {
        let snakebody = document.createElement('div');
        snakebody.style.gridRowStart = e.x;
        snakebody.style.gridColumnStart = e.y;
        if (index === 0) {
            snakebody.classList.add('head');
        }
        else {
            snakebody.classList.add('snake');
        }
        board.appendChild(snakebody);
    });

    let foodbody = document.createElement('div');

    foodbody.style.gridRowStart = foodDir.x;
    foodbody.style.gridColumnStart = foodDir.y;
    foodbody.classList.add('food');
    board.appendChild(foodbody);
}

// game functions
window.requestAnimationFrame(main);
function main(ctime) {
    // console.log(ctime);
    window.requestAnimationFrame(main);
    if ((ctime - startTime) / 1000 < 1 / speed) {
        return;
    }
    startTime = ctime;
    game();
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (velocity.x == 1 && velocity.y == 0) {
                break;
            }
            velocity.x = -1;
            velocity.y = 0;
            break;

        case "ArrowDown":
            if (velocity.x == -1 && velocity.y == 0) {
                break;
            }
            velocity.x = 1;
            velocity.y = 0;
            break;

        case "ArrowLeft":
            if (velocity.x == 0 && velocity.y == 1) {
                break;
            }
            velocity.x = 0;
            velocity.y = -1;
            break;

        case "ArrowRight":
            if (velocity.x == 0 && velocity.y == -1) {
                break;
            }
            velocity.x = 0;
            velocity.y = 1;
            break;
        default:
            break;
    }
});