const opponents = {
    duck: {
        name: 'Duck',
        dialogue: "Placeholder dialogue",
        spriteSheet: '/opponent_sheets/ducksheet.png',
        diceSheet: '/dice_sets/die.png',
        strategy: 'balanced',

        special: null,
    },

    peacock: {
        name: 'Peacock',
        dialogue: "You dare challenge the master?",
        spriteSheet: '/opponent_sheets/peacock.png',
        diceSheet: '/dice_sets/peacockdie.png',
        strategy: 'balanced',

        special: null,
    },

    kea: {
        name: 'Kea',
        dialogue: "Oooh! Let's play a game!",
        spriteSheet: '/opponent_sheets/kea.png',
        diceSheet: '/dice_sets/keadie.png',
        strategy: 'one_round_ahead',

        special: 'ask_for_roll',
    },
};

export default opponents;