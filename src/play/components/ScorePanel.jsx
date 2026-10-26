import React from 'react';
import './scorePanel.css';

function ScorePanel({
    playerScore,
    computerScore,
    opponent,
    onShowRules,
}) {
    return (
        <div className="score-section">
            <div className="score-title-row">
                <h2>Score</h2>

                <button
                    className="info-button"
                    onClick={onShowRules}
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
        </div>
    );
}

export default ScorePanel;