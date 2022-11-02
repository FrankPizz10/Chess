import { PieceType } from "./state";

export type Move = {
  from: number;
  to: number;
  promotionPiece?: PieceType;
}