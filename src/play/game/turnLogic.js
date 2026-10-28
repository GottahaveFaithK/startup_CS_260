import { calculateScore } from './scoring';
import { isBoardFull } from './gameRules';


    function getGameOverTrigger(playerBoard, computerBoard) {
        const playerScore = calculateScore(playerBoard);
        const computerScore = calculateScore(computerBoard);

        if (playerScore > computerScore) return 'playerWins';
        if (playerScore < computerScore) return 'playerLoses';

        return 'gameTie';
    }

    function getGameEndResult(playerBoard, computerBoard) {
        const gameEnded =
            isBoardFull(playerBoard) || isBoardFull(computerBoard);

        return {
            gameEnded,
            gameOverTrigger: gameEnded
                ? getGameOverTrigger(playerBoard, computerBoard)
                : null
        };
    }

    export function applyPlayerMove({
        playerBoard,
        computerBoard,
        rowIndex,
        colIndex,
        die
    }) {
        if (playerBoard[rowIndex][colIndex] !== null) {
            return { valid: false };
        }

        const events = [];

        const destroysDice = computerBoard.some(
            row => row[colIndex] === die
        );

        if (destroysDice) {
            events.push('playerDestroysDice');
        }

        const updatedPlayerBoard = playerBoard.map((row, r) =>
            row.map((value, c) =>
                r === rowIndex && c === colIndex ? die : value
            )
        );

        const updatedComputerBoard = computerBoard.map(row =>
            row.map((value, c) =>
                c === colIndex && value === die ? null : value
            )
        );

        const scoreDifference =
            calculateScore(updatedPlayerBoard) -
            calculateScore(playerBoard);

        if (scoreDifference >= 18) {
            events.push('playerGoodMove');
        }

        const endResult = getGameEndResult(
            updatedPlayerBoard,
            updatedComputerBoard
        );

        if (endResult.gameOverTrigger) {
            events.push(endResult.gameOverTrigger);
        }

        return {
            valid: true,
            playerBoard: updatedPlayerBoard,
            computerBoard: updatedComputerBoard,
            events,
            ...endResult
        };
    }

    export function applyComputerMove({
        computerBoard,
        playerBoard,
        roll,
        choice
    }) {
        const events = [];

        if (roll === 1) events.push('rollOne');
        if (roll === 6) events.push('rollSix');

        if (choice === null) {
            return {
                moved: false,
                events
            };
        }

        const placedRoll = choice.roll ?? roll;

        const destroysDice = playerBoard.some(
            row => row[choice.colIndex] === placedRoll
        );

        if (destroysDice) {
            events.push('birdDestroysDice');
        }

        const updatedComputerBoard = computerBoard.map(
            (row, rowIndex) =>
                row.map((value, colIndex) =>
                    rowIndex === choice.rowIndex &&
                    colIndex === choice.colIndex
                        ? placedRoll
                        : value
                )
        );

        const updatedPlayerBoard = playerBoard.map(row =>
            row.map((value, colIndex) =>
                colIndex === choice.colIndex && value === placedRoll
                    ? null
                    : value
            )
        );

        const scoreDifference =
            calculateScore(updatedComputerBoard) -
            calculateScore(computerBoard);

        if (scoreDifference >= 18) {
            events.push('birdGoodMove');
        }

        const endResult = getGameEndResult(
            updatedPlayerBoard,
            updatedComputerBoard
        );

        if (endResult.gameOverTrigger) {
            events.push(endResult.gameOverTrigger);
        }

        return {
            moved: true,
            placedRoll,
            playerBoard: updatedPlayerBoard,
            computerBoard: updatedComputerBoard,
            events,
            ...endResult
        };
    }