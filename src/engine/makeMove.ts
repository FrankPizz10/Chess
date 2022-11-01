import { getAllPieces, movableSquares } from "./board";
import { Move } from "./move";
import { GameState, PieceType, Position, Piece, Square } from "./state";
import { getSquareAtPosition } from "./util";

export function makeMove(state: GameState, move: Move): GameState {
  if (isValidMove(state, move)) {
    const newState = {...state};
    const piece = state.board.find(getSquareAtPosition(move.from))?.piece;
    if (piece) {
      newState.whiteToMove = !newState.whiteToMove;
      const fromSquare = state.board.find(getSquareAtPosition(move.from));
      const toSquare = state.board.find(getSquareAtPosition(move.to));
      if (fromSquare && toSquare) {
        fromSquare.piece = undefined;
        toSquare.piece = piece;
        updateAllSquaresUnderAttack(state);
      }
    }
    return newState;
  }
  else {
    throw new Error("Invalid move");
  }
}

function checkSquare(state: GameState, move: Move) {
  return (piece: Piece) => 
    piece.position[0] === move.from[0] 
    && piece.position[1] === move.from[1]
    && state.whiteToMove === piece.isWhite;
}

// Rewrite
function isValidMove(state: GameState, move: Move): boolean {
  // if move from has a piece
  if (state.board.find(getSquareAtPosition(move.from))?.piece) {
    // if move to is empty
    if (!state.board.find(getSquareAtPosition(move.to))?.piece) {
      // if piece is not a king
      if (state.board.find(getSquareAtPosition(move.from))?.piece?.type !== PieceType.King) {
        // if move to is in movable positions
        if (movableSquares(state, move.from).find(samePosition(move.to))) {
          return true;
        }
      }
      else {
        return isValidKingMove(state, move);
      }
    }
  }
}

function isValidKingMove(state: GameState, move: Move) {
  return true;
}

// Rewrite
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