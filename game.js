function createGame() {
    player1 = createPlayer('Frank', 'White');
    player2 = createPlayer('Bob', 'Black');
    game = {
        players: [player1, player2],
        board: createBoard(),
        score: getScore(player1, player2),
        win: checkWin(),
        whiteTurn: true,
        validMove: checkMove(this)
        }
}

function createBoard() {
    let board = new Array(8);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(8);
    }
    return board;
}

function getScore(player1, player2) {
    function scorePlayer(player) {
        let pieceVals = 0;
        for (const piece of player.pieces) {
            if (piece.value) {
                pieceVals += piece.value;
            }
        }
        return pieceVals;
    }
    return scorePlayer(player1) - scorePlayer(player2);
}

function checkWin() {
    return false;
}

function checkMove() {
    return false;
}

function createPlayer(name, color) {
    return {
        name: name,
        color: color,
        pieces: getStartingPieces(color)
    }
}

function getStartingPieces(color) {
    let pieces = new Array(2);
    let startingPiecesNames = [
        'King',
        'Queen',
    ]
    for (let i = 0; i < pieces.length; i ++) {
        pieces[i] = createPiece(startingPiecesNames[i], color);
    }
    return pieces;
}

function createPiece(name, color) {
    if (name === 'King') {
        return createKing(color);
    } else if (name === 'Queen') {
        return createQueen(color);
    }
}

function setPieceVals(name, color, position, value) {
    return {
        name: name,
        color: color,
        position: position,
        value: value
    }
}

function createKing(color) {
    let pos = color === 'White' ? [0, 4] : [7, 4];
    let piece = setPieceVals('King', color, pos, undefined);
    return piece;
}

function createQueen(color) {
    let pos = color === 'White' ? [0, 3] : [7, 3];
    let piece = setPieceVals('Queen', color, pos, 9);
    return piece;
}

function addPiece(player, name) {
    player.pieces.push(createPiece(name, player.color));
    updateGameState();
}


function getPiece(startingPos) {
    return (piece) => Array.isArray(piece.position) &&
                    Array.isArray(piece.position) && 
                    piece.position.every((val, index) => val === startingPos[index]) &&
                    piece.position.length === piece.position.length;
}

function movePiece(player, startingPos, endingPos) {
    let piece = player.pieces.find(getPiece(startingPos));
    if (checkValidMove(piece, startingPos, endingPos)) {
        piece.position = endingPos;
        updateGameState();
    }
}

function checkValidMove(piece, startingPos, endingPos) {
    return checkInBounds(endingPos);
}

function checkInBounds(pos) {
    return pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7;
}

function updateGameState() {
    let newGameState = {
        players: [player1, player2],
        board: game.board,
        score: getScore(player1, player2),
        win: checkWin(),
        whiteTurn: ~game.whiteTurn,
        validMove: checkMove()
    }
    game = JSON.parse(JSON.stringify(newGameState));
}

function getGameState() {
    let state = JSON.parse(JSON.stringify(game));
    console.log(state);
}

function getMove() {
    let move = document.getElementById("MoveInputForm").submit();
    console.log(move);
}

var player1;
var player2;
var game;