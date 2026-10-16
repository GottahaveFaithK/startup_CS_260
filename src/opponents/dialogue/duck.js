
const duckDialogue = {
  rollOne: {
    chance: 0.2,
    lines: [
      "That wasn't really what I had hoped for.",
      "Whelp.",
      "Sometimes I feel like these clog up my board.",
      "What do I do with this?"
    ]
  },

  rollSix: {
    chance: 0.2,
    lines: [
      "Oh! This is good!",
      "Let's roll that again next turn.",
      "Great roll!"
    ]
  },

  playerWins: {
    chance: 1,
    lines: [
      "Good game!",
      "You are good at this!",
      "Nice! Do you have any advice for me?",
      "Guess it's not my night.",
      "You're playing like Kea! I think..."
    ]
  },

  playerLoses: {
    chance: 1,
    lines: [
      "Good game!",
      "Oh! I won!",
      "It was a close game."
    ]
  },

  playerDestroysDice: {
    chance: 0.1,
    lines: [
      "I was using those.",
      "Hey!",
      "Wait!"
    ]
  },

  birdDestroysDice: {
    chance: 0.1,
    lines: [
      "I don't like those.",
      "Let's clear the board.",
      "Don't mind me."
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    lines: [
      "Woah.",
      "Solid!",
      "Great move!",
      "I might be in trouble."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    lines: [
      "I think I'm getting the hang of this.",
      "Things are looking up!",
      "Yes!"
    ]
  },

  gameStart: {
    chance: 1,
    lines: [
      "Good luck!"
    ]
  }
};

export default duckDialogue;