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
      "This means nothing! Nothing!",
      "This is a worthless game anyway.",
      "Not. A. Word.",
      "No! This isn't over!",
      "I let you win! Yes, I did. Express your gratitude!"
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "I win, how utterly predictable.",
      "All according to my master plan.",
      "Don't feel bad, you lost to the best after all.",
      "You may express your adoration now.",
      "You weren't even worth the effort."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "How uncouth!",
      "Well I never!",
      "How did you do that?",
      "You will regret this!",
      "I demand you stop that behavior this instant!"
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
      "Harumph.",
      "I'm allowing you to do that. Let you have a little hope."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "Yet another masterstroke by me.",
      "You've already lost.",
      "You can forfeit anytime.",
      "I make great moves as this with such regularity that it's just baseline."
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "You dare challenge the master?",
      "Prepare yourself to be truly humbled.",
      "I do hope you make this worth my time."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "We are not equals!",
        "Don't act so smug!"
    ]
    }
};

export default peacockDialogue;