export function shouldPeacockReroll(roll) {
    return roll === 1;
}

export function shouldDuckReroll(roll) {
    return roll === 1;
}

export function shouldMagpieReroll(roll){
    return roll !== 6;
}

export function shouldVultureReroll(roll, computerBoard, playerBoard) {
    const playerDiceCount = playerBoard.flat().filter(
        die => die !== null
    ).length;

    if (playerDiceCount < 4) {
        return false;
    }

    for (let colIndex = 0; colIndex < 3; colIndex++) {
        const playerHasMatch = playerBoard.some(
            row => row[colIndex] === roll
        );

        const computerHasSpace = computerBoard.some(
            row => row[colIndex] === null
        );

        if (playerHasMatch && computerHasSpace) {
            return false;
        }
    }

    return true;
}