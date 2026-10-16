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