/* We create constants for the cross mark as well the circle mark which we can refer to in any part of the code 
   We use 3X3 grid matrix here
*/
const xCross = 'X';
const circleMark = 'circle';
const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


/* We now use javascript query selector to extract the elements with the help of CSS selectors  
  The extraction can be based on selector ID 
  The return type is a node or a nodelist that can be accessed with the help of indexes
  Consequent operations can then be performed
*/

const cellElements = document.querySelectorAll('[boardcell]');
const playboard = document.getElementById('playboard');
const aftermatchoverText = document.getElementById('after-match-over');
const restartButton = document.getElementById('restartButton');

/*  Picking up the element with selector ID after-match-over-text */
const aftermatchoverTextElement = document.querySelector('[after-match-over-text]');

var circleTurn;


beginplay();
restartButton.addEventListener('click', beginplay);

function beginplay() {
    circleTurn = false;
    let loop1 = 0;
    for (loop1 = 0; loop1 < 9; loop1++) {
        cellElements[i].classList.remove(xCross);
        cellElements[i].classList.remove(circleMark);
        cellElements[i].removeEventListener('click', handleClick);
        cellElements[i].addEventListener('click', handleClick, { once: true });
    }
    setBoardHoverClass();
    aftermatchoverText.classList.remove('show');
}

function handleClick(e) {
    const boardcell = e.target;
    /*  The purpose of event.target is to get the element that triggered a specific event */
    if (circleTurn == true) {
        const currentClass = circleMark;
    }
    else {
        const currentClass = xCross;
    }
    placeMark(boardcell, currentClass);
    if (checkWin(currentClass) == true) {
        endPlay(false);
    }
    else if (isDraw()) {
        endPlay(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endPlay(draw) {
    if (draw == true) {
        aftermatchoverTextElement.innerText = 'Match draw!';
    }
    else {
        if (circleTurn == true) {
            aftermatchoverTextElement.innerText = 'O wins the game!';
        }
        else if (circleTurn == false) {
            aftermatchoverTextElement.innerText = 'X wins the game!';
        }
    }
    aftermatchoverText.classList.add('show');
}

function isDraw() {
    let counter1 = 0;
    let loop1 = 0;
    for (loop1 = 0; loop1 < 9; loop1++) {
        if (cellElements[loop1] == xCross || cellElements[loop1] == circleMark) {
            counter1 = counter1 + 1;
        }
    }
    if (counter1 == 9) {
        return true;
    }
    else {
        return false;
    }

}

function placeMark(boardcell, currentClass) {
    boardcell.classList.add(currentClass);
}

function swapTurns() {
    if (circleTurn == true) {
        circleTurn = false;
    }
    else if (circleTurn == false) {
        circleTurn = true;
    }
}

function setBoardHoverClass() {
    playboard.classList.remove(xCross);
    playboard.classList.remove(circleMark);
    if (circleTurn == true) {
        playboard.classList.add(circleMark);
    }
    else {
        playboard.classList.add(xCross);
    }
}

function checkWin(currentClass) {
    let ind = 0;
    let loop1 = 0;
    let flag = [];
    let crossflagindex = [];
    let circleflagindex = [];
    let p1 = 0; let p2 = 0;
    for (ind = 0; ind < 9; ind++) {
        flag[ind] = cellElements[ind].classList.contains(currentClass);
    }
    for (loop1 = 0; loop1 < 9; loop1++) {
        if (flag[loop1] == xCross) {
            crossflagindex[p1++] = loop1;
        }
        else if (flag[loop1] == circleMark) {
            circleflagindex[p2++] = loop1;
        }
    }

    for (loop1 = 0; loop1 < winningCombinations.length; loop1++) {
        for (ind = 0; ind < 9; ind = ind + 3) {
            if (circleflagindex[ind] == winningCombinations[loop1][ind] && circleflagindex[ind + 1] == winningCombinations[loop1][ind] && circleflagindex[ind + 2] == winningCombinations[loop1][ind]) {
                return true;
            }
        }
    }
    return false;
}


function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}