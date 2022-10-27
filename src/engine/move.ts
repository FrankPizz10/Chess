import { PieceType, Position } from "./state";

export type Move = {
  from: Position;
  to: Position;
  promotionPiece?: PieceType;
}