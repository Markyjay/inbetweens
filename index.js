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