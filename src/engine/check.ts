import { attackingSquares } from "./board";
import { Piece, PieceType, Square } from "./state";

export function isKingInCheckmate(board: Square[], whiteToMove: boolean): boolean {
  if (!isKingInCheck) return false;
  return (canKingMove(board, whiteToMove) || canPieceBlockCheck(board, whiteToMove) || canPieceCaptureAttacker(board, whiteToMove));
}

export function isKingInCheck(board: Square[], whiteToMove: boolean): boolean {
  for (const square of board) {
    if (square.piece && square.piece.type === PieceType.King && square.piece.isWhite === whiteToMove) {
      return square.attackingPieces.filter((piece) => piece.isWhite !== whiteToMove).length > 0;
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
  const attackingPieces = board[kingPosition].attackingPieces

  // if there is exactly one piece attacking the king AND the piece is not a knight, then the piece can be blocked
  if (attackingPieces.length > 1 || attackingPieces[0].type === PieceType.Knight) return false;

  // check every square between the king and the attacking piece
  const piecePosition = board.findIndex((square) => square.piece === attackingPieces[0]);
  const betweenSquares = squaresBetween(kingPosition, piecePosition);
  // for each square, check if there is a (same color) piece that can move to that square
  for (const square of betweenSquares) {
    // Get possible pieces
    const possibleBlockers = board[square].movablePieces.filter((piece) => piece.isWhite === whiteToMove);
    // if there is a piece that can move to that square, add that piece to a list of pieces that (maybe) can block the check
    if (possibleBlockers.length < 1) continue;
      // for each piece in the list of pieces that can block the check, physically move the piece to the square to block, and check isKingInCheck
      for (const blocker of possibleBlockers) {
        // If the move does not put the king in check, then the piece can block the check
        if (pseudoMove(JSON.parse(JSON.stringify(board)), blocker, square)) return true;
      }
  }
  return false;
}

function canPieceCaptureAttacker(board: Square[], whiteToMove: boolean): boolean {
  const kingPosition = board.findIndex((square) => {
    return square.piece && square.piece.type === PieceType.King && square.piece.isWhite === whiteToMove;
  });

  // get the list of pieces that are attacking the king (opposite color as king)
  const attackingPieces = board[kingPosition].attackingPieces

  // if there is exactly one piece attacking the king
  if (attackingPieces.length > 1) return false;

  const attackerPosition = board.findIndex((square) => square.piece === attackingPieces[0]);
  const possibleCaptures = board[attackerPosition].movablePieces.filter((piece) => piece.isWhite === whiteToMove);
  if (possibleCaptures.length < 1) return false;
      for (const capture of possibleCaptures) {
        if (pseudoMove(JSON.parse(JSON.stringify(board)), capture, attackerPosition)) return true;
      }
  return false;
}

function squaresBetween(position1: number, position2: number): number[] {
  const squares = [];
  // Same Rank
  if (Math.floor(position1 / 8) == Math.floor(position2 / 8)) {
    for (let i = Math.min(position1, position2) + 1; i < Math.max(position1, position2); i++) {
      squares.push(i);
    }
  }
  // Same File
  else if (position1 % 8 == position2 % 8) {
    for (let i = Math.min(position1, position2) + 8; i < Math.max(position1, position2); i += 8) {
      squares.push(i);
    }
  }
  // Right Diagonal
  else if (Math.abs(position1 - position2) % 7 == 0) {
    for (let i = Math.min(position1, position2) + 7; i < Math.max(position1, position2); i += 7) {
      squares.push(i);
    }
  }
  // Left Diagonal
  else if (Math.abs(position1 - position2) % 9 == 0) {
    for (let i = Math.min(position1, position2) + 9; i < Math.max(position1, position2); i += 9) {
      squares.push(i);
    }
  }
  return squares;
}

// Determines if the move will put king in check
function pseudoMove(board: Square[], piece: Piece, position: number): boolean {
  const piecePosition = board.findIndex((square) => square.piece === piece);
  board[position].piece = piece;
  board[piecePosition].piece = undefined;
  return isKingInCheck(board, piece.isWhite);
}