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
  "2♣": "2c.jpg",
  "3♣": "3c.jpg",
  "4♣": "4c.jpg",
  "5♣": "5c.jpg",
  "6♣": "6c.jpg",
  "7♣": "7c.jpg",
  "8♣": "8c.jpg",
  "9♣": "9c.jpg",
  "10♣": "tc.jpg",
  "11♣": "jc.jpg",
  "12♣": "qc.jpg",
  "13♣": "kc.jpg",
  "1♣": "ac.jpg",
  "2♦": "2d.jpg",
  "3♦": "3d.jpg",
  "4♦": "4d.jpg",
  "5♦": "5d.jpg",
  "6♦": "6d.jpg",
  "7♦": "7d.jpg",
  "8♦": "8d.jpg",
  "9♦": "9d.jpg",
  "10♦": "td.jpg",
  "11♦": "jd.jpg",
  "12♦": "qd.jpg",
  "13♦": "kd.jpg",
  "14♦": "ad.jpg",
  "2♥": "2h.jpg",
  "3♥": "3h.jpg",
  "4♥": "4h.jpg",
  "5♥": "5h.jpg",
  "6♥": "6h.jpg",
  "7♥": "7h.jpg",
  "8♥": "8h.jpg",
  "9♥": "9h.jpg",
  "10♥": "th.jpg",
  "11♥": "jh.jpg",
  "12♥": "qh.jpg",
  "13♥": "kh.jpg",
  "14♥": "ah.jpg",
  "2♠": "2s.jpg",
  "3♠": "3s.jpg",
  "4♠": "4s.jpg",
  "5♠": "5s.jpg",
  "6♠": "6s.jpg",
  "7♠": "7s.jpg",
  "8♠": "8s.jpg",
  "9♠": "9s.jpg",
  "10♠": "ts.jpg",
  "11♠": "js.jpg",
  "12♠": "qs.jpg",
  "13♠": "ks.jpg",
  "1♠": "as.jpg",
  "back": "back.jpg",
};

let credits = 100;
let bet = 5;
let noCharge = 0;
let card1 = getRandomCard();
let card2 = getRandomCard();
let card3 = getRandomCard();
let dealAgain = true; // Add this variable to track re-deal eligibility

let value1 = values.indexOf(card1.substring(0, card1.length - 1));
let value2 = values.indexOf(card2.substring(0, card2.length - 1));
let value3 = values.indexOf(card3.substring(0, card3.length - 1));


function getRandomCard() {
  // Filter out unwanted cards
  const filteredValues = values.filter(
    (value) =>
      !(value === "1" && (suits.includes("♥") || suits.includes("♦"))) &&
      !(value === "14" && (suits.includes("♣") || suits.includes("♠")))
  );

  // Select a random suit and value from the filtered arrays
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue =
    filteredValues[Math.floor(Math.random() * filteredValues.length)];

  return randomValue + randomSuit;
}

function deal() {

  if (credits >= 5 && dealAgain) {
    card1 = getRandomCard();
    card2 = getRandomCard();
    card3 = getRandomCard();
    
    bet = 5; // Set the bet to an automatic 5 credits
    credits -= bet; // Deduct the bet amount from credits

    // Update the value1, value2, and value3 variables
    value1 = values.indexOf(card1.substring(0, card1.length - 1));
    
    console.log (value1);

    value2 = values.indexOf(card2.substring(0, card2.length - 1));

    console.log (value2);

    value3 = values.indexOf(card3.substring(0, card3.length - 1));

    console.log (value3);

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
    alert("Not enough credits to deal.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const dealButton = document.getElementById("deal");
  dealButton.addEventListener("click", deal);
});

// Re-deal for equal or consecutive cards

function pass() {
  card1 = getRandomCard();
  card2 = getRandomCard();
  
  document.getElementById("bet").textContent = bet;
  document.getElementById("credits").textContent = credits;
  document.getElementById(
    "card1"
  ).style.backgroundImage = `url(assets/images/${cardImages[card1]})`;
  document.getElementById(
    "card2"
  ).style.backgroundImage = `url(assets/images/${cardImages[card2]})`;

  if (card1 === card2 || Math.abs(value2 - value1) === 1) {
    console.log("No possible inbetween value, pass for new cards");
    // Do nothing to prevent deducting credits
    noCharge = 0;
    credits -= noCharge; // No charge for impossible inbetween
  } else {
    bet = 5; // Set the bet to an automatic 5 credits
    credits -= bet; // Deduct the bet amount from credits
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const passButton = document.getElementById("pass");
  passButton.addEventListener("click", pass);
});

function hit() {
    card3 = getRandomCard();
    document.getElementById(
      "card3"
    ).style.backgroundImage = `url(assets/images/${cardImages[card3]})`;

    checkResult();
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

  // Check if card3 is between card1 and card2
  if (
    (value3 > value1 && value3 < value2) ||
    (value3 < value1 && value3 > value2)
  ) {
    credits += bet; // Credits added for a win
  } else {
    credits -= bet; // Credits subtracted for a loss
  }

  // Update the displayed credits with the new value
  document.getElementById("credits").textContent = credits;

  if (credits >= 1000) {
    alert("Congratulations! You win!");
    reset();
  } else if (credits <= 0) {
    alert("Game over! You lose.");
    reset();
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
