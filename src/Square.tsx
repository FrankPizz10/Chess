import React, { useState } from "react";
import makePlayerMove from "./App";
import { Piece, PieceType, Square } from "./engine/state";
import WhiteKing from "./Pieces/king-white.svg";
import BlackKing from "./Pieces/king-black.svg";
import WhiteQueen from "./Pieces/queen-white.svg";
import BlackQueen from "./Pieces/queen-black.svg";
import WhiteRook from "./Pieces/rook-white.svg";
import BlackRook from "./Pieces/rook-black.svg";
import WhiteBishop from "./Pieces/bishop-white.svg";
import BlackBishop from "./Pieces/bishop-black.svg";
import WhiteKnight from "./Pieces/knight-white.svg";
import BlackKnight from "./Pieces/knight-black.svg";
import WhitePawn from "./Pieces/pawn-white.svg";
import BlackPawn from "./Pieces/pawn-black.svg";

function getSvg(piece: Piece) {
    if (piece.isWhite) {
        switch (piece.type) {
            case PieceType.King:
                return WhiteKing;
            case PieceType.Queen:
                return WhiteQueen;
            case PieceType.Rook:
                return WhiteRook;
            case PieceType.Bishop:
                return WhiteBishop;
            case PieceType.Knight:
                return WhiteKnight;
            case PieceType.Pawn:
                return WhitePawn;
        }
    } else {
        switch (piece.type) {
            case PieceType.King:
                return BlackKing;
            case PieceType.Queen:
                return BlackQueen;
            case PieceType.Rook:
                return BlackRook;
            case PieceType.Bishop:
                return BlackBishop;
            case PieceType.Knight:
                return BlackKnight;
            case PieceType.Pawn:
                return BlackPawn;
        }
    }
}

export const SquareComp: React.FC<{ square: Square | undefined; onClick: () => void, piece: Piece | undefined, index: number }> = ({
  square,
  onClick,
  piece,
  index,
}) => {
    let squareName = 'dark-square';
    if (square) {
        if ((Math.floor(index / 8) % 2 ==0) && (index % 2 === 0)) {
            squareName = 'light-square';
        }
        else if ((Math.floor(index / 8) % 2 == 1) && (index % 2 === 1)) {
            squareName = 'light-square';
        }
    }
  return (
    <div className={squareName} onClick={() => onClick()}>
        { piece && <img src={getSvg(piece)} />}
    </div>
  );
};
