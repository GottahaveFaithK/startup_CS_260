import React,{useState, useEffect, useRef} from 'react';
import './play.css';

import opponents from '../opponents/opponents';
import opponentStrategies from '../opponents/opponentStrategies';
import opponentDialogue from '../opponents/dialogue';

import { calculateColumnScore, calculateScore } from './game/scoring';
import { saveScore } from '../scores/scoreStorage';
import { isBoardFull } from './game/gameRules';

import {
    applyPlayerMove,
    applyComputerMove
} from './game/turnLogic';

import OpponentPanel from './components/OpponentPanel';
import ScorePanel from './components/ScorePanel';

import RulesModal from './components/RulesModal';
import KeaOfferModal from './components/KeaOfferModal';

import GameBoard from './components/GameBoard';

import useOpponentDialogue from './hooks/useOpponentDialogue';
import { useParams } from 'react-router-dom';

import GameOverModal from './components/GameOverModal';

export default function Play() {

    const { opponentId } = useParams();
    const opponent = opponents[opponentId] ?? opponents.duck;
    const dialogue = opponentDialogue[opponentId] ?? opponentDialogue.duck;

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

    const [pendingGameOver, setPendingGameOver] = useState(false);

    const [showRules, setShowRules] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);

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
        const roll = Math.floor(Math.random() * 6) + 1;
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

    function handleSubmitScore() {
        const username = localStorage.getItem('currentUser') || 'Guest';

        const newScore = {
            id: Date.now(),
            username,
            score: playerScore,
            opponent: opponent.name,
            date: new Date().toLocaleDateString()
        };

        saveScore(newScore);
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
