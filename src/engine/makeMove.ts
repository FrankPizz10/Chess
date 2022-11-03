import { attackingSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType } from "./state";

export function makeMove(state: GameState, move: Move): GameState {
  if (isValidMove(state, move)) {
    const newState = {...state};
    const piece = state.board[move.from]?.piece;
    if (piece) {
      const fromSquare = newState.board[move.from];
      const toSquare = newState.board[move.to];
      if (fromSquare && toSquare) {
        fromSquare.piece = undefined;
        toSquare.piece = piece;
        updateAllSquaresUnderAttack(state);
        newState.whiteToMove = !newState.whiteToMove;
      }
    }
    return newState;
  }
  else {
    throw new Error("Invalid move");
  }
}

// Rewrite
function isValidMove(state: GameState, move: Move): boolean {
  const pieceToMove = state.board[move.from]?.piece;
  if (!pieceToMove || pieceToMove.isWhite !== state.whiteToMove) return false;
  
  const occupyingPiece = state.board[move.to]?.piece;
  if (occupyingPiece && (occupyingPiece.isWhite === state.whiteToMove || occupyingPiece.type === PieceType.King)) return false;

  const movablePositions = attackingSquares(state, move.from, state.whiteToMove, occupyingPiece ? "attack" : "move");
  if (!movablePositions.includes(move.to)) return false;

  return true;
}

// Rewrite
function updateAllSquaresUnderAttack(state: GameState) {
  state.board.forEach((pos) => {
    pos.isWhiteAttacking = false;
    pos.isBlackAttacking = false;
  });
  for (let i = 0; i < 64; i++) {
    const square = state.board[i];
    if (square.piece) {
      if (square.piece.isWhite) {
        const movablePositions = attackingSquares(state, i, true, "attack");
        console.log("white", square.piece.type, movablePositions);
        movablePositions.forEach((position) => {
          state.board[position].isWhiteAttacking = true;
        });
      } else {
        const movablePositions = attackingSquares(state, i, false, "attack");
        console.log("black", square.piece.type, movablePositions);
        movablePositions.forEach((position) => {
          state.board[position].isBlackAttacking = true;
        });
      }
    }
  }
}