import React,{useState, useEffect, useRef} from 'react';
import './play.css';
import opponents from '../opponents/opponents';

import opponentStrategies from '../opponents/opponentStrategies';

import { calculateColumnScore, calculateScore } from './game/scoring';
import { isBoardFull } from './game/gameRules';

import OpponentPanel from '../components/opponentPanel';

import duckDialogue from '../opponents/dialogue/duck';
import peacockDialogue from '../opponents/dialogue/peacock';
import vultureDialogue from '../opponents/dialogue/vulture';
import pigeonDialogue from '../opponents/dialogue/pigeon';
import keaDialogue from '../opponents/dialogue/kea';
import magpieDialogue from '../opponents/dialogue/magpie'

import GameBoard from '../components/gameBoard';

import { getDialogue, selectDialogueTrigger } from '../opponents/dialogue/getDialogue';
import { useParams } from 'react-router-dom';

import GameOverModal from '../components/gameOverModal';

export default function Play() {

    const { opponentId } = useParams();
    const opponent = opponents[opponentId] ?? opponents.duck;
    const opponentDialogue = {
        duck: duckDialogue,
        vulture: vultureDialogue,
        peacock: peacockDialogue,
        pigeon: pigeonDialogue,
        kea: keaDialogue,
        magpie: magpieDialogue

    }[opponentId] ?? duckDialogue;

    const [currentDie, setCurrentDie] = useState(5);
    const [isRolling, setIsRolling] = useState(false)
    const [isRollable, setIsRollable] = useState(true);

    const dieFaces = ['one', 'two', 'three', 'four', 'five', 'six'];
    const [playerBoard, setPlayerBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);

    const [computerBoard, setComputerBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    const [computerDie, setComputerDie] = useState(null);

    const [isComputerTurn, setIsComputerTurn] = useState(false);

    const [showKeaDiceOffer, setShowKeaDiceOffer] = useState(false);
    const [keaOfferPending, setKeaOfferPending] = useState(false);
    const [keaRollAccepted, setKeaRollAccepted] = useState(false);

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
        const line = getDialogue(opponentDialogue, trigger, currentDialogue);
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

    function rollKeaDie() {
    const roll = Math.random() * 100;

    if (roll < 12) return 1;
    if (roll < 26) return 2;
    if (roll < 42) return 3;
    if (roll < 60) return 4;
    if (roll < 80) return 5;
    return 6;
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

        if (keaOfferPending) {
            setKeaOfferPending(false);
            setShowKeaDiceOffer(true);
        }

        if (keaRollAccepted) {
            setKeaRollAccepted(false);

            setIsRolling(true);

            setTimeout(() => {
                setCurrentDie(rollKeaDie());
                setIsRolling(false);
                setIsRollable(false);
            }, 1500);
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
                const keaEventTriggered =
                    opponentId === 'kea' && Math.random() < 1 / 100;

                if (keaEventTriggered) {
                    setKeaOfferPending(true);
                    setIsRollable(false);
                    triggerDialogue('keaRollOffer');
                } else {
                    setIsRollable(true);
                }
            }
        }, 1000);
    }

    function computerTurn(currentComputerBoard, currentPlayerBoard) {
        const events = [];
        const roll = Math.floor(Math.random() * 6) + 1;
        setComputerDie(roll);
        console.log(roll)

        if (roll === 1) {
            events.push('rollOne');
        } else if (roll === 6) {
            events.push('rollSix');
        }

        const chooseMove = opponentStrategies[opponentId]
            ?? opponentStrategies.duck;

        const choice = chooseMove(
            roll,
            currentComputerBoard,
            currentPlayerBoard
        );

        if (choice === null) {
            triggerPriorityDialogue(events);
            return false;
        }

        const placedRoll = choice.roll ?? roll;
        console.log(placedRoll)
        const destroyedPlayerDice = currentPlayerBoard.some(
            row => row[choice.colIndex] === placedRoll
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
                    return placedRoll;
                }
                return die;
            })
        );

        const updatedPlayerBoard = currentPlayerBoard.map((row, rowIndex) =>
            row.map((die, colIndex) => {
                if (colIndex === choice.colIndex && die === placedRoll) {
                    return null;
                }
                return die;
            })
        );

        const oldBirdScore = calculateScore(currentComputerBoard);
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
                <OpponentPanel
                    opponent={opponent}
                    animation={avatarAnimation}
                    blinkRequested={blinkRequested}
                    setBlinkRequested={setBlinkRequested}
                    setAvatarAnimation={setAvatarAnimation}
                    dialogue={currentDialogue}
                    onDialogueComplete={handleDialogueComplete}
                />

                <section className="game-panel col-md-8 board-panel order-2">
                    <h2>Computer Board</h2>

                        <GameBoard
                            board={computerBoard}
                            dieFaces={dieFaces}
                            diceSheet={opponent.diceSheet}
                        />
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
                            <GameOverModal
                                isTie={isTie}
                                playerWon={playerWon}
                                opponent={opponent}
                                playerScore={playerScore}
                                computerScore={computerScore}
                                scoreSubmitted={scoreSubmitted}
                                onSubmitScore={handleSubmitScore}
                                onPlayAgain={playAgain}
                            />
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

                    {showKeaDiceOffer && (
                        <div className="kea-offer-overlay">
                            <div
                                className="kea-offer-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="kea-offer-title"
                            >
                                <h2 id="kea-offer-title">
                                    Let Kea roll your die this turn?
                                </h2>

                                <div className="kea-offer-buttons">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowKeaDiceOffer(false);
                                            setKeaRollAccepted(true);
                                            triggerDialogue('keaRollYes');
                                        }}
                                    >
                                        Yes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowKeaDiceOffer(false);
                                            triggerDialogue('keaRollNo');
                                            setIsRollable(true);
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
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

                    <GameBoard
                        board={playerBoard}
                        dieFaces={dieFaces}
                        onCellClick={placeDie}
                        boardClassName="player-board"
                    />

                    <h2>Your Board</h2>

                </section>

            </div>
        </main>
    );
}
