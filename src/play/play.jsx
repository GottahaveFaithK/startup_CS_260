import React,{useState, useEffect, useRef} from 'react';
import './play.css';
import opponents from '../opponents/opponents';

import { chooseDuckMove } from '../opponents/opponentStrategies/duck';
import { chooseVultureMove } from '../opponents/opponentStrategies/vulture';

import { calculateColumnScore, calculateScore } from './game/scoring';
import { isBoardFull } from './game/gameRules';
import OpponentAvatar from '../components/OpponentAvatar';


import DialogueBox from '../components/dialogueBox';
import duckDialogue from '../opponents/dialogue/duck';
import peacockDialogue from '../opponents/dialogue/peacock';
import vultureDialogue from '../opponents/dialogue/vulture';
import { getDialogue, selectDialogueTrigger } from '../opponents/dialogue/getDialogue';
import { useParams } from 'react-router-dom';

export default function Play() {

    const { opponentId } = useParams();
    const opponent = opponents[opponentId] ?? opponents.duck;
    const opponentDialogue = {
        duck: duckDialogue,
        vulture: vultureDialogue,
        peacock: peacockDialogue,
    }[opponentId] ?? duckDialogue;

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
    const [pendingGameOver, setPendingGameOver] = useState(false);

    const [avatarAnimation, setAvatarAnimation] = useState('idle');
    const animationReturnTimer = useRef(null);
    const [blinkRequested, setBlinkRequested] = useState(false);

    const [showRules, setShowRules] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);

    function triggerDialogue(trigger) {
        const line = getDialogue(opponentDialogue, trigger);
        if (line === null) return;

        clearTimeout(animationReturnTimer.current);

        setCurrentDialogue(line);
        setBlinkRequested(false);
        setAvatarAnimation(opponentDialogue[trigger]?.animation ?? 'talk');
    }

    useEffect(() => {
        if (avatarAnimation !== 'idle') return;

        const delay = 8000 + Math.random() * 4000;

        const timer = setTimeout(() => {
            setBlinkRequested(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [avatarAnimation]);

    useEffect(() => {
        triggerDialogue('gameStart');
    }, []);

    function triggerPriorityDialogue(events) {
        const selectedTrigger = selectDialogueTrigger(events);

        if (selectedTrigger !== null) {
            triggerDialogue(selectedTrigger);
        }
    }

    function handleDialogueComplete() {
        animationReturnTimer.current = setTimeout(() => {
            setAvatarAnimation('idle');
        }, 250);

        if (pendingGameOver) {
            setTimeout(() => {
                setPendingGameOver(false);
                setGameOver(true);
            }, 500);
        }
    }

    function getGameOverTrigger(finalPlayerBoard, finalComputerBoard) {
        const finalPlayerScore = calculateScore(finalPlayerBoard);
        const finalComputerScore = calculateScore(finalComputerBoard);

        if (finalPlayerScore > finalComputerScore) {
            return 'playerWins';
        }

        if (finalPlayerScore < finalComputerScore) {
            return 'playerLoses';
        }

        return 'gameTie';
    }

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
        setPendingGameOver(false);
        triggerDialogue('gameStart');
        setScoreSubmitted(false);
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

        const events = [];

        const destroyedComputerDice = computerBoard.some(
            row => row[colIndex] === currentDie
        );

        if (destroyedComputerDice) {
            events.push('playerDestroysDice');
        }

        const updatedBoard = playerBoard.map((row, r) =>
            row.map((die, c) => {
                if (r === rowIndex && c === colIndex) {
                    return currentDie;
                }
                return die;
            })
        );

        const updatedComputerBoard = computerBoard.map(row =>
            row.map((die, c) => {
                if (c === colIndex && die === currentDie) {
                    return null;
                }
                return die;
            })
        );

        const oldPlayerScore = calculateScore(playerBoard);
        const newPlayerScore = calculateScore(updatedBoard);

        if (newPlayerScore - oldPlayerScore >= 18) {
            events.push('playerGoodMove');
        }

        setPlayerBoard(updatedBoard);
        setComputerBoard(updatedComputerBoard);

        if (isBoardFull(updatedBoard) || isBoardFull(updatedComputerBoard)) {
            events.push(
                getGameOverTrigger(updatedBoard, updatedComputerBoard)
            );

            triggerPriorityDialogue(events);
            setPendingGameOver(true);
            setIsRollable(false);
            return;
        }

        triggerPriorityDialogue(events)
        setIsComputerTurn(true);

        setTimeout(() => {
            const gameEnded = computerTurn(
                updatedComputerBoard,
                updatedBoard
            );

            setIsComputerTurn(false);

            if (!gameEnded) {
                setIsRollable(true);
            }
        }, 1000);
    }

    function computerTurn(currentComputerBoard, currentPlayerBoard) {
        const events = [];
        const roll = Math.floor(Math.random() * 6) + 1;
        setComputerDie(roll);

        if (roll === 1) {
            events.push('rollOne');
        } else if (roll === 6) {
            events.push('rollSix');
        }

        const chooseMove = opponentId === 'vulture'
            ? chooseVultureMove
            : chooseDuckMove;

        const choice = chooseMove(
            roll,
            currentComputerBoard,
            currentPlayerBoard
        );

        if (choice === null) {
            triggerPriorityDialogue(events);
            return false;
        }

        const destroyedPlayerDice = currentPlayerBoard.some(
            row => row[choice.colIndex] === roll
        );

        if (destroyedPlayerDice) {
            events.push('birdDestroysDice');
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

        const updatedPlayerBoard = currentPlayerBoard.map((row, rowIndex) =>
            row.map((die, colIndex) => {
                if (colIndex === choice.colIndex && die === roll) {
                    return null;
                }
                return die;
            })
        );

        const oldBirdScore = calculateScore(computerBoard);
        const newBirdScore = calculateScore(updatedBoard);

        if (newBirdScore - oldBirdScore >= 18) {
            events.push('birdGoodMove');
        }

        setComputerBoard(updatedBoard);
        setPlayerBoard(updatedPlayerBoard);

        if (
            isBoardFull(updatedBoard) ||
            isBoardFull(updatedPlayerBoard)
        ) {
            events.push(
                getGameOverTrigger(updatedPlayerBoard, updatedBoard)
            );

            triggerPriorityDialogue(events);
            setPendingGameOver(true);
            setIsRollable(false);
            return true;
        }

        triggerPriorityDialogue(events);

        return false;
    }

    function handleSubmitScore() {
        const username = localStorage.getItem('currentUser') || 'Guest';

        const newScore = {
            id: Date.now(),
            username: username,
            score: playerScore,
            opponent: opponent.name,
            date: new Date().toLocaleDateString()
        };

        const savedScores = JSON.parse(
            localStorage.getItem('leaderboardScores') || '[]'
        );

        savedScores.push(newScore);

        localStorage.setItem(
            'leaderboardScores',
            JSON.stringify(savedScores)
        );

        setScoreSubmitted(true);
    }

    return (
        <main className = "container background-table">
            <div className="row">
                <section className="game-panel opponent-panel col-md-4 order-1">
                    <h2>Opponent</h2>

                    <OpponentAvatar
                        opponent={opponent}
                        animation={avatarAnimation}
                        onAnimationIteration={() => {
                            if (avatarAnimation === 'idle' && blinkRequested) {
                                setBlinkRequested(false);
                                setAvatarAnimation('blink');
                            }
                        }}
                        onAnimationEnd={() => {
                            if (avatarAnimation === 'blink') {
                                setAvatarAnimation('idle');
                            }
                        }}
                    />

                    <p className="opponent-name">{opponent.name}</p>

                    <DialogueBox
                        text={currentDialogue}
                        onComplete={handleDialogueComplete}
                    />
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
                        <div className="score-title-row">
                            <h2>Score</h2>

                            <button
                                className="info-button"
                                onClick={() => setShowRules(true)}
                                aria-label="Show game rules"
                                title="Game rules"
                            >
                                <img src="/info.png" alt="" />
                            </button>
                        </div>

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
                                    className={`leaderboard-button ${scoreSubmitted ? 'submitted' : ''}`}
                                    onClick={handleSubmitScore}
                                    disabled={scoreSubmitted}
                                >
                                    {scoreSubmitted ? 'Submitted ✓' : 'Submit Score'}
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

                    {showRules && (
                        <div className="rules-overlay">
                            <div
                                className="rules-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="rules-title"
                            >
                                <button
                                    className="rules-close-button"
                                    onClick={() => setShowRules(false)}
                                    aria-label="Close rules"
                                >
                                    ✕
                                </button>

                                <h2 id="rules-title">How to Play</h2>

                                <h3>Objective</h3>
                                <p>Score more points than your opponent by the end of the game.</p>

                                <h3>Taking Your Turn</h3>
                                <p>Roll the die, then place it in an empty space on your board. 
                                    Your opponent will then do the same on it's turn.</p>

                                <h3>Scoring</h3>
                                <p>
                                    Each die scores its face value.
                                    Matching dice in the same column multiply their added value by the number of matching dice.
                                    Ex: Two 1's in the same column (1 + 1) * 2 = 4 and Three 6's in the same column (6 + 6 + 6) * 3 = 54
                                </p>

                                <h3>Destroying Dice</h3>
                                <p>
                                    When you place a die, it destroys any dice of the same number in your opponents opposing column.
                                    Your opponent can do the same to you
                                </p>

                                <h3>Ending the Game</h3>
                                <p>
                                    The game ends when either board is full. The player with the
                                    highest score wins. If both scores are equal, the game is a tie.
                                </p>
                            </div>
                        </div>
                    )}

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
