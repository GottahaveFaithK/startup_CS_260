
const vultureDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "...",
      "How fortunate for you.",
      "This wont stop the inevitable.",
      "If you get the opportunity, destroy this die."
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Hmmm...",
      "Acceptable.",
      "How useful."
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Well done.",
      "You executed a better if less satisfying strategy.",
      "I accept this defeat."
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "Your pieces all fell before me.",
      "It is over.",
      "May I keep a die as a trophy?",
      "Finished."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Such a rush, isn't it?",
      "Good.",
      "Adequate",
      "Do you find it as rewarding as I do?"
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "I had been hoping to do this exact thing.",
      "Crushed.",
      "Perfect.",
      "This is why I play.",
      "Destroyed.",
      "Watch the score fall.",
      "Yes."
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "So be it.",
      "Noted.",
      "Chasing a higher score I presume."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "A needed placement.",
      "Already thinking of how to destroy this arrangement? Good.",
      "..."
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Let us begin.",
      "I hope you brought plenty of dice."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "How dissapointing for us both."
    ]
    }
};

export default vultureDialogue;