import React from 'react';
import { useNavigate } from 'react-router-dom';
import opponents from './opponents';
import './opponentSelect.css';

export default function OpponentSelect() {
    const navigate = useNavigate();

    return (
        <main className="opponent-select">
            <h2>Choose Your Opponent</h2>
            <p>Potential subtext here</p>

            <div className="opponent-grid">
                {Object.entries(opponents).map(([id, opponent]) => (
                    <button
                        key={id}
                        className="opponent-card"
                        onClick={() => navigate(`/play/${id}`)}
                    >
                    <div
                        className="opponent-preview"
                        style={{
                            backgroundImage: `url("${opponent.spriteSheet}")`
                        }}
                        role="img"
                        aria-label={`${opponent.name} preview`}
                    />
                        <h3>{opponent.name}</h3>
                        <p>{opponent.flavorText}</p>
                        <span>Choose Opponent</span>
                    </button>
                ))}
            </div>
        </main>
    );
}