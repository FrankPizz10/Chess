import { getAllPieces, movableSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType, Position, Piece, Square } from "./state";

export function makeMove(state: GameState, move: Move): GameState {
  const pieces = getAllPieces(state.board);
  if (isValidMove(state, move)) {
    const newState = {...state};
    const piece = pieces.find(checkSquare(newState, move));
    if (piece) {
      piece.position = move.to;
      newState.whiteToMove = !newState.whiteToMove;
      const fromSquare = state.board.find(getSquareAtPosition(move.from));
      const toSquare = state.board.find(getSquareAtPosition(move.to));
      if (fromSquare && toSquare) {
        fromSquare.piece = undefined;
        toSquare.piece = piece;
        updateAllSquaresUnderAttack(state, pieces);
      }
    }
    return newState;
  }
  else {
    throw new Error("Invalid move");
  }
}

export function getSquareAtPosition(pos: Position){
  return (square: Square) => square.position[0] === pos[0] && square.position[1] === pos[1];
}

function checkSquare(state: GameState, move: Move) {
  return (piece: Piece) => 
    piece.position[0] === move.from[0] 
    && piece.position[1] === move.from[1]
    && state.whiteToMove === piece.isWhite;
}

function isValidMove(state: GameState, move: Move): boolean {
  const pieces = getAllPieces(state.board);
  const piece = pieces.find(checkSquare(state, move));
  if (!piece) return false;
  if (piece.type === PieceType.King) {
    const startPos = state.whiteToMove ? [4, 0] : [4, 7];
    if (move.from[0] === startPos[0] && move.from[1] === startPos[1]) {
      // call isValidCastle
    }
  }
  const validSquares = movableSquares(state, piece.type, piece.position);
  return validSquares.some(
    (square) => square[0] === move.to[0] && square[1] === move.to[1]
  );
}

function updateAllSquaresUnderAttack(state: GameState, pieces: Piece[]) {
  for (const piece of pieces) {
    const movablePositions = movableSquares(state, piece.type, piece.position);
    const squaresUnderAttack: Square[] = [];
    for (const pos of movablePositions){
      const square = state.board.find(getSquareAtPosition(pos));
      if (square) {
        squaresUnderAttack.push(square);
      }
    }
    for (const sq of squaresUnderAttack) {
      if (piece.isWhite) {
        sq.isWhiteAttacking = true;
      }
      else {
        sq.isBlackAttacking = true;
      }
    }
  }
}