import { Move } from "./move";
import { GameState, Piece, PieceType, Position, Square } from "./state";
import { getSquareAtPosition, samePosition } from "./util";

export function movableSquares(state: GameState, move: Move) {
  const piece = state.board.find(getSquareAtPosition(move.from))?.piece;
  switch (piece?.type) {
    case PieceType.King:
      return kingSquares(state.board, position);
    case PieceType.Queen:
      return queenSquares(state.board, position);
    case PieceType.Rook:
      return rookSquares(state.board, position);
    case PieceType.Bishop:
      return bishopSquares(state.board, position);
    case PieceType.Knight:
      return knightSquares(state.board, position);
    case PieceType.Pawn:
      return pawnSquares(state.board, position, state.whiteToMove);
  }
}

export function pieceOnSquare(board: Square[], position: Position): Piece | undefined {
  const square = board.find(square => square.position[0] === position[0] && square.position[1] === position[1]);
  if (square) {
    return square.piece;
  }
}

function isOccupied(position: Position) {
  return (piece: Piece) => !piece.isCaptured && samePosition(piece.position, position);
}

function kingSquares(board: Square[], position: Position): Position[] {
  const pieces = getAllPieces(board);
  return [
    ...squaresInDirection(pieces, position, upMover, 1),
    ...squaresInDirection(pieces, position, rightMover, 1),
    ...squaresInDirection(pieces, position, downMover, 1),
    ...squaresInDirection(pieces, position, leftMover, 1),
  ];
}

function queenSquares(board: Square[], position: Position): Position[] {
  const pieces = getAllPieces(board);
  return [
    ...squaresInDirection(pieces, position, upMover, 8),
    ...squaresInDirection(pieces, position, rightMover, 8),
    ...squaresInDirection(pieces, position, downMover, 8),
    ...squaresInDirection(pieces, position, leftMover, 8),
    ...squaresInDirection(pieces, position, upRightMover, 8),
    ...squaresInDirection(pieces, position, downRightMover, 8),
    ...squaresInDirection(pieces, position, upLeftMover, 8),
    ...squaresInDirection(pieces, position, downLeftMover, 8),
  ];
}

function rookSquares(board: Square[], position: Position): Position[] {
  const pieces = getAllPieces(board);
  return [
    ...squaresInDirection(pieces, position, upMover, 8),
    ...squaresInDirection(pieces, position, rightMover, 8),
    ...squaresInDirection(pieces, position, downMover, 8),
    ...squaresInDirection(pieces, position, leftMover, 8),
  ];
}

function bishopSquares(board: Square[], position: Position): Position[] {
  const pieces = getAllPieces(board);
  return [
    ...squaresInDirection(pieces, position, upRightMover, 8),
    ...squaresInDirection(pieces, position, downRightMover, 8),
    ...squaresInDirection(pieces, position, upLeftMover, 8),
    ...squaresInDirection(pieces, position, downLeftMover, 8),
  ];
}

function knightSquares(board: Square[], position: Position): Position[] {
  const pieces = getAllPieces(board);
  const [x, y] = position;
  const squares: Position[] = [];
  for (const [dx, dy] of [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ]) {
    const [nx, ny] = [x + dx, y + dy];
    if (nx > 7 || ny > 7 || nx < 0 || ny < 0) {
      continue;
    }
    if (pieces.find(isOccupied([nx, ny]))) {
      continue;
    }
    squares.push([nx, ny]);
  }
  return squares;
}

function pawnSquares(board: Square[], position: Position, isWhite: boolean): Position[] {
  const pieces = getAllPieces(board);
  const startRank = isWhite ? 6 : 1;
  const moveLimit = position[1] === startRank ? 2 : 1;
  const mover = isWhite ? upMover : downMover;
  const squares = squaresInDirection(pieces, position, mover, moveLimit);
  
  const upRight = isWhite ? upRightMover : downLeftMover;
  const upLeft = isWhite ? upLeftMover : downRightMover;
  const upRightPos = upRight(position);
  const upLeftPos = upLeft(position);
  for (const pos of [...squares, upRightPos, upLeftPos]) {
    const piece = pieces.find(isOccupied(pos));
    if (piece) {
      squares.push(pos);
    }
  }

  return squares;
}

export function getAllPieces(board: Square[]): Piece[] {
  const pieces = [];
  for (let i = 0; i < board.length; i++) {
    const square = board[i];
    if (square.piece) {
      pieces.push(square.piece);
    }
  }
  return pieces;
}

function squaresInDirection(
  allPieces: Piece[],
  position: Position,
  mover: (pos: Position) => Position,
  numSquares: number,
): Position[] {
  let [x, y] = position;
  const squares: Position[] = [];
  while (true) {
    [x, y] = mover([x, y]);
    if (
      x > 7 || 
      y > 7 || 
      x < 0 || 
      y < 0 || 
      (x > position[0] + numSquares) || 
      (x < position[0] - numSquares) ||
      (y > position[1] + numSquares) ||
      (y < position[1] - numSquares)
    ) {
      break;
    }
    if (allPieces.find(isOccupied([x, y]))) {
      squares.push([x, y]); // can capture
      break;
    }
    squares.push([x, y]);
  }
  return squares;
}

function upMover(pos: Position): Position {
  return [pos[0], pos[1] - 1];
}

function rightMover(pos: Position): Position {
  return [pos[0] + 1, pos[1]];
}

function downMover(pos: Position): Position {
  return [pos[0], pos[1] + 1];
}

function leftMover(pos: Position): Position {
  return [pos[0] - 1, pos[1]];
}

function upRightMover(pos: Position): Position {
  return [pos[0] + 1, pos[1] - 1];
}

function downRightMover(pos: Position): Position {
  return [pos[0] + 1, pos[1] + 1];
}

function upLeftMover(pos: Position): Position {
  return [pos[0] - 1, pos[1] - 1];
}

function downLeftMover(pos: Position): Position {
  return [pos[0] - 1, pos[1] + 1];
}