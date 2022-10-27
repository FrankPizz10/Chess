export type GameState = {
  whiteToMove: boolean;
  pieces: Piece[];
  players: Player[];
}

export type Position = [number, number];

export type Piece = {
  isWhite: boolean;
  type: PieceType;
  position: Position;
  isCaptured: boolean;
}

export enum PieceType {
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
  Pawn,
}

type Player = {
  name: string;
  isWhite: boolean;
}