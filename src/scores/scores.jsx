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
                <p>Recent leaderboard activity:</p>
                <ul>
                    <li>Faith submitted a score of 35!</li>
                    <li>PlayerOne reached the top of the leaderboard!</li>
                    <li>PlayerTwo finished a match with 38 points!</li>
                </ul>
            </section>

            <section className="random-fact-panel">
                <h2>Random Fact</h2>
                <p className="random-fact">
                    A group of sharks is called a shiver.
                </p>
            </section>
        </main>
    );
}