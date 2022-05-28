const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container');
const word = 'HELLO';

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER',
    'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<'
];

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);

    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.setAttribute('class', 'tile');
        rowElement.append(tileElement);
    });

    tileDisplay.append(rowElement);
});

const addLetter = (letter) => {
    if(currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
        console.log('guessRows: ', guessRows);
    }
}

const deleteLetter = () => {
    if(currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => {
        messageDisplay.removeChild(messageElement);
    }, 2000);
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data');

        setTimeout(() => {
            tile.classList.add('flip');
            if(dataLetter == word[index]) {
                tile.classList.add('green-overlay');
            } else if(word.includes(dataLetter)) {
                tile.classList.add('yellow-overlay');
            } else {
                tile.classList.add('grey-overlay');
            }
        }, 500 * index);
    });
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    
    if(currentTile > 4) {
        console.log('Guess: ' + guess + ' Word: ' + word);
        flipTile();
        if(guess === word) {
            showMessage("You Win!");
            isGameOver = true;
            return;
        } else {
            if(currentRow >= 5) {
                showMessage("You Lose!");
                isGameOver = true;
                return;
            }
            if(currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const handleClick = (letter) => {
    //console.log('Clicked ' + letter);
    if(letter === '<<') {
        deleteLetter();
        return;
    }
    if(letter === 'ENTER') {
        checkRow();
        return;
    }
    addLetter(letter);
}

keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key));
    keyboard.append(buttonElement);
});

