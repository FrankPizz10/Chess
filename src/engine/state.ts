export type GameState = {
  whiteToMove: boolean;
  players: Player[];
  board: Square[];
}

export type Square = {
  piece: Piece | undefined;
  isWhiteAttacking: boolean;
  isBlackAttacking: boolean;
}

export type Piece = {
  isWhite: boolean;
  type: PieceType;
  isCaptured: boolean;
  svg: string;
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
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      board.push({
        position: [x, y],
        piece: makePiece(x, y),
        isWhiteAttacking: false,
        isBlackAttacking: false,
      })
    }
  }
  return board;
}


function makePiece(x: number, y: number): Piece | undefined {
  if (y === 0) {
    return makePieceHelper(x, false);
  } else if (y === 1) {
    return {
      isWhite: false,
      type: PieceType.Pawn,
      isCaptured: false,
      svg: './Pieces/BlackPawn.svg',
    }
  } else if (y === 6) {
    return {
      isWhite: true,
      type: PieceType.Pawn,
      isCaptured: false,
      svg: './Pieces/WhitePawn.svg',
    }
  } else if (y === 7) {
    return makePieceHelper(x, true);
  } else {
    return undefined;
  }
}

function makePieceHelper(x: number, isWhite: boolean): Piece {
  const type = x === 0 || x === 7 ? PieceType.Rook :
    x === 1 || x === 6 ? PieceType.Knight :
      x === 2 || x === 5 ? PieceType.Bishop :
        x === 3 ? PieceType.Queen : PieceType.King;
  const svg = isWhite ? `./Pieces/White${type}.svg` : `./Pieces/Black${type}.svg`;
  return {
    isWhite,
    type,
    isCaptured: false,
    svg,
  }
}

