export function chooseVultureMove(roll, computerBoard, playerBoard) {
    const destructiveCells = [];
    let highestMatchCount = 0;

    for (let colIndex = 0; colIndex < 3; colIndex++) {
        const playerMatchCount = playerBoard.filter(
            row => row[colIndex] === roll
        ).length;

        const emptyRows = [];

        computerBoard.forEach((row, rowIndex) => {
            if (row[colIndex] === null) {
                emptyRows.push(rowIndex);
            }
        });

        if (playerMatchCount > 0 && emptyRows.length > 0) {
            if (playerMatchCount > highestMatchCount) {
                highestMatchCount = playerMatchCount;
                destructiveCells.length = 0;
            }

            if (playerMatchCount === highestMatchCount) {
                emptyRows.forEach(rowIndex => {
                    destructiveCells.push({ rowIndex, colIndex });
                });
            }
        }
    }

    if (destructiveCells.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * destructiveCells.length
        );
        return destructiveCells[randomIndex];
    }

    const preferredCells = [];
    let myHighestMatchCount = 0;

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
            if (matchCount > myHighestMatchCount) {
                myHighestMatchCount = matchCount;
                preferredCells.length = 0;
            }

            if (matchCount === myHighestMatchCount) {
                emptyRows.forEach(rowIndex => {
                    preferredCells.push({ rowIndex, colIndex });
                });
            }
        }
    }

    if (preferredCells.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * preferredCells.length
        );
        return preferredCells[randomIndex];
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
        const randomIndex = Math.floor(
            Math.random() * emptyCells.length
        );
        return emptyCells[randomIndex];
    }

    return null;
}