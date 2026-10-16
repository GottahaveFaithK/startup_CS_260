export function getDialogue(dialogue, trigger) {
  const category = dialogue[trigger];

  if (!category || category.lines.length === 0) {
    return null;
  }

  if (Math.random() >= category.chance) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * category.lines.length
  );

  return category.lines[randomIndex];
}

const dialoguePriority = {
  playerWins: 100,
  playerLoses: 100,
  playerDestroysDice: 60,
  birdDestroysDice: 60,
  playerGoodMove: 80,
  birdGoodMove: 80,
  rollOne: 30,
  rollSix: 30,
  gameStart: 100
};