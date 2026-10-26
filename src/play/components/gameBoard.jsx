import React from 'react';

function GameBoard({
    board,
    dieFaces,
    diceSheet,
    onCellClick,
    boardClassName = '',
}) {
    return (
        <table className={'game-board ' + boardClassName}>
            <tbody>
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((die, colIndex) => (
                            <td
                                key={colIndex}
                                className="board-cell"
                                onClick={
                                    onCellClick
                                        ? () => onCellClick(rowIndex, colIndex)
                                        : undefined
                                }
                            >
                                {die !== null && (
                                    <span
                                        className={
                                            'die die-' + dieFaces[die - 1]
                                        }
                                        style={
                                            diceSheet
                                                ? {
                                                    backgroundImage:
                                                        'url(' + diceSheet + ')',
                                                }
                                                : undefined
                                        }
                                    />
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GameBoard;