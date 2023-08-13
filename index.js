const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const cardImages = {
    '2c' : '2c.JPG',
    '3c' : '3c.JPG',
    '4c' : '4c.JPG',
    '5c' : '5c.JPG',
    '6c' : '6c.JPG',
    '7c' : '7c.JPG',
    '8c' : '8c.JPG',
    '9c' : '9c.JPG',
    'tc' : 'tc.JPG',
    'jc' : 'jc.JPG',
    'qc' : 'qc.JPG',
    'kc' : 'kc.JPG',
    'ac' : 'ac.JPG',
    '2d' : '2d.JPG',
    '3d' : '3d.JPG',
    '4d' : '4d.JPG',
    '5d' : '5d.JPG',
    '6d' : '6d.JPG',
    '7d' : '7d.JPG',
    '8d' : '8d.JPG',
    '9d' : '9d.JPG',
    'td' : 'td.JPG',
    'jd' : 'jd.JPG',
    'qd' : 'qd.JPG',
    'kd' : 'kd.JPG',
    'ad' : 'ad.JPG',
    '2h' : '2h.JPG',
    '3h' : '3h.JPG',
    '4h' : '4h.JPG',
    '5h' : '5h.JPG',
    '6h' : '6h.JPG',
    '7h' : '7h.JPG',
    '8h' : '8h.JPG',
    '9h' : '9h.JPG',
    'th' : 'th.JPG',
    'jh' : 'jh.JPG',
    'qh' : 'qh.JPG',
    'kh' : 'kh.JPG',
    'ah' : 'ah.JPG',
    '2s' : '2s.JPG',
    '3s' : '3s.JPG',
    '4s' : '4s.JPG',
    '5s' : '5s.JPG',
    '6s' : '6s.JPG',
    '7s' : '7s.JPG',
    '8s' : '8s.JPG',
    '9s' : '9s.JPG',
    'ts' : 'ts.JPG',
    'js' : 'js.JPG',
    'qs' : 'qs.JPG',
    'ks' : 'ks.JPG',
    'as' : 'as.JPG',
}

let credits = 50;
let bet = 5;
let card1, card2, card3;

function getRandomCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return randomValue + randomSuit;
}

function deal() {
    if (credits >= 5) {
    bet = 5; // Set the bet to an automatic 5 credits
    credits -= bet; // Deduct the bet amount from credits
    document.getElementById('bet').textContent = bet;
    document.getElementById('credits').textContent = credits;


    card1 = getRandomCard();
    card2 = getRandomCard();
    card3 = '';
    document.getElementById('card1').textContent = card1;
    document.getElementById('card2').textContent = card2;
    document.getElementById('card3').textContent = card3;

    updateBetButtons();
    updateHitDealButtons();

    } else {
    alert("Not enough credits to deal. Please change your bet or add more credits.");
    }

    document.getElementById('card1').style.backgroundImage = `url(images/${card1}.JPG)`;
    document.getElementById('card2').style.backgroundImage = `url(images/${card2}.JPG)`;
    document.getElementById('card3').style.backgroundImage = 'none'; // Clear card3 image
}

function hit() {
    card3 = getRandomCard();
    document.getElementById('card3').textContent = card3;
    document.getElementById('card3').style.backgroundImage = `url(images/${card3}.JPG)`;
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

function resetGame() {
    credits = 50;
    bet = 5;
    document.getElementById('credits').textContent = credits;
    document.getElementById('bet').textContent = bet;
    document.getElementById('card1').textContent = '';
    document.getElementById('card2').textContent = '';
    document.getElementById('card3').textContent = '';
  }