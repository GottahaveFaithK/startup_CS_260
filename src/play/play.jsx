import React,{useState, useEffect} from 'react';
import './play.css';
import opponents from '../opponents/opponents';
import { chooseDuckMove } from '../opponents/opponentStrategies/duck';
import { calculateColumnScore, calculateScore } from './game/scoring';
import { isBoardFull } from './game/gameRules';


import DialogueBox from '../components/dialogueBox';
import duckDialogue from '../opponents/dialogue/duck';
import { getDialogue } from '../opponents/dialogue/getDialogue';

export default function Play() {

    const opponent = opponents.duck;
    const [currentDie, setCurrentDie] = useState(5);
    const [isRolling, setIsRolling] = useState(false)
    const [isRollable, setIsRollable] = useState(true);

    const dieFaces = ['one', 'two', 'three', 'four', 'five', 'six'];
    const [playerBoard, setPlayerBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);

    const [computerBoard, setComputerBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [computerDie, setComputerDie] = useState(null);

    const [isComputerTurn, setIsComputerTurn] = useState(false);

    const playerScore = calculateScore(playerBoard);
    const computerScore = calculateScore(computerBoard);

    const [gameOver, setGameOver] = useState(false);
    const playerWon = playerScore > computerScore;
    const isTie = playerScore === computerScore;

    const [currentDialogue, setCurrentDialogue] = useState('');

    function triggerDialogue(trigger) {
        const line = getDialogue(duckDialogue, trigger);

        if (line !== null) {
            setCurrentDialogue(line);
        }
    }

    useEffect(() => {
        triggerDialogue('gameStart');
    }, []);

    function playAgain() {
        setPlayerBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);

        setComputerBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]);

        setCurrentDie(5);
        setComputerDie(null);
        setGameOver(false);
        setIsRolling(false);
        setIsRollable(true);
        setIsComputerTurn(false);
    }

    function rollDie() {
        if(gameOver || isRolling || !isRollable){
            return;
        }

        setIsRolling(true)
        setIsRollable(false)

        setTimeout(() => {
            setCurrentDie(Math.floor(Math.random() * 6) + 1)
            setIsRolling(false)
        }, 1500);
    }

    function placeDie(rowIndex, colIndex) {
        if (gameOver || isRolling || isRollable || isComputerTurn) {
            return;
        }

        if (playerBoard[rowIndex][colIndex] !== null) {
            return;
        }

        const updatedBoard = playerBoard.map((row, r) =>
            row.map((die, c) => {
                if (r === rowIndex && c === colIndex) {
                    return currentDie;
                }
                return die;
            })
        );

        setPlayerBoard(updatedBoard);

        const updatedComputerBoard = computerBoard.map(row =>
            row.map((die, c) => {
                if (c === colIndex && die === currentDie) {
                    return null;
                }
                return die;
            })
        );

        setComputerBoard(updatedComputerBoard);

        if (isBoardFull(updatedBoard) || isBoardFull(updatedComputerBoard)) {
            setGameOver(true);
            setIsRollable(false);
            return;
        }
        setIsComputerTurn(true);

        setTimeout(() => {
            computerTurn(updatedComputerBoard, updatedBoard);
            setIsComputerTurn(false);
            setIsRollable(true);
        }, 1000);
    }

    function computerTurn(currentComputerBoard, currentPlayerBoard) {
        const roll = Math.floor(Math.random() * 6) + 1;
        setComputerDie(roll);

        const choice = chooseDuckMove(
            roll,
            currentComputerBoard,
            currentPlayerBoard
        );

        if (choice === null) {
            return;
        }

        const updatedBoard = currentComputerBoard.map((row, rowIndex) =>
            row.map((die, colIndex) => {
                if (
                    rowIndex === choice.rowIndex &&
                    colIndex === choice.colIndex
                ) {
                    return roll;
                }
                return die;
            })
        );

        setComputerBoard(updatedBoard);

        const updatedPlayerBoard = currentPlayerBoard.map((row, rowIndex) =>
            row.map((die, colIndex) => {
                if (colIndex === choice.colIndex && die === roll) {
                    return null;
                }
                return die;
            })
        );

        setPlayerBoard(updatedPlayerBoard);
        if (isBoardFull(updatedBoard) || isBoardFull(updatedPlayerBoard)) {
            setGameOver(true);
        }
    }

    return (
        <main className = "container background-table">
            <div className="row">
                <section className="game-panel opponent-panel col-md-4 order-1">
                    <h2>Opponent</h2>

                    <div
                        className="opponent-avatar"
                        style={{ backgroundImage: `url(${opponent.spriteSheet})` }}
                    ></div>

                    <p className="opponent-name">{opponent.name}</p>

                    <DialogueBox text={currentDialogue} />
                </section>

                <section className="game-panel col-md-8 board-panel order-2">
                    <h2>Computer Board</h2>

                    <table className="game-board">
                        <tbody>
                            {computerBoard.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((die, colIndex) => (
                                        <td className="board-cell" key={colIndex}>
                                            {die !== null && (
                                                <span
                                                    className={`die die-${dieFaces[die - 1]}`}
                                                    style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                                ></span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="game-panel col-md-4 order-4 order-md-3">
                    <div className="score-section">
                        <h2>Score</h2>

                        <h3 className="score-heading">
                            Your Score: {playerScore}
                        </h3>

                        <h3 className="score-heading">
                            {opponent.name}'s Score: {computerScore}
                        </h3>

                        {gameOver && (
                            <div className="game-over-overlay">
                                <div
                                className={`game-over-modal ${
                                    isTie ? 'tie' : playerWon ? 'victory' : 'defeat'
                                }`}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="game-over-title"
                                >
                                <h2 id="game-over-title">
                                    {isTie
                                    ? "It's a Tie!"
                                    : playerWon
                                    ? 'Victory!'
                                    : 'Defeat!'}
                                </h2>

                                <p className="game-over-subtitle">
                                    {isTie
                                    ? 'An even match!'
                                    : playerWon
                                    ? `You defeated ${opponent.name}!`
                                    : `${opponent.name} won this round.`}
                                </p>

                                <div className="final-scores">
                                    <div className="final-score">
                                    <span>You</span>
                                    <strong>{playerScore}</strong>
                                    </div>

                                    <span className="score-divider">—</span>

                                    <div className="final-score">
                                    <span>{opponent.name}</span>
                                    <strong>{computerScore}</strong>
                                    </div>
                                </div>

                                <button
                                    className="leaderboard-button"
                                    onClick={() =>
                                    alert('Leaderboard submission will be available soon!')
                                    }
                                >
                                    Submit Score
                                </button>

                                <button
                                    className="play-again-button"
                                    onClick={playAgain}
                                >
                                    Play Again
                                </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="current-die-section">
                        <h2>Current Die</h2>

                        <div>
                            <span
                                className={`die die-${dieFaces[currentDie - 1]} ${isRolling ? 'rolling' : ''}`}
                            ></span>
                        </div>

                        <button
                            className="roll-button"
                            onClick={rollDie}
                            disabled={gameOver || isRolling || !isRollable || isComputerTurn}
                        >
                            Roll Die
                        </button>
                    </div>
                </section>

                <section className="game-panel col-md-8 board-panel order-3 order-md-4">

                <table className="game-board player-board">
                    <tbody>
                        {playerBoard.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((die, colIndex) => (
                                    <td
                                        className="board-cell"
                                        key={colIndex}
                                        onClick={() => placeDie(rowIndex, colIndex)}
                                    >
                                        {die !== null && (
                                            <span className={`die die-${dieFaces[die - 1]}`}></span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                    <h2>Your Board</h2>

                </section>

            </div>
        </main>
    );
}
