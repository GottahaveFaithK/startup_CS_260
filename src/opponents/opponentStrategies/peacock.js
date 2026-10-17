export function choosePeacockMove(roll, computerboard, playerboard){
    const emptyCells = [];

    computerboard.forEach((row, rowIndex) => {
        row.forEach((die, colIndex) => {
            if (die === null) {
                emptyCells.push({rowIndex, colIndex});
            }
        });
    });

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * emptyCells.length
        );
        return emptyCells[randomIndex];
    }

    return null;
}