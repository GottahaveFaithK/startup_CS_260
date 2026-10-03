import React from 'react';
import './scores.css';

export default function Scores() {
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
                        <tr>
                            <td>1</td>
                            <td>PlayerOne</td>
                            <td>42</td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>PlayerTwo</td>
                            <td>38</td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Faith</td>
                            <td>35</td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>PlayerFour</td>
                            <td>31</td>
                        </tr>

                        <tr>
                            <td>5</td>
                            <td>PlayerFive</td>
                            <td>27</td>
                        </tr>
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
