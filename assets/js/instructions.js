const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function calculateProbability(card1Value, card2Value, card3Value) {
    const card1ValueIndex = values.indexOf(card1Value);
    const card2ValueIndex = values.indexOf(card2Value);
    const card3ValueIndex = values.indexOf(card3Value);

    const sortedValues = [card1ValueIndex, card2ValueIndex, card3ValueIndex].sort((a, b) => a - b);

    if (sortedValues[0] < card3ValueIndex && card3ValueIndex < sortedValues[2]) {
        return 1; // In-between condition satisfied
    } else {
        return 0; // In-between condition not satisfied
    }
}

// Get user input
const card1Value = prompt('Enter the value of the first card (2-10, J, Q, K, A):');
const card2Value = prompt('Enter the value of the second card (2-10, J, Q, K, A):');
const card3Value = prompt('Enter the value of the third card (2-10, J, Q, K, A):');

const probability = calculateProbability(card1Value, card2Value, card3Value);

console.log(`Probability that the third card's value is in between the first two cards' values: ${probability}`);