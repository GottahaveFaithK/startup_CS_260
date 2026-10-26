
const duckDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "That wasn't really what I had hoped for.",
      "Whelp.",
      "Sometimes I feel like these clog up my board.",
      "What do I do with this?"
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Oh! This is good!",
      "Let's roll that again next turn.",
      "Great roll!"
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
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
    animation: 'talk-happy',
    lines: [
      "Good game!",
      "Oh! I won!",
      "It was a close game."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "I was using those.",
      "Hey!",
      "Wait!",
      "Give me a moment, I'm not sure what to do now."
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "I don't like those dice of yours.",
      "Let's clear the board.",
      "Don't mind me.",
      "My turn to remove dice!"
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "Woah.",
      "Solid!",
      "Great move!",
      "I might be in trouble.",
      "I don't like the look of that."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "I think I'm getting the hang of this.",
      "Things are looking up!",
      "Yes!",
      "Did you see that?"
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Good luck!",
      "I'm still figuring out some of the rules, hope that is alright!"
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "Well, that's a funny way to end things.",
        "I didn't know we could do that",
        "Huh! I've never tied before!"
    ]
    }
};

export default duckDialogue;