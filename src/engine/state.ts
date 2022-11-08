export type GameState = {
  whiteToMove: boolean;
  players: Player[];
  board: Square[];
}

export type Square = {
  piece: Piece | undefined;
  attackingPieces: Piece[];
  movablePieces: Piece[];
}

export type Piece = {
  isWhite: boolean;
  type: PieceType;
}

export enum PieceType {
  King = 'King',
  Queen = 'Queen',
  Rook = 'Rook',
  Bishop = 'Bishop',
  Knight = 'Knight',
  Pawn = 'Pawn',
}

type Player = {
  name: string;
  isWhite: boolean;
}

export function makeNewGame(): GameState{
  return {
    whiteToMove: true,
    board: makeBoard(),
    players: [
      {
        name: 'Frank',
        isWhite: true,
      },
      {
        name: 'Bill',
        isWhite: false,
      }
    ]
  }
}


function makeBoard(): Square[] {
  const board: Square[] = [];
  for (let i = 0; i < 64; i++) {
    board.push({
      piece: makePiece(i),
      attackingPieces: [],
      movablePieces: [],
    });
  }
  return board;
}

function makePiece(position: number): Piece | undefined {
  const row = Math.floor(position / 8);
  const col = position % 8;
  if (row === 0) {
    return makePieceHelper(col, false);
  }
  if (row === 1) {
    return {
      isWhite: false,
      type: PieceType.Pawn,
    }
  }
  if (row === 6) {
    return {
      isWhite: true,
      type: PieceType.Pawn,
    }
  }
  if (row === 7) {
    return makePieceHelper(col, true);
  }
  return undefined;
}

function makePieceHelper(col: number, isWhite: boolean): Piece | undefined {
  switch (col) {
    case 0:
    case 7:
      return {
        isWhite: isWhite,
        type: PieceType.Rook,
      }
    case 1:
    case 6:
      return {
        isWhite: isWhite,
        type: PieceType.Knight,
      }
    case 2:
    case 5:
      return {
        isWhite: isWhite,
        type: PieceType.Bishop,
      }
    case 3:
      return {
        isWhite: isWhite,
        type: PieceType.Queen,
      }
    case 4:
      return {
        isWhite: isWhite,
        type: PieceType.King,
      }
      default:
        return undefined;
  }
}