import React, { useState, useEffect, useRef } from 'react';
import './scores.css';
import opponents from '../opponents/opponents';


export default function Scores() {
    const [scores, setScores] = useState([]);
    const [randomFact, setRandomFact] = useState('Loading a random fact...');
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [selectedOpponent, setSelectedOpponent] = useState('All');

    const selectedOpponentRef = useRef(selectedOpponent);

    useEffect(() => {
        selectedOpponentRef.current = selectedOpponent;
    }, [selectedOpponent]);

    async function fetchScores(opponent) {
        try {
            const url = opponent === 'All'
                ? '/api/scores'
                : `/api/scores?opponent=${encodeURIComponent(opponent)}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Failed to fetch scores');
            }

            const data = await response.json();
            setScores(data);
        } catch (error) {
            console.error('Unable to load leaderboard:', error);
        }
    }

    useEffect(() => {
        fetchScores(selectedOpponent);
    }, [selectedOpponent]);

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

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

        const socket = new WebSocket(
            `${protocol}://${window.location.host}/ws`
        );

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === 'scoreSubmitted') {
                setRecentUpdates((previous) =>
                    [message.score, ...previous].slice(0, 5)
                );

                fetchScores(selectedOpponentRef.current);
            }
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <main className="container background-table">
            <section className="leaderboard-panel">
                <h2>Leaderboard</h2>
                <div className="opponent-selectors">
                    <button
                        onClick={() => setSelectedOpponent('All')}
                        className={selectedOpponent === 'All' ? 'active' : ''}
                    >
                        All
                    </button>

                    {Object.values(opponents).map((opponent) => (
                        <button
                            key={opponent.name}
                            onClick={() => (setSelectedOpponent(opponent.name))}
                            className={
                                selectedOpponent === opponent.name ? 'active' : ''
                            }
                        >
                            {opponent.name}
                        </button>
                    ))}
                </div>
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
                    {recentUpdates.length > 0 ? (
                        recentUpdates.map((entry) => (
                            <li key={entry.id}>
                                {entry.username} scored {entry.score} against {entry.opponent}!
                            </li>
                        ))
                    ) : (
                        <li>Waiting for new scores...</li>
                    )}
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