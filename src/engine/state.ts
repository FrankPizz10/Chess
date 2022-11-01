import { kStringMaxLength } from "buffer";
import { getAutomaticTypeDirectiveNames } from "typescript";


export type GameState = {
  whiteToMove: boolean;
  players: Player[];
  board: Square[];
}

export type Square = {
  position: Position;
  piece: Piece | undefined;
  isWhiteAttacking: boolean;
  isBlackAttacking: boolean;
}

export type Position = [number, number];  // [x, y]

export type Piece = {
  isWhite: boolean;
  type: PieceType;
  position: Position;
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
  const pieces: Piece[] = getStartingPieces();
  return {
    whiteToMove: true,
    board: makeBoard(pieces),
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

function makeBoard(pieces: Piece[]): Square[] {
  const board: Square[] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const position: Position = [x, y];
      const piece = pieces.find((piece) => {
        return piece.position[0] === x && piece.position[1] === y;
      });
      board.push({
        position,
        piece,
        isWhiteAttacking: false,
        isBlackAttacking: false,
      });
    }
  }
  return board;
}

function getStartingPieces(): Piece[] {
  return [
    ...getStartingKings(),
    ...getStartingQueens(),
    ...getStartingBishops(),
    ...getStartingKnights(),
    ...getStartingRooks(),
    ...getStartingPawns(),
  ];
}

function getStartingKings(): Piece[] {
  return [
    {
      isWhite: true,
      type: PieceType.King,
      position: [4, 7],
      isCaptured: false,
      svg: './Pieces/WhiteKing.svg',
    },
    {
      isWhite: false,
      type:PieceType.King,
      position:[4, 0],
      isCaptured: false,
      svg: './Pieces/BlackKing.svg',
    }
  ];
}

function getStartingQueens(): Piece[] {
  return [
    {
      isWhite: true,
      type: PieceType.Queen,
      position: [3, 7],
      isCaptured: false,
      svg: './Pieces/WhiteQueen.svg',
    },
    {
      isWhite: false,
      type:PieceType.Queen,
      position:[3, 0],
      isCaptured: false,
      svg: './Pieces/BlackQueen.svg',
    }
  ];
}

function getStartingBishops(): Piece[] {
  const bishops: Piece[] = [];
  for (const pos of [
    [5, 7],
    [2, 7],
    [2, 0],
    [5, 0]
  ]) {
    if (pos[1] === 7) {
      bishops.push(
        {
          isWhite: true,
          type: PieceType.Bishop,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/WhiteBishop.svg',
        }
      );
    }
    else {
      bishops.push(
        {
          isWhite: false,
          type: PieceType.Bishop,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/BlackBishop.svg',
        }
      );
    }
  }
  return bishops;
}

function getStartingKnights() {
  const knights: Piece[] = [];
  for (const pos of [
    [6, 7],
    [1, 7],
    [6, 0],
    [1, 0]
  ]) {
    if (pos[1] === 7) {
      knights.push(
        {
          isWhite: true,
          type: PieceType.Knight,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/WhiteKnight.svg',
        }
      );
    }
    else {
      knights.push(
        {
          isWhite: false,
          type: PieceType.Knight,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/BlackKnight.svg',
        }
      );
    }
  }
  return knights;
}

function getStartingRooks() {
  const rooks: Piece[] = [];
  for (const pos of [
    [7, 7],
    [0, 7],
    [7, 0],
    [0, 0]
  ]) {
    if (pos[1] === 7) {
      rooks.push(
        {
          isWhite: true,
          type: PieceType.Rook,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/WhiteRook.svg',
        }
      );
    }
    else {
      rooks.push(
        {
          isWhite: false,
          type: PieceType.Rook,
          position: pos as Position,
          isCaptured: false,
          svg: './Pieces/BlackRook.svg',
        }
      );
    }
  }
  return rooks;
}

function getStartingPawns() {
  const pawns: Piece[] = [];
  for (let i = 0; i < 8; i++) {
    pawns.push(
      {
        isWhite: true,
        type: PieceType.Pawn,
        position: [i, 6],
        isCaptured: false,
        svg: './Pieces/WhitePawn.svg',
      }
    );
    pawns.push(
      {
        isWhite: false,
        type: PieceType.Pawn,
        position: [i, 1],
        isCaptured: false,
        svg: './Pieces/BlackPawn.svg',
      }
    );
  }
  return pawns;
}
