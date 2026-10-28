
function calculateColumnScore(board, colIndex) {
    const column = board
    .map(row => row[colIndex])
    .filter(die => die !== null);

    let score = 0;

    column.forEach(die => {
        const matchingDice = column.filter(value => value === die).length;
        score += die * matchingDice;
    });

    return score;

    }

export function calculateScore(board) {
    let total = 0;

    for (let colIndex = 0; colIndex < 3; colIndex++) {
        total += calculateColumnScore(board, colIndex);
    }

    return total;

}