import { PieceType, Square } from "./state";

export type MoveMode = "move" | "attack" | "check";

export function attackingSquares(board: Square[], startSq: number, isWhite: boolean, mode: MoveMode): number[] {
  const piece = board[startSq]?.piece;
  switch (piece?.type) {
    case PieceType.King:
      return kingSquares(board, startSq, isWhite, mode);
    case PieceType.Queen:
      return queenSquares(board, startSq, isWhite, mode);
    case PieceType.Rook:
      return rookSquares(board, startSq, isWhite, mode);
    case PieceType.Bishop:
      return bishopSquares(board, startSq, isWhite, mode);
    case PieceType.Knight:
      return knightSquares(board, startSq, isWhite, mode);
    case PieceType.Pawn:
      return pawnSquares(board, startSq, isWhite, mode);
  }
  return [];
}

function kingSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, rightMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, downMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, leftMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, upRightMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, downRightMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, upLeftMover, 1, isWhite, mode),
    ...squaresInDirection(board, position, downLeftMover, 1, isWhite, mode),
  ].filter((pos) => {
    return board[pos].attackingPieces.filter((piece) => piece.isWhite === isWhite).length === 0;
  });
}

function queenSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, rightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, leftMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, upRightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downRightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, upLeftMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downLeftMover, 8, isWhite, mode),
  ];
}

function rookSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  return [
    ...squaresInDirection(board, position, upMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, rightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, leftMover, 8, isWhite, mode),
  ];
}

function bishopSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  return [
    ...squaresInDirection(board, position, upRightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downRightMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, upLeftMover, 8, isWhite, mode),
    ...squaresInDirection(board, position, downLeftMover, 8, isWhite, mode),
  ];
}

function knightSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  return [
    chainMovers(upMover, upMover, leftMover)(position),
    chainMovers(upMover, upMover, rightMover)(position),
    chainMovers(upMover, rightMover, rightMover)(position),
    chainMovers(upMover, leftMover, leftMover)(position),
    chainMovers(downMover, downMover, leftMover)(position),
    chainMovers(downMover, downMover, rightMover)(position),
    chainMovers(downMover, rightMover, rightMover)(position),
    chainMovers(downMover, leftMover, leftMover)(position),
  ].filter(
    (i) => i >= 0 && i < 64
  )
}

function pawnSquares(board: Square[], position: number, isWhite: boolean, mode: MoveMode): number[] {
  const squares: number[] = [];
  if (mode === "move") {
    const startRank: [number, number] = isWhite ? [48, 55] : [8, 15];
    const moveLimit = position >= startRank[0] && position <= startRank[1] ? 2 : 1;
    const mover = isWhite ? upMover : downMover;
    squares.push(...squaresInDirection(board, position, mover, moveLimit, isWhite, mode));
  }
  if (mode === "attack" || mode === "check") {
    const upRight = isWhite ? upRightMover : downLeftMover;
    const upLeft = isWhite ? upLeftMover : downRightMover;
    const upRightPos = upRight(position);
    const upLeftPos = upLeft(position);
    squares.push(...[upRightPos, upLeftPos].filter((i) => i >= 0 && i < 64));
  }
  return squares;
}

function squaresInDirection(
  board: Square[],
  position: number,
  mover: (i: number) => number,
  numSquares: number,
  isWhite: boolean,
  mode: MoveMode,
): number[] {
  const squares: number[] = [];
  let numSquaresMoved = 0;
  while (true) {
    position = mover(position);
    if (
      position === -1 || 
      position > 63 ||
      position < 0 ||
      numSquaresMoved >= numSquares
    ) {
      break;
    }
    const piece = board[position]?.piece;
    if (piece) {
      squares.push(position);
      const seeThroughKing = mode === "check" && piece.type === PieceType.King && piece.isWhite !== isWhite;
      if (!seeThroughKing) break;
    }
    squares.push(position);
    numSquaresMoved++;
  }
  return squares;
}

function chainMovers(...movers: ((i: number) => number)[]): (i: number) => number {
  return (i: number) => {
    for (const mover of movers) {
      i = mover(i);
      if (i === -1) return -1;
    }
    return i;
  };
}

function upMover(i: number): number {
  return i - 8;
}

function rightMover(i: number): number {
  if (i % 8 === 7) return -1;
  return i + 1;
}

function downMover(i: number): number {
  return i + 8;
}

function leftMover(i: number): number {
  if (i % 8 === 0) return -1;
  return i - 1;
}

function upRightMover(i: number): number {
  if (i % 8 === 7) return -1;
  return i - 7;
}

function downRightMover(i: number): number {
  if (i % 8 === 7) return -1;
  return i + 9;
}

function upLeftMover(i: number): number {
  if (i % 8 === 0) return -1;
  return i - 9;
}

function downLeftMover(i: number): number {
  if (i % 8 === 0) return -1;
  return i + 7;
}