const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const clearButton = document.getElementById('clear')
const rowInput = document.getElementById('rows');
const colorInput = document.getElementById('color');
const delayInput = document.getElementById('delay');
const container = document.getElementById('pyramid');
const contents = document.querySelector('.content');

let intervalId;
let currentRow = 0;
let isPaused = false;

function getMaxRows() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 425) {
        return 12;
    } else if (screenWidth <= 768) {
        return 20;
    } else {
        return 40;
    }
}

startButton.addEventListener('click', () => {
    const rows = parseInt(rowInput.value);
    const color = colorInput.value;
    const delay = parseInt(delayInput.value);
    const maxRows = getMaxRows();

    if (isNaN(rows) || rows <= 0 || !color || isNaN(delay) || delay < 100) {
        alert('Please enter valid details');
        return;
    }

    if (rows > maxRows) {
        alert(`On this screen size, only ${maxRows} rows are allowed. Please enter a number between 1 to ${maxRows}`);
        return;
    }

    contents.style.display = 'none';

    if (currentRow === 0) {
        container.innerHTML = '';
        for (let i = 1; i <= rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < i; j++) {
                const block = document.createElement('div');
                block.classList.add('block');
                row.appendChild(block);
            }
            container.appendChild(row);
        }
    }

    const rowsElements = document.querySelectorAll('.row');
    clearInterval(intervalId);

    if (isPaused) {
        isPaused = false;
    }

    intervalId = setInterval(() => {
        if (currentRow < rowsElements.length) {
            rowsElements.forEach((row, index) => {
                row.childNodes.forEach((block) => {
                    block.style.background = index === currentRow ? color : '';
                });
            });
            currentRow++;
        } else {
            currentRow = 0;
        }
    }, delay);
});

stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    isPaused = true;
});

clearButton.addEventListener('click', () => {
    clearInterval(intervalId);
    currentRow = 0;
    container.innerHTML = ''; 
    rowInput.value = '';
    colorInput.value = '';
    delayInput.value = '';
    contents.style.display = 'flex';
    isPaused = false;

    
    // contents.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const rect = contents.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        contents.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});


const startGameButton = document.getElementById('start-game-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');

startGameButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');

    setTimeout(() => {

        startScreen.style.display = 'none';

        gameContainer.style.display = 'flex';  
        gameContainer.classList.add('visible');  
        
    }, 1000);  
});

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
    
        document.body.style.overflow = 'hidden';
    });

    input.addEventListener('blur', () => {

        document.body.style.overflow = '';
    });
});

// kmkmkmmmmm