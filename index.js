const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let credits = 50;
let bet = 5;
let card1, card2, card3;

function getRandomCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return randomValue + randomSuit;
}

function deal() {
    card1 = getRandomCard();
    card2 = getRandomCard();
    card3 = 'blank';
    document.getElementById('card1').textContent = card1;
    document.getElementById('card2').textContent = card2;
    document.getElementById('card3').textContent = card3;
}

function hit() {
    card3 = getRandomCard();
    document.getElementById('card3').textContent = card3;
    checkResult();
}

function changeBet(amount) {
    if (bet + amount >= 5 && bet + amount <= credits) {
        bet += amount;
        document.getElementById('bet').textContent = bet;
    }
}

function checkResult() {
    const value1 = values.indexOf(card1.substring(0, card1.length - 1));
    const value2 = values.indexOf(card2.substring(0, card2.length - 1));
    const value3 = values.indexOf(card3.substring(0, card3.length - 1));

    if ((value3 > value1 && value3 < value2) || (value3 < value1 && value3 > value2)) {
        credits += bet;
    } else {
        credits -= bet;
    }


    document.getElementById('credits').textContent = credits;

    if (credits >= 1000) {
        alert('Congratulations! You win!');
        resetGame();
    } 
    else if (credits <= 0) {
        alert('Game over! You lose.');
        resetGame();
    }
    else if (Math.abs(value3 - value1) <= 1 || Math.abs(value3 - value2) <= 1) {
        alert('Cards are consecutive or the same. Click "Deal" to get new cards.');
    }
}