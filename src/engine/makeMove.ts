import { movableSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType, Piece, Square } from "./state";

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

  const movablePositions = movableSquares(state, move.from);
  if (!movablePositions.includes(move.to)) return false;

  if (pieceToMove.type === PieceType.King) {
    return isValidKingMove(state, move);
  }

  return true;
}

function isValidKingMove(state: GameState, move: Move) {
  return true;
}

// Rewrite
function updateAllSquaresUnderAttack(state: GameState) {
  for (let i = 0; i < 64; i++) {
    const square = state.board[i];
    if (square.piece) {
      const movablePositions = movableSquares(state, i);
      console.log("I am a " + square.piece.isWhite + " " + square.piece.type + " and I can move to " + movablePositions);
      for (const pos of movablePositions) {
        if (square.piece.isWhite) {
          state.board[pos].isWhiteAttacking = true;
        }
        else {
          state.board[pos].isBlackAttacking = true;
        }
      }
    }
  }
}