const landingPage = document.querySelector('.landing-page');
const startButton = document.querySelector('#startButton');
const puzzleContainer = document.querySelector('.puzzle-container');
const moves = document.querySelector('.moves');
const puzzle = document.querySelector('.puzzle');
let currentElement = "";
let movesCount = 0;
let imagesArr = [];

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

// Random number for image
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

// Get row and column value from data-position
const getCoords = (element) => {
    const [row, col] = element.getAttribute("data-position").split("_");
    return [parseInt(row), parseInt(col)];
};

// row1, col1 are image coordinates while row2 and col2 are blank image coordinates
const checkAdjacent = (row1, row2, col1, col2) => {
    if (row1 === row2) {
        // left/right
        if (col2 === col1 - 1 || col2 === col1 + 1) {
            return true;
        }
    } else if (col1 === col2) {
        // up/down
        if (row2 === row1 - 1 || row2 === row1 + 1) {
            return true;
        }
    }
    return false;
};

const randomImages = () => {
    while (imagesArr.length < 8) {
        let randomVal = randomNumber();
        if (!imagesArr.includes(randomVal)) {
            imagesArr.push(randomVal);
        }
    }
    imagesArr.push(9);
};

startButton.addEventListener("click", () => {
    landingPage.style.display = 'none';
    puzzleContainer.style.display = 'flex';
    movesCount = 0;
    moves.innerText = `Moves: ${movesCount}`;
    imagesArr = [];
    randomImages();
    puzzle.innerHTML = ''; // Clear previous puzzle
    generateGrid();
});

// Generate images in grid
const generateGrid = () => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-position", `${i}_${j}`);
            div.addEventListener("click", selectImage);
            div.classList.add("image-container");
            div.innerHTML = `<img src="images/image_part_00${
                imagesArr[count]
            }.jpg" class="image ${
                imagesArr[count] === 9 ? "target" : ""
            }" data-index="${imagesArr[count]}"/>`;
            count += 1;
            puzzle.appendChild(div);
        }
    }
};

// Switching puzzle
const selectImage = (e) => {
    e.preventDefault();
    // Set currentElement
    currentElement = e.target;
    // target (blank image)
    let targetElement = document.querySelector(".target");
    let currentParent = currentElement.parentElement;
    let targetParent = targetElement.parentElement;

    // get row and col values for both elements
    const [row1, col1] = getCoords(currentParent);
    const [row2, col2] = getCoords(targetParent);

    if (checkAdjacent(row1, row2, col1, col2)) {
        // Swap
        currentElement.remove();
        targetElement.remove();
        // Get image index (to be used later for manipulating array)
        let currentIndex = parseInt(currentElement.getAttribute("data-index"));
        let targetIndex = parseInt(targetElement.getAttribute("data-index"));
        // Swap Index
        currentElement.setAttribute("data-index", targetIndex);
        targetElement.setAttribute("data-index", currentIndex);
        // Swap Images
        currentParent.appendChild(targetElement);
        targetParent.appendChild(currentElement);
        // Array swaps
        let currentArrIndex = imagesArr.indexOf(currentIndex);
        let targetArrIndex = imagesArr.indexOf(targetIndex);
        [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
            imagesArr[targetArrIndex],
            imagesArr[currentArrIndex],
        ];

        // Win condition
        if (imagesArr.join("") === "123456789") {
            setTimeout(() => {
                alert(`Congratulations! You solved the puzzle in ${movesCount} moves!`);
                landingPage.style.display = '';
                puzzleContainer.style.display = 'none';
                startButton.innerText = "Restart Game";
            }, 1000);
        }
        // Increment and display move count
        movesCount += 1;
        moves.innerText = `Moves: ${movesCount}`;
    }
};