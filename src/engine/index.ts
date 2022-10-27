import { movableSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType } from "./state";

function makeMove(state: GameState, move: Move): GameState {
  // is the move valid?
  // if so, make the move
}

function isValidMove(state: GameState, move: Move): boolean {
  const piece = state.pieces.find(
    (piece) => 
      piece.position[0] === move.from[0] 
      && piece.position[1] === move.from[1]
      && state.whiteToMove === piece.isWhite
  );
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

function isGameOver(state: GameState): boolean {
  // is the game over?
}

function getWinner(state: GameState): string {
  // who won?
}