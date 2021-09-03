/* Functions */
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function addBomb (difficult) {
    let min = 1;
    let max;
    let arrayRandom = [];
    let bombNumber = 16;
    let randomNum;

    switch(difficult) {
        case 10:
            max = 100;
            break;
        case 9:
            max = 81;
            break;
        case 7:
            max = 49;
            break;
    }
    for (let i = 0; i < bombNumber; i++) {
        if(i == 0) {
            randomNum = randomNumber(min, max);
            arrayRandom.push(randomNum);
        } else {
            do {
                randomNum = randomNumber(min, max);
            } while(arrayRandom.includes(randomNum))
            arrayRandom.push(randomNum);
        }
    }
    arrayRandom.sort((a, b) => a - b);
    return arrayRandom;
}
function createPlayground(difficult) {
    let playground = document.getElementById(`playground`);
    let width = `width-${difficult}`;
    playground.classList.add(width);
    let arrayBomb = addBomb(difficult);
    let y = 0;
    console.log(arrayBomb);

    for (let i = 1; i <= (difficult * difficult); i++) {
        if (i == arrayBomb[y]) {
            playground.innerHTML += `<div id="square" class="square"><i class="fas fa-bomb"></i></div>`;
            y++;
        } else {
            playground.innerHTML += `<div id="square" class="square">${i}</div>`;
        }
    }
    playground.classList.add(`view`);
}



/* Main program */
let buttonCreate = document.getElementById(`create`);

buttonCreate.addEventListener(`click`, 
    function() {
        let difficult = parseInt(document.getElementById(`difficult`).value);
        let containerForm = document.getElementById(`containerForm`);
        let error = document.getElementById(`error`);
        let playground = document.getElementById(`playground`);
        let square = document.getElementById(`square`);
        let score = document.getElementById(`score`);
        let scorePoint = 0;
        let max;

        if (isNaN(difficult)) {
            error.innerHTML = `Error! Choose a difficult`;
            error.classList.add(`view`)
        } else {
            containerForm.classList.add(`remove`);
            error.classList.add(`remove`);
            createPlayground(difficult);
            switch (difficult) {
                case 10:
                    max = 100;
                    break;
                case 9:
                    max = 81;
                    break;
                case 7:
                    max = 49;
                    break;
            }
            playground.addEventListener(`click` , 
                function(event) {
                    console.log(event);
                    if (event.target.classList[1] == `clicked`) {
                        alert(`Don't click twice`);
                    } else {
                        event.target.classList.add(`clicked`);
                        if (isNaN(event.target.innerHTML)) {
                            score.innerHTML = `
                                <h2>You lose</h2>
                                <p>your score is ${scorePoint}</p>
                            `
                            playground.classList.add(`unclikable`);
                            score.classList.add(`block`);
                            score.classList.add(`view`);
                        } else {
                            if (scorePoint == (max - 17)) {
                                score.classList.add(`win`);
                                score.innerHTML = `
                                    <h2>You win</h2>
                                    <p>Your score is ${scorePoint}</p>
                                `
                                playground.classList.add(`unclikable`);
                                score.classList.add(`block`);
                                score.classList.add(`view`);
                            } else {
                                scorePoint++;
                            }
                        }
                    }
                }
            );
        }
    }
);