
export function isBoardFull(board) {
  return board.every(row => row.every(cell => cell !== null));
}