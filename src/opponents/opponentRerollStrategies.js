import { evaluateKeaRoll } from './opponentStrategies/kea.js';


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

export function shouldPigeonReroll(roll, computerBoard, playerBoard) {
    const currentValue = getBestPigeonMoveValue(
        roll,
        computerBoard,
        playerBoard
    );

    let totalValue = 0;

    for (let possibleRoll = 1; possibleRoll <= 6; possibleRoll++) {
        totalValue += getBestPigeonMoveValue(
            possibleRoll,
            computerBoard,
            playerBoard
        );
    }

    const averageValue = totalValue / 6;

    return currentValue < averageValue;
}

export function shouldKeaReroll(roll, computerBoard, playerBoard) {
    const evaluations = [];

    for (let possibleRoll = 1; possibleRoll <= 6; possibleRoll++) {
        evaluations.push(
            evaluateKeaRoll(
                possibleRoll,
                computerBoard,
                playerBoard
            ).value
        );
    }

    const currentValue = evaluations[roll - 1];

    const averageValue =
        evaluations.reduce((total, value) => total + value, 0) / 6;

    return currentValue < averageValue;
}

const opponentRerollStrategies = {
    duck: shouldPeacockReroll,
    peacock: shouldPeacockReroll,
    magpie: shouldMagpieReroll,
    vulture: shouldVultureReroll,
    pigeon: shouldPigeonReroll,
    kea: shouldKeaReroll,
};

export default opponentRerollStrategies;