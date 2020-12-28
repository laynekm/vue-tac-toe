const rows = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
];

// Time is in ms
export const formatTime = (time) => {
    let m = parseInt(time / 6000, 10);
    let s = parseInt(time / 100, 10) - m * 60;
    let ms = parseInt(time % 100, 10);
    s = m > 0 && s < 10 ? '0' + s : s;
    ms = ms < 10 ? '0' + ms : ms;
    return m
        ? m + ':' + s + ':' + ms
        : s + ':' + ms;
}

export const hasWinner = (pieces) => {
    for (let i = 0; i < rows.length; i++) {
        let piece1 = pieces[rows[i][0][0]][rows[i][0][1]];
        let piece2 = pieces[rows[i][1][0]][rows[i][1][1]];
        let piece3 = pieces[rows[i][2][0]][rows[i][2][1]];

        if (!piece1 || !piece2 || !piece3) {
            continue;
        }

        if (piece1 === piece2 && piece1 === piece3) {
            return rows[i];
        }
    }

    return [];
}

export const boardIsFull = (pieces) => {
    return boardHasPieces(pieces, 9);
}

export const boardHasPieces = (pieces, number) => {
    let count = 0;
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            if (pieces[i][j]) count++;
        }
    }

    return count === number;
}

export const determineComputerMove = (pieces, playerPiece, computerPiece) => {
    const updatedPieces = [...pieces];

    // This should never be true
    if (boardHasPieces(pieces, 9)) {
        console.log('uhoh');
        return updatedPieces;
    }

    // If making first move, choose at random with preference to center
    if (boardHasPieces(pieces, 0)) {
        if (Math.floor(Math.random() * 2) === 1) {
            let i = Math.floor(Math.random() * 3);
            let j = Math.floor(Math.random() * 3);
            updatedPieces[i][j] = computerPiece;
            return updatedPieces;
        } else {
            updatedPieces[1][1] = computerPiece;
            return updatedPieces;
        }
    }

    // If player just made first move, choose at random
    if (boardHasPieces(pieces, 1)) {
        let i = Math.floor(Math.random() * 3);
        let j = Math.floor(Math.random() * 3);
        while (updatedPieces[i][j]) {
            i = Math.floor(Math.random() * 3);
            j = Math.floor(Math.random() * 3);
        }

        updatedPieces[i][j] = computerPiece;
        return updatedPieces;
    }

    // If computer has 2/3 in a row, place the third to win
    // TODO: computer is not playing the 3rd and instead trying to block player - why?
    for (let k = 0; k < rows.length; k++) {
        let indexToPlace = getIndex(rows[k], pieces, computerPiece, 2);
        if (indexToPlace) {
            updatedPieces[indexToPlace[0]][indexToPlace[1]] = computerPiece;
            return updatedPieces;
        }
    }

    // If player has 2/3 in a row, block the third
    for (let k = 0; k < rows.length; k++) {
        let indexToPlace = getIndex(rows[k], pieces, playerPiece, 2);
        if (indexToPlace) {
            updatedPieces[indexToPlace[0]][indexToPlace[1]] = computerPiece;
            return updatedPieces;
        }
    }

    // If computer has 1/3 in a row, place the third to win
    for (let k = 0; k < rows.length; k++) {
        let indexToPlace = getIndex(rows[k], pieces, computerPiece, 1);
        if (indexToPlace) {
            updatedPieces[indexToPlace[0]][indexToPlace[1]] = computerPiece;
            return updatedPieces;
        }
    }

    // Otherwise choose a random position
    let i = Math.floor(Math.random() * 3);
    let j = Math.floor(Math.random() * 3);
    while (updatedPieces[i][j]) {
        i = Math.floor(Math.random() * 3);
        j = Math.floor(Math.random() * 3);
    }

    updatedPieces[i][j] = computerPiece;
    return updatedPieces;
};

const getIndex = (row, pieces, targetPiece, numOfExistingPieces) => {
    let targetPieceCount = 0;
    let totalPieceCount = 0;
    let i;
    let j;

    for (let k = 0; k < row.length; k++) {
        if (!pieces[row[k][0]][row[k][1]]) {
            // Add some randomization so it doesn't always choose the last empty tile
            if ((i === undefined && j === undefined) || Math.floor(Math.random() * 2) === 1) {
                i = row[k][0];
                j = row[k][1];
            }
        } else {
            totalPieceCount++;
        }

        if (pieces[row[k][0]][row[k][1]] === targetPiece) {
            targetPieceCount++;
        }
    }

    if (i !== undefined && j !== undefined && (targetPieceCount === numOfExistingPieces || totalPieceCount - targetPieceCount === numOfExistingPieces)) {
        return [i, j]
    }

    return undefined;
}