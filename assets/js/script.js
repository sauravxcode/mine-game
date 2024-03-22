// Selecting the button container element
const buttonContainer = document.querySelector('.button-container');

// Define paths for images and videos
const imageSrc = 'assets/img/icon/8.png'; // Icon image path
const bombSrc = 'assets/img/icon/9.png'; // Bomb image path
const winVideoSrc = 'assets/video/win.mp4'; // Video background path for winning
const loseVideoSrc = 'assets/video/lose.mp4'; // Video background path for losing

// Variables to track the bomb index and game state
let bombIndex;
let gameEnded = false;

// Function to create buttons with image
function createButtons() {
    // Generate random bomb index
    bombIndex = Math.floor(Math.random() * 25);

    // Loop to create buttons
    for (let i = 0; i < 25; i++) {
        const button = document.createElement('div');
        button.classList.add('cell');
        button.classList.add('random-button'); // Apply random-button class
        button.dataset.index = i; // Set data-index attribute
        button.addEventListener('click', () => {
            if (gameEnded) return; // Prevent further clicks after game ends
            if (i === bombIndex) {
                revealBomb(button);
                gameOver();
            } else {
                revealImage(button);
                checkWin();
            }
        });
        buttonContainer.appendChild(button);
    }
}

// Function to reveal image on button click
function revealImage(button) {
    if (!button.classList.contains('clicked')) {
        const image = document.createElement('img');
        image.src = imageSrc;
        button.appendChild(image);
        setTimeout(() => { // Delay adding 'clicked' class to allow image insertion
            button.classList.add('clicked'); // Add the 'clicked' class to the button
        }, 10); // Adjust the delay as needed
    }
}

// Function to reveal bomb on button click
function revealBomb(button) {
    if (!button.classList.contains('clicked')) {
        const image = document.createElement('img');
        image.src = bombSrc;
        button.appendChild(image);
        button.classList.add('clicked');
    }
}

// Function to handle game over
function gameOver() {
    gameEnded = true;
    const video = document.createElement('video');
    video.src = loseVideoSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = false;
    video.classList.add('video-background');
    document.body.appendChild(video);
    
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Restart Game';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', () => {
        resetGame();
        document.body.removeChild(video);
    });
    document.body.appendChild(restartButton);
}

// Function to reset the game
function resetGame() {
    gameEnded = false;
    buttonContainer.innerHTML = '';
    createButtons();
    const restartButton = document.querySelector('.restart-button');
    if (restartButton) {
        restartButton.parentNode.removeChild(restartButton);
    }
}

// Function to check if the player has won
function checkWin() {
    const clickedButtons = document.querySelectorAll('.clicked');
    if (clickedButtons.length === 24) { // Total cells - bomb
        gameEnded = true;
        const video = document.createElement('video');
        video.src = winVideoSrc;
        video.autoplay = true;
        video.loop = true;
        video.muted = false;
        video.classList.add('video-background');
        document.body.appendChild(video);
        
        const restartButton = document.createElement('button');
        restartButton.innerText = 'Restart Game';
        restartButton.classList.add('restart-button');
        restartButton.addEventListener('click', () => {
            resetGame();
            document.body.removeChild(video);
        });
        document.body.appendChild(restartButton);
    }
}

// Initialize the game
createButtons();
