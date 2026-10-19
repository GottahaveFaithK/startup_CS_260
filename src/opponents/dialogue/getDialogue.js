export function getDialogue(dialogue, trigger, previousLine = null) {
  const category = dialogue[trigger];

  if (!category || category.lines.length === 0) {
    return null;
  }

  if (Math.random() >= category.chance) {
    return null;
  }

  const alternatives = category.lines.filter(
    line => line !== previousLine
  );

  const availableLines = alternatives.length > 0
    ? alternatives
    : category.lines;

  const randomIndex = Math.floor(
    Math.random() * availableLines.length
  );

  return availableLines[randomIndex];
}

const dialoguePriority = {
  playerWins: 100,
  playerLoses: 100,
  gameTie: 100,
  playerDestroysDice: 60,
  birdDestroysDice: 60,
  playerGoodMove: 80,
  birdGoodMove: 80,
  rollOne: 30,
  rollSix: 30,
  gameStart: 100
};


export function selectDialogueTrigger(events) {
  if (events.length === 0) {
    return null;
  }

  return events.reduce((highest, current) => {
    return dialoguePriority[current] > dialoguePriority[highest]
      ? current
      : highest;
  });
}