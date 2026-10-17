const peacockDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "How incongruous.",
      "Bah!",
      "I demand a reroll!",
      "Well I am number one, so perhaps this is poetic.",
      "Don't laugh."
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Pure unadulterated skill.",
      "Naturally.",
      "Do you envy my talent?",
      "As I intended.",
      "Envy doesn't look good on you."
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
    lines: [
      "How could this be?",
      "This is an affront!",
      "Why you must have cheated!",
      "I don't understand.",
      "Could I speak to some sort of referee or rule keeper?",
      "This means nothing! Nothing!"
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "I win, how utterly predictable.",
      "All according to my master plan.",
      "Don't feel bad, you lost to the best after all."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "How uncouth!",
      "Well I never!",
      "How did you do that?",
      "You will regret this!"
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Too easy.",
      "Get your pathetic dice off the board.",
      "Vanquished!"
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "Dumb luck.",
      "I doubt that is even legal.",
      "This changes nothing!",
      "Harumph."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "Yet another masterstroke by me.",
      "You've already lost.",
      "You can forfeit anytime. "
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "You dare challenge the master?",
      "Prepare yourself to be truly humbled."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "We are not equals!"
    ]
    }
};

export default peacockDialogue;