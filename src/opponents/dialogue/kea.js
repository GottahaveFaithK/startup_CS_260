
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
      "Six in the mix, my board it may fix!",
      "Ohoho!"
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
      "Another match!",
    ]
  },

  playerLoses: {
    chance: 1,
    animation: 'talk-happy',
    lines: [
      "Another round? I think you can win the next one.",
      "Ah, that's unlucky friend.",
      "Not bad!",
      "I'm always down for a rematch if you want?",
      "Winning the rematch requires a positive change of luck or strategy. What are you betting on?"
    ]
  },

  playerDestroysDice: {
    chance: 0.2,
    animation: 'talk',
    lines: [
      "Pruning my board? How fun!",
      "Time to pivot!",
      "Ohohoho! It's on!",
      "Is this why the singular is called die? Ha!",
      "Oh, I might have needed that."
    ]
  },

  birdDestroysDice: {
    chance: 0.2,
    animation: 'talk-happy',
    lines: [
      "Let's tidy things up!",
      "The die shall die!",
      "Pop goes the weasel! Do you know where that phrase came from? I don't!",
      "Time to go on the offensive! Or, well one could argue removing dice is actually defensive. Thoughts?"
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
      "Delightful! Do it again!",
      "Lucky duck! Well... Duck isn't actually unusually lucky. But you seem to be!"
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
      "Oooh! Let's play a game!",
      "Ohoho! I cannot wait!",
      "What's your game plan? Wait! Don't tell me, I want to see it."
    ]
  },

  gameTie: {
    chance: 1,
    animation: 'talk',
    lines: [
        "All tied up? This calls for a rematch!",
        "A tie? Now that is actually hard to do!"
    ]
    },

    keaRollOffer: {
      chance: 1,
      animation: 'talk',
      lines: [
          "Can I roll your die this turn?",
          "Let's test luck by having me roll your die! If that's okay?",
          "Care to let me take the reins for this roll?",
          "Let me roll your die this round! For science!"
      ]
  },

  keaRollYes: {
      chance: 1,
      animation: 'talk-happy',
      lines: [
          "Thank you, my most wonderful friend!",
          "I hope this is better than the likely counterfactual!",
          "Ohohoho! Let's hope I roll well!",
          "I won't let you down!"
      ]
  },

  keaRollNo: {
      chance: 1,
      animation: 'talk',
      lines: [
          "Ah, well, yeah that is fair. Continue.",
          "Right, sorry! Got carried away!",
          "Didn't mean to overstep friend!"
      ]
  }
};

export default keaDialogue;