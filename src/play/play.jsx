import React,{useState} from 'react';
import './play.css';
import opponents from '../opponents/opponents';

export default function Play() {

    const opponent = opponents.duck;
    const [currentDie, setCurrentDie] = useState(5);
    const [isRolling, setIsRolling] = useState(false)

    const dieFaces = ['one', 'two', 'three', 'four', 'five', 'six'];
    const [playerBoard, setPlayerBoard] = useState([[null, null, null], [null, null, null], [null, null, null]])

    function rollDie() {
        if(isRolling == true){
            return;
        }
        setIsRolling(true)

        setTimeout(() => {
            setCurrentDie(Math.floor(Math.random() * 6) + 1)
            setIsRolling(false)
        }, 1500);
    }

    function placeDie(rowIndex, colIndex) {
        if (isRolling) {
            return;
        }

        if (playerBoard[rowIndex][colIndex] !== null) {
            return;
        }

        const updatedBoard = playerBoard.map((row, r) =>
            row.map((die, c) => {
                if (r === rowIndex && c === colIndex) {
                    return currentDie;
                }
                return die;
            })
        );

        setPlayerBoard(updatedBoard);
    }

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
                        <p>{currentDie}</p>
                    </div>

                    <div className="current-die-section">
                        <h2>Current Die</h2>

                        <div>
                            <span
                                className={`die die-${dieFaces[currentDie - 1]} ${isRolling ? 'rolling' : ''}`}
                            ></span>
                        </div>

                        <button className="roll-button" onClick={rollDie}>Roll Die</button>
                    </div>
                </section>

                <section className="game-panel col-md-8 board-panel order-3 order-md-4">

                <table className="game-board player-board">
                    <tbody>
                        {playerBoard.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((die, colIndex) => (
                                    <td
                                        className="board-cell"
                                        key={colIndex}
                                        onClick={() => placeDie(rowIndex, colIndex)}
                                    >
                                        {die !== null && (
                                            <span className={`die die-${dieFaces[die - 1]}`}></span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                    <h2>Your Board</h2>

                </section>

            </div>
        </main>
    );
}
