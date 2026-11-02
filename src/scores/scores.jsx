import React, { useState, useEffect } from 'react';
import './scores.css';


export default function Scores() {
    const [scores, setScores] = useState([]);
    const [randomFact, setRandomFact] = useState('Loading a random fact...');

    useEffect(() => {
        async function fetchScores() {
            try {
                const response = await fetch('/api/scores');

                if (!response.ok) {
                    throw new Error('Failed to fetch scores');
                }

                const data = await response.json();
                setScores(data);
            } catch (error) {
                console.error('Unable to load leaderboard:', error);
            }
        }

        fetchScores();
    }, []);

    useEffect(() => {
        async function fetchRandomFact() {
            try {
                const response = await fetch(
                    'https://uselessfacts.jsph.pl/api/v2/facts/random?language=en'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch random fact');
                }

                const data = await response.json();
                setRandomFact(data.text);
            } catch (error) {
                console.error('Unable to load random fact:', error);
                setRandomFact('Unable to load a random fact right now.');
            }
        }

        fetchRandomFact();
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
                    {randomFact}
                </p>
            </section>
        </main>
    );
}