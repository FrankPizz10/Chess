import { Move } from "./move";
import { GameState, Piece, PieceType, Square } from "./state";
import { getSquareAtPosition, samePosition } from "./util";

export function movableSquares(state: GameState, move: Move): number[] {
  const piece = state.board.find(getSquareAtPosition(move.from))?.piece;
  switch (piece?.type) {
    case PieceType.King:
      return kingSquares(state.board, move.from);
    case PieceType.Queen:
      return queenSquares(state.board, move.from);
    case PieceType.Rook:
      return rookSquares(state.board, move.from);
    case PieceType.Bishop:
      return bishopSquares(state.board, move.from);
    case PieceType.Knight:
      return knightSquares(state.board, move.from);
    case PieceType.Pawn:
      return pawnSquares(state.board, move.from, state.whiteToMove);
  }
  return [];
}

function kingSquares(board: Square[], position: number, isWhite: boolean): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 1, isWhite),
    ...squaresInDirection(board, position, rightMover, 1, isWhite),
    ...squaresInDirection(board, position, downMover, 1, isWhite),
    ...squaresInDirection(board, position, leftMover, 1, isWhite),
  ];
}

function queenSquares(board: Square[], position: number, isWhite: boolean): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 8),
    ...squaresInDirection(board, position, rightMover, 8),
    ...squaresInDirection(board, position, downMover, 8),
    ...squaresInDirection(board, position, leftMover, 8),
    ...squaresInDirection(board, position, upRightMover, 8),
    ...squaresInDirection(board, position, downRightMover, 8),
    ...squaresInDirection(board, position, upLeftMover, 8),
    ...squaresInDirection(board, position, downLeftMover, 8),
  ];
}

function rookSquares(board: Square[], position: number, isWhite: boolean): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 8),
    ...squaresInDirection(board, position, rightMover, 8),
    ...squaresInDirection(board, position, downMover, 8),
    ...squaresInDirection(board, position, leftMover, 8),
  ];
}

function bishopSquares(board: Square[], position: number, isWhite: boolean): number[] {
  return [
    ...squaresInDirection(board, position, upRightMover, 8),
    ...squaresInDirection(board, position, downRightMover, 8),
    ...squaresInDirection(board, position, upLeftMover, 8),
    ...squaresInDirection(board, position, downLeftMover, 8),
  ];
}

function knightSquares(board: Square[], position: number, isWhite: boolean): number[] {
  const squares: number[] = [];
  for (const distance of [
    -17,
    -15,
    -6,
    -10,
    +17,
    +15,
    +6,
    +10,
  ]) {
    const pos = position + distance;
    if (pos < 0 || pos > 63) {
      continue;
    }
    squares.push(pos);
  }
  return squares;
}

function pawnSquares(board: Square[], position: number, isWhite: boolean): number[] {
  const startRank: [number, number] = isWhite ? [48, 55] : [8, 15];
  const moveLimit = position >= startRank[0] && position <= startRank[1] ? 2 : 1;
  const mover = isWhite ? upMover : downMover;
  const squares = squaresInDirection(board, position, mover, moveLimit, isWhite);
  
  const upRight = isWhite ? upRightMover : downLeftMover;
  const upLeft = isWhite ? upLeftMover : downRightMover;
  const upRightPos = upRight(position);
  const upLeftPos = upLeft(position);
  for (const pos of [upRightPos, upLeftPos]) {
    const piece = board[pos]?.piece;
    if (piece && piece.isWhite !== isWhite) {
      squares.push(pos);
    }
  }

  return squares;
}

function squaresInDirection(
  board: Square[],
  position: number,
  mover: (i: number) => number,
  numSquares: number,
  isWhite: boolean,
): number[] {
  const squares: number[] = [];
  let numSquaresMoved = 0;
  while (true) {
    position = mover(position);
    if (
      position > 63 ||
      position < 0 ||
      numSquaresMoved >= numSquares
    ) {
      break;
    }
    const piece = board[position]?.piece;
    if (piece) {
      if (piece.isWhite !== isWhite) squares.push(position);
      break;
    }
    squares.push(position);
    numSquaresMoved++;
  }
  return squares;
}

function upMover(i: number): number {
  return i - 8;
}

function rightMover(i: number): number {
  return i + 1;
}

function downMover(i: number): number {
  return i + 8;
}

function leftMover(i: number): number {
  return i - 1;
}

function upRightMover(i: number): number {
  return i - 7;
}

function downRightMover(i: number): number {
  return i + 9;
}

function upLeftMover(i: number): number {
  return i - 9;
}

function downLeftMover(i: number): number {
  return i + 7;
}