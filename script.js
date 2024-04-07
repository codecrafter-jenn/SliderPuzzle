const boxes = document.querySelectorAll(".box");
const button = document.querySelector(".button");
let tiles = document.querySelectorAll(".tile");
const empty = document.getElementById("tile0");
const container = document.getElementById("container");

let tilesArr = Array.from(tiles);

button.addEventListener("click", () => {
  shuffle(tilesArr);
});

boxes.forEach((box) => {
  box.addEventListener("click", function (e) {
    console.log(e.target);
    let img = e.target;
    if (img.classList.contains("moveable")) {
      let emptyBox = empty.parentElement;
      let imgBox = img.parentElement;

      emptyBox.appendChild(img);
      imgBox.appendChild(empty);

      checkWin(tilesArr);

      checkMoves(tilesArr);
    }
  });
});

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  for (i = 0; i < boxes.length; i++) {
    boxes[i].appendChild(array[i]);
  }
  checkMoves(array);
}

function checkMoves(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i].classList.contains("moveable")) {
      array[i].classList.remove("moveable");
    }
    let emptyColumn = empty.parentElement.getAttribute("column");
    let emptyRow = empty.parentElement.getAttribute("row");

    arrCol = array[i].parentElement.getAttribute("column");
    arrRow = array[i].parentElement.getAttribute("row");

    if (arrCol === emptyColumn) {
      let valid = checkAdjacent(emptyRow, arrRow);
      if (valid) {
        array[i].classList.add("moveable");
        //make moveable
      }
    }
    if (arrRow === emptyRow) {
      let valid = checkAdjacent(emptyColumn, arrCol);
      if (valid) {
        array[i].classList.add("moveable");
        //make moveable
      }
    }
  }

  function checkAdjacent(a, b) {
    a = parseInt(a);
    b = parseInt(b);

    if (a === b + 1) {
      return true;
    } else if (a === b - 1) {
      return true;
    } else {
      return false;
    }
  }
}

function checkWin(array) {
  let correct = 0;
  for (i = 0; i < array.length; i++) {
    let goal = array[i].parentElement.getAttribute("goal");

    let id = array[i].id;
    let idnum = id.substr(4);
    container.classList.remove("win");
    if (goal === idnum) {
      correct += 1;
    }
    if (correct === array.length) {
      console.log("you win");
      container.classList.add("win");
    }
  }
}
