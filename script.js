let leftBoxes = document.querySelectorAll(".left-boxes");
let rightBoxes = document.querySelectorAll(".right-boxes");
let buttons = document.querySelectorAll(".buttons");
let resultBoxes = document.querySelectorAll(".result-boxes");
// let checkButton = document.querySelector(".check");
let resetButton = document.querySelectorAll(".reset");
let isDifferent = true;

const modalWrapper = document.querySelector(".modal-wrapper");
const modal = document.querySelector(".modal");

const resultImages = [
  `<img src="./images/${Math.floor(Math.random() * 6)}.png">`,
  `<img src="./images/${Math.floor(Math.random() * 6)}.png">`,
  `<img src="./images/${Math.floor(Math.random() * 6)}.png">`,
  `<img src="./images/${Math.floor(Math.random() * 6)}.png">`,
];

let pressedButtons = [[], [], [], [], [], []];

let count = 0;

// Hiding result
for (let i = 0; i < resultImages.length; i++) {
  resultBoxes[i].style.visibility = "hidden";
}
resultBoxes[0].style.visibility = "hidden";

// adding innerHTML to resultboxes
for (let i = 0; i < resultImages.length; i++) {
  resultBoxes[i].innerHTML = resultImages[i];
}

// Check if user input are on the right places
let red = 0;
let yellow = 0;

// Pushing pressed buttons on click to left container

buttons.forEach((e) => {
  e.addEventListener("click", () => {
    if (isDifferent) {
      count++;

      // Pushing clicked buttons innerHTML to arrays and adding to left container boxes
      if (count <= 4) {
        pressedButtons[0].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[0][count - 1];
      } else if (count <= 8) {
        pressedButtons[1].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[1][count - 5];
      } else if (count <= 12) {
        pressedButtons[2].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[2][count - 9];
      } else if (count <= 16) {
        pressedButtons[3].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[3][count - 13];
      } else if (count <= 20) {
        pressedButtons[4].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[4][count - 17];
      } else if (count <= 24) {
        pressedButtons[5].push(e.innerHTML);
        leftBoxes[count - 1].innerHTML = pressedButtons[5][count - 21];
      }

      // Checking first row
      let resultImagesNew = [...resultImages];
      if (count === 4) {
        checkForCommon(pressedButtons[0], resultImagesNew);
        rowCheck(count);
      }

      // Checking second row

      if (count === 8) {
        checkForCommon(pressedButtons[1], resultImagesNew);
        rowCheck(count);
      }

      // Checking third row

      if (count === 12) {
        checkForCommon(pressedButtons[2], resultImagesNew);
        rowCheck(count);
      }

      // Checking fourth row

      if (count === 16) {
        checkForCommon(pressedButtons[3], resultImagesNew);
        rowCheck(count);
      }

      // Checking fifth row

      if (count === 20) {
        checkForCommon(pressedButtons[4], resultImagesNew);
        rowCheck(count);
      }

      // Checking sixth row

      if (count === 24) {
        checkForCommon(pressedButtons[5], resultImagesNew);
        rowCheck(count);
        // modalWrapper.classList.add("show");
        document
          .querySelector(".result-images-container")
          .classList.add("transition", "transform");
        // Showing result
        for (let i = 0; i < resultImages.length; i++) {
          resultBoxes[i].style.visibility = "visible";
        }
      }
    }
  });
});

// Function for checking if matches are on right or wrong places
function checkForCommon(arr1, arr2) {
  let currentLength = arr2.length;

  for (let i = 0; i < currentLength; i++) {
    if (arr2[i] === arr1[i]) {
      arr2.splice(i, 1);
      arr1.splice(i, 1);
      currentLength -= 1;
      i -= 1;
      red += 1;
    }
  }

  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      arr1.splice(
        arr1.findIndex((f) => f === arr2[i]),
        1
      );
      arr2.splice(i, 1);
      i -= 1;
      yellow += 1;
    }
  }
}
// Game reset
resetButton.forEach((e) => {
  e.addEventListener("click", function () {
    // modalWrapper.classList.remove("show");
    window.location.reload();
  });
});
// Checking for Win condition

function winCheck(equal) {
  if (equal === 4) {
    console.log("You won");
    // Showing result
    for (let i = 0; i < resultImages.length; i++) {
      resultBoxes[i].style.visibility = "visible";
    }
    isDifferent = false;
  }
}

// Checking row by row
function rowCheck(count) {
  // win condition
  winCheck(red);

  for (let i = count - 4; i < red + (count - 4); i++) {
    rightBoxes[i].innerHTML = `<img src="./images/red.png" class="responsive">`;
  }

  for (let i = red + (count - 4); i < yellow + red + (count - 4); i++) {
    rightBoxes[i].innerHTML = `<img src="./images/yellow.png" class="responsive">`;
  }

  red = 0;
  yellow = 0;
}
