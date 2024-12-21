// Function to simulate blackjack dealer busts
function simulateDealerBust(dealtCards, iterations = 100000) {
    // Blackjack card values
    const cardValues = {
        2: 2,
        3: 3,
        4: 4,
        5: 4,
        6: 4,
        7: 4,
        8: 4,
        9: 4,
        10: 10,
        J: 10,
        Q: 10,
        K: 10,
        A: 11,
    };

    // Helper function to calculate hand value
    function calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        hand.forEach((card) => {
            total += cardValues[card];
            if (card === "A") aces++;
        });

        // Adjust for aces
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    // Generate the deck based on undealt cards for an 8-deck shoe
    function generateDeck(dealtCards) {
        const fullDeck = {
            2: 32,
            3: 32,
            4: 32,
            5: 32,
            6: 32,
            7: 32,
            8: 32,
            9: 32,
            10: 128,
            J: 32,
            Q: 32,
            K: 32,
            A: 32,
        };

        dealtCards.forEach((card) => {
            if (fullDeck[card] > 0) {
                fullDeck[card]--;
            }
        });

        return fullDeck;
    }

    // Helper function to draw a card from the deck
    function drawCard(deck) {
        const cards = Object.keys(deck).filter((card) => deck[card] > 0);
        if (cards.length === 0) return null;
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        deck[randomCard]--;
        return randomCard;
    }

    // Simulate dealer play
    function playDealer(deck, initialHand) {
        let hand = [...initialHand];
        let handValue = calculateHandValue(hand);

        while (handValue < 17) {
            const card = drawCard(deck);
            if (!card) break;
            hand.push(card);
            handValue = calculateHandValue(hand);
        }

        return handValue > 21; // Return true if dealer busts
    }

    let bustCount = 0;

    for (let i = 0; i < iterations; i++) {
        // Generate the deck based on undealt cards
        const currentDeck = generateDeck(dealtCards);

        // Draw two initial cards for the dealer
        const initialHand = [drawCard(currentDeck), drawCard(currentDeck)];

        // Check if the dealer busts
        if (playDealer(currentDeck, initialHand)) {
            bustCount++;
        }
    }

    return bustCount / iterations; // Return bust rate
}

// Example dealt cards
const dealtCards = [
    "2",
    "3",
    "A",
    "10",
    "K",
    "7",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "K",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
    "10",
];

const bustRate = simulateDealerBust(dealtCards, 100000);
console.log(`Dealer bust rate: ${(bustRate * 100).toFixed(2)}%`);
