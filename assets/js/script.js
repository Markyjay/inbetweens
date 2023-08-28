const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
];

const cardImages = {
  "2♣": "2c.JPG",
  "3♣": "3c.JPG",
  "4♣": "4c.JPG",
  "5♣": "5c.JPG",
  "6♣": "6c.JPG",
  "7♣": "7c.JPG",
  "8♣": "8c.JPG",
  "9♣": "9c.JPG",
  "10♣": "tc.JPG",
  "11♣": "jc.JPG",
  "12♣": "qc.JPG",
  "13♣": "kc.JPG",
  "1♣": "ac.JPG",
  "2♦": "2d.JPG",
  "3♦": "3d.JPG",
  "4♦": "4d.JPG",
  "5♦": "5d.JPG",
  "6♦": "6d.JPG",
  "7♦": "7d.JPG",
  "8♦": "8d.JPG",
  "9♦": "9d.JPG",
  "10♦": "td.JPG",
  "11♦": "jd.JPG",
  "12♦": "qd.JPG",
  "13♦": "kd.JPG",
  "14♦": "ad.JPG",
  "2♥": "2h.JPG",
  "3♥": "3h.JPG",
  "4♥": "4h.JPG",
  "5♥": "5h.JPG",
  "6♥": "6h.JPG",
  "7♥": "7h.JPG",
  "8♥": "8h.JPG",
  "9♥": "9h.JPG",
  "10♥": "th.JPG",
  "11♥": "jh.JPG",
  "12♥": "qh.JPG",
  "13♥": "kh.JPG",
  "14♥": "ah.JPG",
  "2♠": "2s.JPG",
  "3♠": "3s.JPG",
  "4♠": "4s.JPG",
  "5♠": "5s.JPG",
  "6♠": "6s.JPG",
  "7♠": "7s.JPG",
  "8♠": "8s.JPG",
  "9♠": "9s.JPG",
  "10♠": "ts.JPG",
  "11♠": "js.JPG",
  "12♠": "qs.JPG",
  "13♠": "ks.JPG",
  "1♠": "as.JPG",
  "back": "back.JPG",
};

let credits = 100;
let bet = 5;
let card1 = getRandomCard();
let card2 = getRandomCard();
let card3 = getRandomCard();
let dealAgain = true; // Add this variable to track re-deal eligibility

const value1 = values.indexOf(card1.substring(0, card1.length - 1));

console.log(card1, "<===card 1");

const value2 = values.indexOf(card2.substring(0, card2.length - 1));
const value3 = values.indexOf(card3.substring(0, card3.length - 1));

function getRandomCard() {
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  return randomValue + randomSuit;
}

function deal() {
  // console.log(value1, "<====== value1");

  if (credits >= 5 && dealAgain) {
    card1 = getRandomCard();
    card2 = getRandomCard();
    console.log(card1, "<===card 1 aftyer");
    card3 = "";
    // value1 = values.indexOf(card1.substring(0, card1.length - 1));
    // value2 = values.indexOf(card2.substring(0, card2.length - 1));

    bet = 5; // Set the bet to an automatic 5 credits
    credits -= bet; // Deduct the bet amount from credits
    document.getElementById("bet").textContent = bet;
    document.getElementById("credits").textContent = credits;
    document.getElementById(
      "card1"
    ).style.backgroundImage = `url(assets/images/${cardImages[card1]})`;
    document.getElementById(
      "card2"
    ).style.backgroundImage = `url(assets/images/${cardImages[card2]})`;

    // Refresh hit card
    document.getElementById("card3").textContent = "";
    document.getElementById(
      "card3"
    ).style.backgroundImage = `url(assets/images/${cardImages["back"]})`;

    // Allow cards to be dealt again due to impossible outcome
    dealAgain = true;
  } else {
    alert(
      "Not enough credits to deal. Please change your bet or add more credits."
    );
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const dealButton = document.getElementById("deal");
  dealButton.addEventListener("click", deal);
});

// Re-deal for equal or consecutive cards

function pass() {
  if (card1 === card2 || Math.abs(value2 - value1) === 1) {
    console.log("No possible inbetween value, pass for new cards");
    dealAgain = false; // Disables re-deal in this case
  }
  deal();
}
document.addEventListener("DOMContentLoaded", function () {
  const passButton = document.getElementById("pass");
  passButton.addEventListener("click", pass);
});

function hit() {
  card3 = getRandomCard();
  // value3 = values.indexOf(card3.substring(0, card3.length - 1));

  if (value3 === value1 || value3 === value2) {
    getRandomCard();
    document.getElementById(
      "card3"
    ).style.backgroundImage = `url(assets/images/${cardImages[card3]})`;
    alert(
      "Hit card is the same as one of the dealers cards. You lose your bet."
    );
    credits -= bet;
    document.getElementById("credits").textContent = credits;
    deal();
    // updateBetButtons();
    // updateHitDealButtons();
  } else {
    document.getElementById(
      "card3"
    ).style.backgroundImage = `url(assets/images/${cardImages[card3]})`;
    checkResult();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const hitButton = document.getElementById("hit");
  hitButton.addEventListener("click", hit);
});

function changeBet(amount) {
  if (bet + amount >= 5 && bet + amount <= credits) {
    bet += amount;
    document.getElementById("bet").textContent = bet;
  }
}

function betUp() {
  changeBet(5);
}

document.addEventListener("DOMContentLoaded", function () {
  const betUpButton = document.getElementById("betUp");
  betUpButton.addEventListener("click", betUp);
});

function betDown() {
  changeBet(-5);
}

document.addEventListener("DOMContentLoaded", function () {
  const betDownButton = document.getElementById("betDown");
  betDownButton.addEventListener("click", betDown);
});

function checkResult() {
  document.getElementById(
    "card3"
  ).style.backgroundImage = `url(assets/images/${cardImages[card3]})`;

  if (
    (value3 > value1 && value3 < value2) ||
    (value3 < value1 && value3 > value2)
  ) {
    credits += bet;
  } else {
    credits -= bet;
  }

  document.getElementById("credits").textContent = credits;

  if (credits >= 1000) {
    alert("Congratulations! You win!");
    resetGame();
  } else if (credits <= 0) {
    alert("Game over! You lose.");
    resetGame();
  }
}

function reset() {
  credits = 100;
  bet = 5;
  document.getElementById("credits").textContent = credits;
  document.getElementById("bet").textContent = bet;
  document.getElementById(
    "card1"
  ).style.backgroundImage = `url(assets/images/${cardImages["back"]})`;
  document.getElementById(
    "card2"
  ).style.backgroundImage = `url(assets/images/${cardImages["back"]})`;
  document.getElementById(
    "card3"
  ).style.backgroundImage = `url(assets/images/${cardImages["back"]})`;
}

reset();

document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", reset);
});
