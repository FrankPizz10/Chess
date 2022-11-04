import { attackingSquares } from "./board";
import { isKingInCheck, isKingInCheckmate } from "./check";
import { Move } from "./move";
import { GameState, PieceType, Square } from "./state";

export function makeMove(state: GameState, move: Move): GameState {
  if (!isValidMove(state, move)) {
    throw new Error("Invalid move");
  }

  if (isGameOver(state)) {
    throw new Error("Game is over");
  }

  const piece = state.board[move.from].piece!;

  // move the piece
  let newState = {
    ...state,
    board: updateSquaresUnderAttack(state.board.map((square, index) => {
      if (index === move.from) {
        return {
          ...square,
          piece: undefined,
        };
      }
      if (index === move.to) {
        return {
          ...square,
          piece,
        };
      }
      return square;
    })),
  }

  // check if the king is in check
  if (isKingInCheck(newState.board, newState.whiteToMove)) {
    throw new Error("Invalid move - puts king in check");
  }
  
  newState.whiteToMove = !newState.whiteToMove;

  return newState;
}

/**
 * Checks if the move is valid (i.e. the piece can move to the destination square). Does not check if the move is legal (i.e. the king is not in check after the move).
 * @param state 
 * @param move 
 * @returns 
 */
function isValidMove(state: GameState, move: Move): boolean {
  const pieceToMove = state.board[move.from]?.piece;
  if (!pieceToMove || pieceToMove.isWhite !== state.whiteToMove) return false;
  
  const occupyingPiece = state.board[move.to]?.piece;
  if (occupyingPiece && (occupyingPiece.isWhite === state.whiteToMove || occupyingPiece.type === PieceType.King)) return false;

  const movablePositions = attackingSquares(state.board, move.from, state.whiteToMove, occupyingPiece ? "attack" : "move");
  if (!movablePositions.includes(move.to)) return false;

  return true;
}

function isGameOver(state: GameState): boolean {
  // checkmate
  if (isKingInCheckmate(state.board, state.whiteToMove)) {
    return true;
  }

  // stalemate
  // insufficient material

  // threefold repetition
  // plan: keep a list of all previous board states, and check if the current board state is in the list
  // encode the board state as an array of integers, where each integer represents a piece on the board
  return false;
}

// Rewrite
function updateSquaresUnderAttack(board: Square[]): Square[] {
  const newBoard = board.map((square) => {
    return {
      ...square,
      isWhiteAttacking: false,
      isBlackAttacking: false,
    }
  });
  for (let i = 0; i < 64; i++) {
    const square = newBoard[i];
    if (square.piece) {
      if (square.piece.isWhite) {
        const attackingPositions = attackingSquares(board, i, true, "check");
        attackingPositions.forEach((position) => {
          newBoard[position].isWhiteAttacking = true;
        });
        const movablePositions = attackingSquares(board, i, true, "move");
        movablePositions.forEach((position) => {
          newBoard[position].canWhiteMoveTo = true;
        });
      } else {
        const attackingPositions = attackingSquares(board, i, false, "check");
        attackingPositions.forEach((position) => {
          newBoard[position].isBlackAttacking = true;
        });
        const movablePositions = attackingSquares(board, i, false, "move");
        movablePositions.forEach((position) => {
          newBoard[position].canBlackMoveTo = true;
        });
      }
    }
  }
  return newBoard;
}