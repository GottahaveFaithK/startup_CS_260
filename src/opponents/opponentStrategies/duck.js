
export function chooseDuckMove(roll, computerBoard, playerBoard) {

    const preferredCells = [];
    let myhighestMatchCount = 0;

    for (let colIndex = 0; colIndex < 3; colIndex++) {
        const matchCount = computerBoard.filter(
            row => row[colIndex] === roll
        ).length;

        const emptyRows = [];

        computerBoard.forEach((row, rowIndex) => {
            if (row[colIndex] === null) {
            emptyRows.push(rowIndex);
            }
        });

        if (matchCount > 0 && emptyRows.length > 0) {
            if (matchCount > myhighestMatchCount) {
                myhighestMatchCount = matchCount;
                preferredCells.length = 0;
            }

            if (matchCount === myhighestMatchCount) {
                emptyRows.forEach(rowIndex => {
                    preferredCells.push({ rowIndex, colIndex });
                });
            }
        }
    }

    if (preferredCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * preferredCells.length);
        return preferredCells[randomIndex];
    }

    const counterCells = [];
    let highestMatchCount = 0;

    for (let colIndex = 0; colIndex < 3; colIndex++) {
        const playerMatchCount = playerBoard.filter(
            row => row[colIndex] === roll
        ).length;

        const computerHasSpace = computerBoard.some(
            row => row[colIndex] === null
        );

        if (playerMatchCount > 0 && computerHasSpace) {
            if (playerMatchCount > highestMatchCount) {
            highestMatchCount = playerMatchCount;
            counterCells.length = 0;
            }

            if (playerMatchCount === highestMatchCount) {
            computerBoard.forEach((row, rowIndex) => {
                if (row[colIndex] === null) {
                counterCells.push({ rowIndex, colIndex });
                }
            });
            }
        }
    }

    if (counterCells.length > 0 && Math.random() < 0.2) {
        const randomIndex = Math.floor(Math.random() * counterCells.length);
        return counterCells[randomIndex];
    }

    const emptyCells = [];

    computerBoard.forEach((row, rowIndex) => {
        row.forEach((die, colIndex) => {
            if (die === null) {
            emptyCells.push({ rowIndex, colIndex });
            }
        });
    });

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    return null;
}