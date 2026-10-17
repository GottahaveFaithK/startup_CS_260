import React, { useState, useEffect } from 'react';
import './scores.css';

const sampleScores = [
    { id: 'sample-1', username: 'PlayerOne', score: 42 },
    { id: 'sample-2', username: 'PlayerTwo', score: 38 },
    { id: 'sample-3', username: 'Faith', score: 35 },
    { id: 'sample-4', username: 'PlayerFour', score: 31 },
    { id: 'sample-5', username: 'PlayerFive', score: 27 }
];

export default function Scores() {
    const [scores, setScores] = useState(sampleScores);

    useEffect(() => {
        const savedScores = JSON.parse(
            localStorage.getItem('leaderboardScores') || '[]'
        );

        const combinedScores = [...sampleScores, ...savedScores];

        combinedScores.sort((a, b) => b.score - a.score);

        setScores(combinedScores.slice(0, 10));
    }, []);

    return (
        <main className="container background-table">
            <section className="leaderboard-panel">
                <h2>Leaderboard</h2>

                <table className="leaderboard">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scores.map((entry, index) => (
                            <tr key={entry.id ?? `${entry.username}-${index}`}>
                                <td>{index + 1}</td>
                                <td>{entry.username}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="live-updates-panel">
                <h2>Live Updates</h2>
                <p>Leaderboard updates will appear here in real time.</p>
                <p>Waiting for new scores...</p>
            </section>

            <section className="random-fact-panel">
                <h2>Random Fact</h2>
                <p className="random-fact">
                    A random useless fact from the Useless Facts API will appear here.
                </p>
            </section>
        </main>
    );
}