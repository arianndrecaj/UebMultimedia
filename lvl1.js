let size = 3; // Changed to 3 for a 3x3 puzzle
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;

let buttonContainer = document.getElementById('tiles');

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const UP_ARROW = 38; // Changed to 38 for moving up
const DOWN_ARROW = 40; // Changed to 40 for moving down
window.onkeydown = function (event) {
    console.log(event.keyCode);
    if (event.keyCode === RIGHT_ARROW) {
        swap(highlighted + 1);
    } else if (event.keyCode === LEFT_ARROW) {
        swap(highlighted - 1);
    } else if (event.keyCode === UP_ARROW) {
        swap(highlighted - size); // Adjusted for moving up
    } else if (event.keyCode === DOWN_ARROW) {
        swap(highlighted + size); // Adjusted for moving down
    }
};

newGame();

function newGame() {
    loadTiles(size);
    setTimeout(() => {
        shuffle();
    }, 500);
}

function loadTiles(n) {
    for (let b = 1; b <= numberOfTiles; b++) {
        var newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
        });
        buttonContainer.append(newTile);
    }
    selectedTileId = 'btn' + highlighted;
    selectedTile = document.getElementById(selectedTileId);
    selectedTile.classList.add("selected");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = highlighted + 1;
            } else if (x == 1) {
                direction = highlighted - 1;
            } else if (x == 2) {
                direction = highlighted + size;
            } else if (x == 3) {
                direction = highlighted - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

function swap(clicked) {
    if (clicked < 1 || clicked > (numberOfTiles)) {
        return;
    }

    if (clicked == highlighted + 1) {
        if (clicked % size != 1) {
            setSelected(clicked);
        }
    } else if (clicked == highlighted - 1) {
        if (clicked % size != 0) {
            setSelected(clicked);
        }
    } else if (clicked == highlighted + size) {
        setSelected(clicked);
    } else if (clicked == highlighted - size) {
        setSelected(clicked);
    }

    if (shuffled) {
        if (checkHasWon()) {
            alert("Winner!")
        }
    }
}

function checkHasWon() {
    let allTilesCorrect = true;
    for (let b = 1; b <= numberOfTiles; b++) {
        const currentTile = document.getElementById(`btn${b}`);
        const currentTileIndex = currentTile.getAttribute('index');
        const currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) !== parseInt(currentTileValue)) {
            allTilesCorrect = false;
            break;
        }
    }
    if (allTilesCorrect) {
        const levelCompletedButton = document.createElement('button');
        levelCompletedButton.innerText = 'Level Completed! Go to Next Level';
        levelCompletedButton.classList.add('level-completed-button');
        levelCompletedButton.addEventListener('click', function() {
            window.location.href = 'puzzle.html'; // Redirect to puzzle.html
        });
        buttonContainer.appendChild(levelCompletedButton);
        return true;
    }
    return false;
}

function setSelected(index) {
    currentTile = document.getElementById(`btn${highlighted}`);
    currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    newTile = document.getElementById(`btn${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    newTile.innerHTML = currentTileText;
    newTile.classList.add("selected");
    highlighted = index;
}



