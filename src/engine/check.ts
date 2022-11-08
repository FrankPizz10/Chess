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
  
  // get the list of pieces that are attacking the king (opposite color as king)
  board[kingPosition].attackingPieces

  // if there is exactly one piece attacking the king AND the piece is not a knight, then the piece can be blocked

  // check every square between the king and the attacking piece
  // for each square, check if there is a (same color) piece that can move to that square
  // if there is a piece that can move to that square, add that piece to a list of pieces that (maybe) can block the check

  // for each piece in the list of pieces that can block the check, physically move the piece to the square to block, and check isKingInCheck
  // if this is true for any piece, return true else false
}

function canPieceCaptureAttacker(board: Square[], whiteToMove: boolean): boolean {
  return false;
}