const magpieDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "How did you hack the system?!"
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Lucky day!",
      "What are the odds.",
      "Ehehehe...",
      "Well would you look at that.",
      "A six? How shocking.",
      "Another six!"
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
    lines: [
      "How did this happen? Do I need new dice?",
      "Fine, fine, you win.",
      "I thought I had the advantage?",
      "This doesn't make sense."
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "I am Fortune's favourite.",
      "Wow! What a *lucky* game!",
      "Don't question the rolls darling, I won fair and square.",
      "Another win for me!",
      "Ehehehehehe..."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Hey! Don't touch those!",
      "My dice!!!",
      "Stop it!"
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Yoink!",
      "You won't be needing these.",
      "No more of those dull dice."
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "Savor that moment, luck isn't on your side.",
      "Oh nooooooo, whatever will I do?",
      "Tsk tsk.",
      "Oooooh how scaaaary."
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "Can't stop me!",
      "Hehe, another great move.",
      "Here I go again!",
      "I think I'm going to win this!"
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Ehehehe, I have a good feeling about this match."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "Oh. You got closer to winning than I expected."
    ]
    }
};

export default magpieDialogue;