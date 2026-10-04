import React from 'react';
import './play.css';
import opponents from '../opponents/opponents';

export default function Play() {

    const opponent = opponents.duck;

    return (
        <main className = "container background-table">
            <div className="row">
                <section className="game-panel opponent-panel col-md-4 order-1">
                    <h2>Opponent</h2>

                    <div
                        className="opponent-avatar"
                        style={{ backgroundImage: `url(${opponent.spriteSheet})` }}
                    ></div>

                    <p className="opponent-name">{opponent.name}</p>

                    <div className="dialogue-box">
                        <p className="opponent-dialogue">{opponent.dialogue}</p>
                    </div>
                </section>

                <section className="game-panel col-md-8 board-panel order-2">
                    <h2>Computer Board</h2>

                    <table className="game-board">
                        <tbody>
                            <tr>
                                <td className="board-cell">
                                    <span
                                        className="die die-one"
                                        style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                    ></span>
                                </td>
                                <td className="board-cell">
                                    <span
                                        className="die die-three"
                                        style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                    ></span>
                                </td>
                                <td className="board-cell"></td>
                            </tr>

                            <tr>
                                <td className="board-cell">
                                    <span
                                        className="die die-two"
                                        style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                    ></span>
                                </td>
                                <td className="board-cell"></td>
                                <td className="board-cell">
                                    <span
                                        className="die die-two"
                                        style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                    ></span>
                                </td>
                            </tr>

                            <tr>
                                <td className="board-cell"></td>
                                <td className="board-cell">
                                    <span
                                        className="die die-five"
                                        style={{ backgroundImage: `url(${opponent.diceSheet})` }}
                                    ></span>
                                </td>
                                <td className="board-cell"></td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="game-panel col-md-4 order-4 order-md-3">
                    <div className="score-section">
                        <h2>Score</h2>

                        <p>Computer: <span>0</span></p>
                        <p>You: <span>18</span></p>
                    </div>

                    <div className="current-die-section">
                        <h2>Current Die</h2>

                        <div>
                            <span className="die die-five rolling"></span>
                        </div>

                        <button className="roll-button">Roll Die</button>
                    </div>
                </section>

                <section className="game-panel col-md-8 board-panel order-3 order-md-4">

                <table className="game-board player-board">
                    <tbody>
                    <tr>
                        <td className="board-cell">
                            <span className="die die-four"></span>
                        </td>
                        <td className="board-cell"></td>
                        <td className="board-cell">
                            <span className="die die-four"></span>
                        </td>
                    </tr>

                    <tr>
                        <td className="board-cell"></td>
                        <td className="board-cell">
                            <span className="die die-six"></span>
                        </td>
                        <td className="board-cell"></td>
                    </tr>

                    <tr>
                        <td className="board-cell">
                            <span className="die die-two"></span>
                        </td>
                        <td className="board-cell"></td>
                        <td className="board-cell"></td>
                    </tr>
                    </tbody>
                </table>

                    <h2>Your Board</h2>

                </section>

            </div>
        </main>
    );
}
