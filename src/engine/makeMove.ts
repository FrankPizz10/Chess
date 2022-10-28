import { movableSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType, Position, Piece } from "./state";

export function makeMove(state: GameState, move: Move): GameState {
  if (isValidMove(state, move)) {
    const newState = {...state};
    const piece = newState.pieces.find(checkSquare(newState, move));
    if (piece) {
      piece.position = move.to;
      newState.whiteToMove = !newState.whiteToMove;
    }
    return newState;
  }
  else {
    return state;
  }
}

function checkSquare(state: GameState, move: Move) {
  return (piece: Piece) => 
    piece.position[0] === move.from[0] 
    && piece.position[1] === move.from[1]
    && state.whiteToMove === piece.isWhite;
}

function isValidMove(state: GameState, move: Move): boolean {
  const piece = state.pieces.find(checkSquare(state, move));
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

