/*jshint esversion: 6 */
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
  "1♣": "ac.jpg",
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
  "1♠": "as.jpg",
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
};

function getRandomCard() {
  const filteredValues = values.filter(
    (value) =>
      !(value === "1" && (suits.includes("♥") || suits.includes("♦"))) &&
      !(value === "14" && (suits.includes("♣") || suits.includes("♠")))
  );

  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue =
    filteredValues[Math.floor(Math.random() * filteredValues.length)];

  return randomValue + randomSuit;
}

let card1, card2; // Initialize card variables here

function drawCards() {
  card1 = getRandomCard();
  card2 = getRandomCard([card1]);

  // Update card images here
  document.getElementById("card1").style.backgroundImage = `url(assets/images/${cardImages[card1]})`;
  document.getElementById("card2").style.backgroundImage = `url(assets/images/${cardImages[card2]})`;
  
}

// Initial card draw
drawCards();

function calculateProbability() {
  const value1 = values.indexOf(card1.substring(0, card1.length - 1));
  const value2 = values.indexOf(card2.substring(0, card2.length - 1));

 // Calculate the probability of card3 being in between value1 and value2
 let count = 0;
 for (let i = 1; i <= 14; i++) {
   if (i > value1 && i < value2) {
     count++;
   }
 }
 
 return (count / 13); // Probability as a fraction
}


document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculate");
  calculateButton.addEventListener("click", showProbabilityModal);
});

function showProbabilityModal() {
  const probability = calculateProbability();
  const modal = document.getElementById("myModal");
  const probabilityResult = document.getElementById("probabilityResult");

  const percentage = (probability * 100).toFixed(2);

  probabilityResult.textContent = `Probability: ${percentage}%`;

  modal.style.display = "block";
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function closeModal() {
  modal.style.display = "none";
}

document.getElementById("calculate").addEventListener("click", function () {
  drawCards(); // Draw new cards before calculating probability
  showProbabilityModal();
});
span.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});
