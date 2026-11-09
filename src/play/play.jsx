import React,{useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './play.css';

import opponents from '../opponents/opponents';
import opponentStrategies from '../opponents/opponentStrategies';
import opponentDialogue from '../opponents/dialogue';

import { calculateScore } from './game/scoring';
import { isBoardFull, createEmptyBoard } from './game/boardUtils';

import {
    applyPlayerMove,
    applyComputerMove
} from './game/turnLogic';

import OpponentPanel from './components/OpponentPanel';
import ScorePanel from './components/ScorePanel';

import RulesModal from './components/RulesModal';
import GameOverModal from './components/GameOverModal';
import KeaOfferModal from './components/KeaOfferModal';

import GameBoard from './components/GameBoard';

import useOpponentDialogue from './hooks/useOpponentDialogue';
import useKeaEvent from './hooks/useKeaEvent';
import opponentRerollStrategies from '../opponents/opponentRerollStrategies';

export default function Play() {

    const { opponentId } = useParams();
    const opponent = opponents[opponentId] ?? opponents.duck;
    const dialogue = opponentDialogue[opponentId] ?? opponentDialogue.duck;

    const [currentDie, setCurrentDie] = useState(5);
    const [computerDie, setComputerDie] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [isRollable, setIsRollable] = useState(true);

    const [rerollsRemaining, setRerollsRemaining] = useState(1);
    const [computerRerollsRemaining, setComputerRerollsRemaining] = useState(1);

    const dieFaces = ['one', 'two', 'three', 'four', 'five', 'six'];

    const [playerBoard, setPlayerBoard] = useState(createEmptyBoard);
    const [computerBoard, setComputerBoard] = useState(createEmptyBoard);


    const [isComputerTurn, setIsComputerTurn] = useState(false);

    const {
        showKeaDiceOffer,
        setShowKeaDiceOffer,
        keaOfferPending,
        setKeaOfferPending,
        keaRollAccepted,
        setKeaRollAccepted,
        rollKeaDie,
        shouldTriggerKeaEvent
    } = useKeaEvent();

    const [consecutiveSixes, setConsecutiveSixes] = useState(0);

    const playerScore = calculateScore(playerBoard);
    const computerScore = calculateScore(computerBoard);

    const [gameOver, setGameOver] = useState(false);
    const playerWon = playerScore > computerScore;
    const isTie = playerScore === computerScore;

    const [pendingGameOver, setPendingGameOver] = useState(false);

    const [showRules, setShowRules] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);

    const {
        currentDialogue,
        avatarAnimation,
        blinkRequested,
        setBlinkRequested,
        setAvatarAnimation,
        triggerDialogue,
        triggerPriorityDialogue,
        handleDialogueAnimationComplete
    } = useOpponentDialogue(dialogue);

    useEffect(() => {
        triggerDialogue('gameStart');
    }, [triggerDialogue]);

    function handleDialogueComplete() {
        handleDialogueAnimationComplete();

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

    function playAgain() {
        setPlayerBoard(createEmptyBoard());
        setComputerBoard(createEmptyBoard());
        setCurrentDie(5);
        setComputerDie(null);
        setGameOver(false);
        setIsRolling(false);
        setIsRollable(true);
        setIsComputerTurn(false);
        setPendingGameOver(false);
        triggerDialogue('gameStart');
        setScoreSubmitted(false);
        setSubmitMessage('');
        setRerollsRemaining(1);
        setComputerRerollsRemaining(1);
        setConsecutiveSixes(0);
    }

    function handlePlayerRoll(roll) {
        setCurrentDie(roll);

        if (roll === 6) {
            setConsecutiveSixes(prev => {
                const next = prev + 1;

                if (next === 3 && opponentId === 'kea') {
                    triggerPriorityDialogue(['magpieDice']);
                }

                return next;
            });
        } else {
            setConsecutiveSixes(0);
        }
    }

    function rollDie() {
        if (gameOver || isRolling || !isRollable) {
            return;
        }

        setIsRolling(true);
        setIsRollable(false);

        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;

            handlePlayerRoll(roll);

            setIsRolling(false);
        }, 1500);
    }

    function rerollDie() {
        if (gameOver || pendingGameOver || isRolling || isComputerTurn || rerollsRemaining <= 0) {
            return;
        }

        setIsRolling(true);
        setRerollsRemaining(prev => prev - 1);

        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;

            handlePlayerRoll(roll);

            setIsRolling(false);
        }, 1500);
    }

 
    function placeDie(rowIndex, colIndex) {
        if (gameOver || isRolling || isRollable || isComputerTurn) {
            return;
        }

        const result = applyPlayerMove({
            playerBoard,
            computerBoard,
            rowIndex,
            colIndex,
            die: currentDie
        });

        if (!result.valid) {
            return;
        }

        setPlayerBoard(result.playerBoard);
        setComputerBoard(result.computerBoard);

        if (result.gameEnded) {
            triggerPriorityDialogue(result.events);
            setPendingGameOver(true);
            setIsRollable(false);
            return;
        }

        triggerPriorityDialogue(result.events);
        setIsComputerTurn(true);

        setTimeout(() => {
            const gameEnded = computerTurn(
                result.computerBoard,
                result.playerBoard
            );

            setIsComputerTurn(false);

            if (!gameEnded) {
                if (shouldTriggerKeaEvent(opponentId)) {
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
        let roll = Math.floor(Math.random() * 6) + 1;

        const shouldReroll = opponentRerollStrategies[opponentId];

        if (
            shouldReroll &&
            computerRerollsRemaining > 0 &&
            shouldReroll(roll, currentComputerBoard, currentPlayerBoard)
        ) {
            roll = Math.floor(Math.random() * 6) + 1;

            setComputerRerollsRemaining(prev => prev - 1);
        }

        setComputerDie(roll);

        const chooseMove =
            opponentStrategies[opponentId] ?? opponentStrategies.duck;

        const choice = chooseMove(
            roll,
            currentComputerBoard,
            currentPlayerBoard
        );

        const result = applyComputerMove({
            computerBoard: currentComputerBoard,
            playerBoard: currentPlayerBoard,
            roll,
            choice
        });

        triggerPriorityDialogue(result.events);

        if (!result.moved) {
            return false;
        }

        setComputerBoard(result.computerBoard);
        setPlayerBoard(result.playerBoard);

        if (result.gameEnded) {
            setPendingGameOver(true);
            setIsRollable(false);
            return true;
        }

        return false;
    }

    async function handleSubmitScore() {
        if (scoreSubmitted || isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    score: playerScore,
                    opponent: opponent.name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setSubmitMessage(
                    response.status === 401
                        ? 'You must log in to submit your score.'
                        : data.message || 'Unable to submit your score.'
                );
                return;
            }

            setSubmitMessage('');

            setScoreSubmitted(true);
        } catch (error) {
            setSubmitMessage('Unable to connect to the server. Please try again.');
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
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
                        <ScorePanel
                            playerScore={playerScore}
                            computerScore={computerScore}
                            opponent={opponent}
                            onShowRules={() => setShowRules(true)}
                        />

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
                                submitMessage={submitMessage}
                                isSubmitting={isSubmitting}
                            />
                        )}
                        </div>

                   {showRules && (
                        <RulesModal onClose={() => setShowRules(false)} />
                    )}

                    {showKeaDiceOffer && (
                        <KeaOfferModal
                            onAccept={() => {
                                            setShowKeaDiceOffer(false);
                                            setKeaRollAccepted(true);
                                            triggerDialogue('keaRollYes');}}
                            onDecline={() => {
                                            setShowKeaDiceOffer(false);
                                            triggerDialogue('keaRollNo');
                                            setIsRollable(true);}}
                        />
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
                            onClick={isRollable ? rollDie : rerollDie}
                            disabled={
                                gameOver ||
                                pendingGameOver ||
                                isRolling ||
                                isComputerTurn ||
                                (!isRollable && rerollsRemaining <= 0)
                            }
                        >
                            {isRollable || isRolling || rerollsRemaining <= 0
                                ? 'Roll Die'
                                : 'Reroll Die'}
                        </button>

                        <p className="rerolls-remaining">
                            Rerolls remaining: {rerollsRemaining}
                        </p>
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
