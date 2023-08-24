
const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];

const cardImages = {
    '2♣': '2c.JPG',
    '3♣': '3c.JPG',
    '4♣': '4c.JPG',
    '5♣': '5c.JPG',
    '6♣': '6c.JPG',
    '7♣': '7c.JPG',
    '8♣': '8c.JPG',
    '9♣': '9c.JPG',
    't♣': 'tc.JPG',
    'j♣': 'jc.JPG',
    'q♣': 'qc.JPG',
    'k♣': 'kc.JPG',
    'a♣': 'ac.JPG',
    '2♦': '2d.JPG',
    '3♦': '3d.JPG',
    '4♦': '4d.JPG',
    '5♦': '5d.JPG',
    '6♦': '6d.JPG',
    '7♦': '7d.JPG',
    '8♦': '8d.JPG',
    '9♦': '9d.JPG',
    't♦': 'td.JPG',
    'j♦': 'jd.JPG',
    'q♦': 'qd.JPG',
    'k♦': 'kd.JPG',
    'a♦': 'ad.JPG',
    '2♥': '2h.JPG',
    '3♥': '3h.JPG',
    '4♥': '4h.JPG',
    '5♥': '5h.JPG',
    '6♥': '6h.JPG',
    '7♥': '7h.JPG',
    '8♥': '8h.JPG',
    '9♥': '9h.JPG',
    't♥': 'th.JPG',
    'j♥': 'jh.JPG',
    'q♥': 'qh.JPG',
    'k♥': 'kh.JPG',
    'a♥': 'ah.JPG',
    '2♠': '2s.JPG',
    '3♠': '3s.JPG',
    '4♠': '4s.JPG',
    '5♠': '5s.JPG',
    '6♠': '6s.JPG',
    '7♠': '7s.JPG',
    '8♠': '8s.JPG',
    '9♠': '9s.JPG',
    't♠': 'ts.JPG',
    'j♠': 'js.JPG',
    'q♠': 'qs.JPG',
    'k♠': 'ks.JPG',
    'a♠': 'as.JPG',
    'back': 'back.JPG'
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
        if (card1 === card2 || Math.abs(value2 - value1) === 1) {
            // Automatic re-deal for equal or consecutive cards
            card1 = getRandomCard();
            card2 = getRandomCard();
            card3 = '';
            value1 = values.indexOf(card1.substring(0, card1.length - 1));
            value2 = values.indexOf(card2.substring(0, card2.length - 1));
        }
        bet = 5; // Set the bet to an automatic 5 credits
        credits -= bet; // Deduct the bet amount from credits
        document.getElementById('bet').textContent = bet;
        document.getElementById('credits').textContent = credits;
        document.getElementById('card1').style.backgroundImage = `url(assets/images/${cardImages[card1]})`;
        document.getElementById('card2').style.backgroundImage = `url(assets/images/${cardImages[card2]})`;

        } 
        else {
        alert("Not enough credits to deal. Please change your bet or add more credits.");
    }
   
}
document.addEventListener("DOMContentLoaded", function() {
    const dealButton = document.getElementById("deal");
    dealButton.addEventListener("click", deal);
});

function pass() {
    if (card1 === card2 || Math.abs(value2 - value1) === 1) {
        // Automatic re-deal for equal or consecutive cards
        card1 = getRandomCard();
        card2 = getRandomCard();
        card3 = '';
        value1 = values.indexOf(card1.substring(0, card1.length - 1));
        value2 = values.indexOf(card2.substring(0, card2.length - 1));
    }

}
document.addEventListener("DOMContentLoaded", function() {
    const passButton = document.getElementById("pass");
    passButton.addEventListener("click", pass);
});

function hit() {
    card3 = getRandomCard();
    value3 = values.indexOf(card3.substring(0, card3.length - 1));

    if (value3 === value1 || value3 === value2) {
        alert('Hit card is the same as one of the dealers cards. You lose your bet.');
        credits -= bet;
        document.getElementById('credits').textContent = credits;
        deal();
        // updateBetButtons();
        // updateHitDealButtons();
    } else {
        document.getElementById('card3').style.backgroundImage = `url(assets/images/${cardImages[card3]})`;
        checkResult();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const hitButton = document.getElementById("hit");
    hitButton.addEventListener("click", hit);
});

function changeBet(amount) {
    if (bet + amount >= 5 && bet + amount <= credits) {
        bet += amount;
        document.getElementById('bet').textContent = bet;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const betUpButton = document.getElementById("betUp");
    betUpButton.addEventListener("click", betUp);
});

document.addEventListener("DOMContentLoaded", function() {
    const betDownButton = document.getElementById("betDown");
    betDownButton.addEventListener("click", betDown);
});


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

document.addEventListener("DOMContentLoaded", function() {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", reset);
});
