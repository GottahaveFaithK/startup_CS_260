
export function isBoardFull(board) {
  return board.every(row => row.every(cell => cell !== null));
}

export function createEmptyBoard() {
    return Array.from(
        { length: 3 },
        () => Array(3).fill(null)
    );
}