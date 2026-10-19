import { calculateScore } from '../../play/game/scoring';

function simulateMove(roll, rowIndex, colIndex, computerBoard, playerBoard) {
    const newComputerBoard = structuredClone(computerBoard);
    const newPlayerBoard = structuredClone(playerBoard);

    newComputerBoard[rowIndex][colIndex] = roll;

    newPlayerBoard.forEach(row => {
        if (row[colIndex] === roll) {
            row[colIndex] = null;
        }
    });

    return {
        computerBoard: newComputerBoard,
        playerBoard: newPlayerBoard,
    };
}

function findBestMove(roll, turnBoard, opposingBoard) {
    const currentTurnScore = calculateScore(turnBoard);
    const currentOpposingScore = calculateScore(opposingBoard);

    let bestValue = -Infinity;
    let bestMove = null;

    turnBoard.forEach((row, rowIndex) => {
        row.forEach((die, colIndex) => {
            if (die === null) {
                const newTurnBoard = structuredClone(turnBoard);
                const newOpposingBoard = structuredClone(opposingBoard);

                newTurnBoard[rowIndex][colIndex] = roll;

                newOpposingBoard.forEach(row => {
                    if (row[colIndex] === roll) {
                        row[colIndex] = null;
                    }
                });

                const moveValue =
                    (calculateScore(newTurnBoard) - currentTurnScore) +
                    (currentOpposingScore - calculateScore(newOpposingBoard));

                if (moveValue > bestValue) {
                    bestValue = moveValue;
                    bestMove = {
                        turnBoard: newTurnBoard,
                        opposingBoard: newOpposingBoard,
                        rowIndex,
                        colIndex,
                        moveValue,
                    };
                }
            }
        });
    });

    return bestMove;
}

function isBoardFull(board) {
    return board.every(row => row.every(die => die !== null));
}

export function chooseKeaMove(roll, computerBoard, playerBoard) {
    let bestAverageValue = -Infinity;
    let bestMove = null;

    computerBoard.forEach((row, rowIndex) => {
        row.forEach((die, colIndex) => {
            if (die === null) {

                const firstMove = simulateMove(
                    roll,
                    rowIndex,
                    colIndex,
                    computerBoard,
                    playerBoard
                );

                if (
                    isBoardFull(firstMove.computerBoard) ||
                    isBoardFull(firstMove.playerBoard)
                ) {
                    const finalGap =
                        calculateScore(firstMove.computerBoard) -
                        calculateScore(firstMove.playerBoard);

                    if (finalGap > bestAverageValue) {
                        bestAverageValue = finalGap;
                        bestMove = { rowIndex, colIndex };
                    }

                    return;
                }

                let totalValue = 0;

                for (let playerRoll = 1; playerRoll <= 6; playerRoll++) {
                    const playerMove = findBestMove(
                        playerRoll,
                        firstMove.playerBoard,
                        firstMove.computerBoard
                    );

                    if (playerMove === null) {
                        totalValue +=
                            calculateScore(firstMove.computerBoard) -
                            calculateScore(firstMove.playerBoard);

                        continue;
                    }

                    if (
                        playerMove !== null &&
                        (
                            isBoardFull(playerMove.turnBoard) ||
                            isBoardFull(playerMove.opposingBoard)
                        )
                    ) {
                        totalValue +=
                            calculateScore(playerMove.opposingBoard) -
                            calculateScore(playerMove.turnBoard);

                        continue;
                    }


                    let totalReplyValue = 0;

                    for (let keaRoll = 1; keaRoll <= 6; keaRoll++) {
                        const keaReply = findBestMove(
                            keaRoll,
                            playerMove.opposingBoard,
                            playerMove.turnBoard
                        );

                        let finalGap;

                        if (keaReply === null) {
                            finalGap =
                                calculateScore(playerMove.opposingBoard) -
                                calculateScore(playerMove.turnBoard);
                        } else {
                            finalGap =
                                calculateScore(keaReply.turnBoard) -
                                calculateScore(keaReply.opposingBoard);
                        }

                        totalReplyValue += finalGap;
                    }

                    const averageReplyValue = totalReplyValue / 6;

                    totalValue += averageReplyValue;
                }

                const averageValue = totalValue / 6;

                if (averageValue > bestAverageValue) {
                    bestAverageValue = averageValue;
                    bestMove = { rowIndex, colIndex };
                }
            }
        });
    });

    return bestMove;
}