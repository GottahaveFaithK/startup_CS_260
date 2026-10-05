const opponents = {
    duck: {
        name: 'Duck',
        dialogue: "Good luck!",
        flavorText: "He's just happy to be here",
        spriteSheet: '/opponent_sheets/ducksheet.png',
        diceSheet: '/dice_sets/die.png',
        strategy: 'balanced',

        special: null,
    },

    vulture: {
        name: 'Vulture',
        flavorText: "Her favorite part is destroying her opponent's dice",
        dialogue: "Let us begin.",
        spriteSheet: '/opponent_sheets/vulture.png',
        diceSheet: '/dice_sets/vulturedie.png',
        strategy: 'aggressive',

        special: null,
    },

    peacock: {
        name: 'Peacock',
        flavorText: "So naturally talented he has never read the rules",
        dialogue: "You dare challenge the master?",
        spriteSheet: '/opponent_sheets/peacock.png',
        diceSheet: '/dice_sets/peacockdie.png',
        strategy: 'random',

        special: null,
    },

    pigeon: {
        name: 'Pigeon',
        flavorText: "Would like people to stop underestimating him",
        dialogue: "Everyone assumes I'm the worst player. Peacock doesn't even know how to play!",
        spriteSheet: '/opponent_sheets/pigeon.png',
        diceSheet: '/dice_sets/pigeondie.png',
        strategy: 'gap_max', //not favoring increasing his own score or destroyign dice, but trying to pick whichever increases his score most

        special: null,
    },

    kea: {
        name: 'Kea',
        flavorText: "She got kicked out of poker for counting cards",
        dialogue: "Oooh! Let's play a game!",
        spriteSheet: '/opponent_sheets/kea.png',
        diceSheet: '/dice_sets/keadie.png',
        strategy: 'one_round_ahead', //same as pigeon but looks at possibilities for the players next turn, and the her next turn

        special: 'ask_for_roll',
    },

    magpie: {
        name: 'Magpie',
        flavorText: "Her \"lucky dice\" have never rolled a one",
        dialogue: "Ehehehe, I have a good feeling about this match",
        spriteSheet: '/opponent_sheets/magpie.png',
        diceSheet: '/dice_sets/magpiedie.png',
        strategy: 'balanced',

        special: 'loaded_dice',
    },
};

export default opponents;