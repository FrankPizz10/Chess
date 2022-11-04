import { attackingSquares } from "./board";
import { PieceType, Square } from "./state";

export function isKingInCheckmate(board: Square[], whiteToMove: boolean): boolean {
  if (!isKingInCheck) return false;

  return true;
}

export function isKingInCheck(board: Square[], whiteToMove: boolean): boolean {
  for (const square of board) {
    if (square.piece && square.piece.type === PieceType.King && square.piece.isWhite === whiteToMove) {
      return whiteToMove ? square.isBlackAttacking : square.isWhiteAttacking;
    }
  }
  return false;
}

function canKingMove(board: Square[], whiteToMove: boolean): boolean {
  return attackingSquares(board, 0, whiteToMove, "move").length > 0;
}

function canPieceBlockCheck(board: Square[], whiteToMove: boolean): boolean {
  const kingPosition = board.findIndex((square) => {
    return square.piece && square.piece.type === PieceType.King && square.piece.isWhite === whiteToMove;
  });
  
  // check 8 squares around the king
  
}

function canPieceCaptureAttacker(board: Square[], whiteToMove: boolean): boolean {
  return false;
}