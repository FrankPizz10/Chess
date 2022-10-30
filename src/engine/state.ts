import { kStringMaxLength } from "buffer";
import { getAutomaticTypeDirectiveNames } from "typescript";

export type GameState = {
  whiteToMove: boolean;
  pieces: Piece[];
  players: Player[];
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
  return {
    whiteToMove: true,
    pieces: getStartingPieces(),
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
