const arrSuit = ['hearts', 'diamonds', 'clubs', 'spades'];
let cardsArr = ['6', '7', '8', '9', '10', '11', '12', '13', '14'];
let leftPlayer = [];
let rightPlayer = [];
let deck = [];
let p1Count = 0;
let p2Count = 0;


let rand = Math.floor(Math.random() * arrSuit.length);
let suit = document.getElementById('suit');
suit.innerHTML = 'Suit: ' + arrSuit[rand] + ' !';

function getDeck() {
    for (let i = 0; i < arrSuit.length; i++) {
        for (let j = 0; j < cardsArr.length; j++) {
            let singleCard = {
                Suit: arrSuit[i],
                Value: parseInt(cardsArr[j]),
                Images: 'png/' + cardsArr[j] + '_of_' + arrSuit[i] + '.png'
            };

            if (arrSuit[i] === arrSuit[rand]) {
                singleCard.Value = 100 + parseInt(cardsArr[j]);
            }
            deck.push(singleCard);
        }
    }
}

getDeck();

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

shuffle(deck);

function getLeftHand() {
    for (let i = 0; i < 18; i++) {
        leftPlayer[i] = deck.pop();
    }
}

getLeftHand();

function getRightHand() {
    for (let i = 0; i < 18; i++) {
        rightPlayer[i] = deck.pop();
    }
}

getRightHand();
console.log(rightPlayer);
console.log(leftPlayer);


let tablePlay = document.getElementById('table');
let count = document.getElementById('count');
document.body.addEventListener('click', whoWin);
let trName = document.createElement('tr');
let tdName1 = document.createElement('td');
let tdName2 = document.createElement('td');
tablePlay.appendChild(trName);
tdName1.textContent = "Player 1";
tdName2.textContent = "Player 2";
trName.appendChild(tdName1);
trName.appendChild(tdName2);
function whoWin() {
    let a = rightPlayer.pop();
    let b = leftPlayer.pop();

    if (!rightPlayer.length) {
        document.body.removeEventListener('click', whoWin);

    }
    if (a.Value > b.Value) {
        p1Count++;
    }
    else if (a.Value < b.Value) {
        p2Count++;
    }
    else {
        console.log('ничья');
    }
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    tablePlay.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    let leftCard = document.createElement('IMG');
    let rightCard = document.createElement('IMG');
    leftCard.src = a.Images;
    rightCard.src = b.Images;
    td1.appendChild(leftCard);
    td2.appendChild(rightCard);
    count.innerHTML = p1Count + ' : ' + p2Count;
}
