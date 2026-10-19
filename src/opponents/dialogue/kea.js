
const keaDialogue = {
  rollOne: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Ah well, we can work with this.",
      "That changes a few things.",
      "Next game we should alter scoring and make 1's valuable for novelty.",
      "Luck is such a fickle friend.",
      "Is it weird if I somewhat enjoy 1's? They keep me thinking.",
      "With a one the game is not won yet I am not done. Ha!"
    ]
  },

  rollSix: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Highest scoring potential sometimes causes overthinking, don't you think?",
      "Decisions, decisions.",
      "Six in the mix, my board it may fix!"
    ]
  },

  playerWins: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Excellent! Let's play again!",
      "Rematch, please! This is the most fun I have had in a while.",
      "Again please! I have a few things I want to test.",
      "A win well deserved!",
      "Another match!"
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "Another round? I think you can win the next one.",
      "Ah, that's unlucky friend.",
      "Not bad!",
      "I'm always down for a rematch if you want?"
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Pruning my board? How fun!",
      "Time to pivot!",
      "Ohohoho! It's on!",
      "Is this why the singular is called die? Ha!"
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Let's tidy things up!",
      "The die shall die!",
      "Pop goes the weasel! Do you know where that phrase came from? I don't!"
    ]
  },

  playerGoodMove: {
    chance: 0.5,
    animation: 'talk',
    lines: [
      "Yes! Excellent!",
      "My position is seeming precarious!",
      "I love it!",
      "Writing that one down.",
      "Delightful! Do it again!"
    ]
  },

  birdGoodMove: {
    chance: 0.6,
    animation: 'talk-happy',
    lines: [
      "I am never fully certain if this game is more luck or skill.",
      "I'm on a rolllllll.",
      "Watch the numbers soar!"
    ]
  },

  gameStart: {
    chance: 1,
    animation: 'talk',
    lines: [
      "Oooh! Let's play a game!"
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "All tied up? This calls for a rematch!"
    ]
    }
};

export default keaDialogue;