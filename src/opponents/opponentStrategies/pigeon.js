import { calculateScore } from '../../play/game/scoring';

export function choosePigeonMove(roll, computerBoard, playerBoard) {
    const currentComputerScore = calculateScore(computerBoard);
    const currentPlayerScore = calculateScore(playerBoard);

    let highestValue = -Infinity;
    let bestMove = null;
    computerBoard.forEach((row, rowIndex) => {
        row.forEach((die, colIndex) => {
            if (die === null) {
                const testComputerBoard = structuredClone(computerBoard);
                const testPlayerBoard = structuredClone(playerBoard);

                testComputerBoard[rowIndex][colIndex] = roll;

                testPlayerBoard.forEach((row) => {
                    if (row[colIndex] === roll) {
                        row[colIndex] = null;
                    }
                });

                const newComputerScore = calculateScore(testComputerBoard);
                const newPlayerScore = calculateScore(testPlayerBoard);

                const moveValue =
                    (newComputerScore - currentComputerScore) +
                    (currentPlayerScore - newPlayerScore);

                if (moveValue > highestValue) {
                    highestValue = moveValue;
                    bestMove = { rowIndex, colIndex };
                }
            }
        });
    });

    return bestMove;
}