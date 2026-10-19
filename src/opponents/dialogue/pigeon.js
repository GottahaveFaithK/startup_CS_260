
const pigeonDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Can we switch dice?",
      "Oh... joy.",
      "I know it's statistics, but I think these dice hate me.",
      "At least you know these dice arent loaded."
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Honestly I expected a 1.",
      "Let me have this.",
      "It's the small things."
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
    lines: [
      "These cursed dice.",
      "Congrats.",
      "I'm not terrible, am I?",
      "Please tell me you have a lot of experience in the game.",
      "How...nevermind. Good game."
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "I won?!",
      "Thank you.",
      "Were you going easy on me?",
      "It was a tight game.",
      "If you want to play again, you can use my dice. No pressure though."
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Oh...",
      "Yeah, I would have done the same.",
      "Please don't.",
      "Fair."
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Don't be mad.",
      "It was the best avaliable move.",
      "Call me Vulture with plays like this. Haha... yeah that was bad. Sorry."
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "Good play.",
      "That may be a problem for me.",
      "Don't love that,"
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "Finally!",
      "I'm happy with that one.",
      "Please don't attack this column.",
      "Don't get excited, don't get excited. The game isn't won yet."
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Everyone assumes I'm the worst player. Peacock doesn't even know how to play!",
      "Here we go again."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "Huh... so it's a draw?"
    ]
    }
};

export default pigeonDialogue;