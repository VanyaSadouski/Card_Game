const arrSuit = ['hearts', 'diamonds', 'clubs', 'spades'];
let cardsArr = ['6', '7', '8', '9', '10', '11', '12', '13', '14'];
let leftPlayer = [];
let rightPlayer = [];
let deck = [];
let p1Count = 0;
let p2Count = 0;
// let player1 = prompt("Имя игрока 1?");
// let player2 = prompt("Имя игрока 2?");

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
let btn = document.getElementById('btn');
let count = document.getElementById('count');
btn.addEventListener('click', whoWin);

function whoWin() {
    let a = rightPlayer.pop();
    let b = leftPlayer.pop();

    if (!rightPlayer.length) {
        btn.removeEventListener('click', whoWin);
        document.body.removeChild(btn);
    }
    if (a.Value > b.Value) {
        p1Count++;
    }
    else if (a.Value < b.Value) {
        p2Count++;
    }
    else {
        console.log('ничья')
    }

    count.innerHTML = p1Count + ' : ' + p2Count;
    createT(a, b, tablePlay);
}

function createT(a, b, table) {
    let html = '';
    a.Images = new Image();
    // html += '<tr><td>' + player1 + '</td><td>' + player2 + '</td></tr>';
    html += '<tr><td>' + '<img src=" ' + a.Images + '">' + '</td><td>' + '<img src=" ' + b.Images + '">' + '</td></tr>';
    table.innerHTML = html;
}
