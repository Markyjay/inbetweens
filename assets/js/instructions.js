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
  
    let card1 = getRandomCard();
    let card2 = getRandomCard();
    let card3 = getRandomCard();

    const value1 = values.indexOf(card1.substring(0, card1.length - 1));
    const value2 = values.indexOf(card2.substring(0, card2.length - 1));
    const value3 = values.indexOf(card3.substring(0, card3.length - 1));

function calculateProbability(value1, value2, value3) {
    const sortedValues = [value1, value2].sort((a, b) => a - b);

    if (sortedValues[0] < value3 && value3 < sortedValues[1]) {
        return 1; // In-between condition satisfied
    } else {
        return 0; // In-between condition not satisfied
    }
}

const probability = calculateProbability(value1, value2, value3);

console.log(`Probability that the third card's value is in between the first two cards' values: ${probability}`);