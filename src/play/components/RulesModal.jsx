import React from 'react';
import './rulesModal.css';

function RulesModal({ onClose }) {
return (
<div className="rules-overlay">
<div
             className="rules-modal"
             role="dialog"
             aria-modal="true"
             aria-labelledby="rules-title"
         >
<button
                 className="rules-close-button"
                 onClick={onClose}
                 aria-label="Close rules"
             >
✕
</button>

            <h2 id="rules-title">How to Play</h2>

            <h3>Objective</h3>
            <p>
                Score more points than your opponent by the end of the game.
            </p>

            <h3>Taking Your Turn</h3>
            <p>
                Roll the die, then place it in an empty space on your board.
                Your opponent will then do the same on its turn.
            </p>

            <h3>Scoring</h3>
            <p>
                Each die scores its face value. Matching dice in the same
                column multiply their added value by the number of matching
                dice. For example, two 1s in the same column score
                (1 + 1) × 2 = 4, and three 6s score
                (6 + 6 + 6) × 3 = 54.
            </p>

            <h3>Destroying Dice</h3>
            <p>
                When you place a die, it destroys any dice of the same
                number in your opponent's corresponding column. Your
                opponent can do the same to you.
            </p>

            <h3>Ending the Game</h3>
            <p>
                The game ends when either board is full. The player with
                the highest score wins. If both scores are equal, the game
                is a tie.
            </p>
        </div>
    </div>
);

}

export default RulesModal;