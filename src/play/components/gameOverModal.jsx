import React from 'react';
import './gameOverModal.css';

function GameOverModal({
isTie,
playerWon,
opponent,
playerScore,
computerScore,
scoreSubmitted,
onSubmitScore,
onPlayAgain,
}) {
return (
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
                className={`leaderboard-button ${
                    scoreSubmitted ? 'submitted' : ''
                }`}
                onClick={onSubmitScore}
                disabled={scoreSubmitted}
            >
                {scoreSubmitted ? 'Submitted ✓' : 'Submit Score'}
            </button>

            <button
                className="play-again-button"
                onClick={onPlayAgain}
            >
                Play Again
            </button>
        </div>
    </div>
);

}

export default GameOverModal;