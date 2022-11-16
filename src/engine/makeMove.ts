import { attackingSquares } from "./board";
import { isKingInCheck, isKingInCheckmate } from "./check";
import { Move } from "./move";
import { GameState, Piece, PieceType, Square } from "./state";

export function makeMove(state: GameState, move: Move): GameState {
  if (!isValidMove(state, move)) {
    throw new Error("Invalid move");
  }

  const piece = state.board[move.from].piece!;
  let newState = {...state};

  if (piece.type === PieceType.King && Math.abs(move.from - move.to) === 2) {
    newState = makeCastlingMove(state, move);
  }

  // move the piece
  newState = updateState(newState, move, piece);
  
  // TODO: en passant
  // TODO: pawn promotion
  // TODO: cannot castle out of check

  // check if the king is in check
  if (isKingInCheck(newState.board, newState.whiteToMove)) {
    throw new Error("Invalid move - puts king in check");
  }

  newState = updateCastlingStatus(newState, piece, move);
  
  newState.whiteToMove = !newState.whiteToMove;

  try {
    isGameOver(newState)
  }
  catch (e) {
    alert(e);
  }

  return newState;
}

function updateState(state: GameState, move: Move, piece: Piece): GameState {
  const updateState = {
    ...state,
    board: updateSquaresUnderAttack(state.board.map((square, index) => {
      if (index === move.from) {
        return {
          ...square,
          piece: undefined,
        };
      }
      if (index === move.to) {
        return {
          ...square,
          piece,
        };
      }
      return square;
    })),
  }
  return updateState;
}

function updateCastlingStatus(state: GameState, piece: Piece, move: Move): GameState {
  const updateState = {...state}
  const curPlayer = updateState.players.find((player) => player.isWhite === state.whiteToMove)!;
  updateState.players.map(() => {
    if (piece.type === PieceType.King) {
      curPlayer.canCastleKingSide = false;
      curPlayer.canCastleQueenSide = false;
    }
    if (piece.type === PieceType.Rook) {
      if (move.from === 0) {
        curPlayer.canCastleQueenSide = false;
      }
      if (move.from === 7) {
        curPlayer.canCastleKingSide = false;
      }
      if (move.from === 56) {
        curPlayer.canCastleQueenSide = false;
      }
      if (move.from === 63) {
        curPlayer.canCastleKingSide = false;
      }
    }
  })
  return updateState;
}

/**
 * Checks if the move is valid (i.e. the piece can move to the destination square). Does not check if the move is legal (i.e. the king is not in check after the move).
 * @param state 
 * @param move 
 * @returns 
 */
function isValidMove(state: GameState, move: Move): boolean {
  const pieceToMove = state.board[move.from]?.piece;
  // Check if move is castling
  if (pieceToMove?.type === PieceType.King && Math.abs(move.from - move.to) === 2) {
    return isValidCastlingMove(state, move);
  }
  if (!pieceToMove || pieceToMove.isWhite !== state.whiteToMove) return false;
  
  const occupyingPiece = state.board[move.to]?.piece;
  if (occupyingPiece && (occupyingPiece.isWhite === state.whiteToMove || occupyingPiece.type === PieceType.King)) return false;
  const movablePositions = attackingSquares(state.board, move.from, state.whiteToMove, occupyingPiece ? "attack" : "move");
  if (!movablePositions.includes(move.to)) return false;
  return true;
}

function isGameOver(state: GameState): boolean {
  // checkmate
  if (isKingInCheckmate(state.board, state.whiteToMove)) {
    throw new Error("Checkmate");
  }

  // stalemate
  // insufficient material
  if (insufficientMaterial(state.board)) {
    throw new Error("Insufficient material");
  }

  // threefold repetition
  // plan: keep a list of all previous board states, and check if the current board state is in the list
  // encode the board state as an array of integers, where each integer represents a piece on the board
  return false;
}

function isValidCastlingMove(state: GameState, move: Move): boolean {
  const curPlayer = state.players.find((player) => player.isWhite === state.whiteToMove)!;
  if (state.board[move.from].piece?.type !== PieceType.King) return false;
  if (move.from === 4 && move.to === 6 && curPlayer.canCastleKingSide) {
    if (state.board[7].piece?.type !== PieceType.Rook) return false;
    return !castlingSquaresOccupiedOrUnderAttack(state, move);
  }
  if (move.from === 4 && move.to === 2 && curPlayer.canCastleQueenSide) {
    if (state.board[0].piece?.type !== PieceType.Rook) return false;
    return !castlingSquaresOccupiedOrUnderAttack(state, move);
  }
  if (move.from === 60 && move.to === 62 && curPlayer.canCastleKingSide) {
    if (state.board[63].piece?.type !== PieceType.Rook) return false;
    return !castlingSquaresOccupiedOrUnderAttack(state, move);
  }
  if (move.from === 60 && move.to === 58 && curPlayer.canCastleQueenSide) {
    if (state.board[56].piece?.type !== PieceType.Rook) return false;
    return !castlingSquaresOccupiedOrUnderAttack(state, move);
  }
  return false;
} 

function castlingSquaresOccupiedOrUnderAttack(state: GameState, move: Move): boolean {
  if (move.from === 4 && move.to === 6) {
    for (let i = 5; i <= 6; i++) {
      if (state.board[i].piece) return true;
        const opponentAttackers = state.board[i].attackingPieces.filter((piece) => piece.isWhite !== state.whiteToMove);
        if (opponentAttackers.length > 0) return true;
    }
  }
  if (move.from === 4 && move.to === 2) {
    for (let i = 1; i <= 3; i++) {
      if (state.board[i].piece) return true;
        const opponentAttackers = state.board[i].attackingPieces.filter((piece) => piece.isWhite !== state.whiteToMove);
        if (opponentAttackers.length > 0) return true;
    }
  }
  if (move.from === 60 && move.to === 62) {
    for (let i = 61; i <= 62; i++) {
      if (state.board[i].piece) return true;
        const opponentAttackers = state.board[i].attackingPieces.filter((piece) => piece.isWhite !== state.whiteToMove);
        if (opponentAttackers.length > 0) return true;
    }
  }
  if (move.from === 60 && move.to === 58) {
    for (let i = 57; i <= 59; i++) {
      if (state.board[i].piece) return true;
        const opponentAttackers = state.board[i].attackingPieces.filter((piece) => piece.isWhite !== state.whiteToMove);
        if (opponentAttackers.length > 0) return true;
    }
  }
  return false;
}

function makeCastlingMove(state: GameState, move: Move): GameState {
  const newState = {...state};
  if (move.from === 4 && move.to === 6) {
    newState.board[5].piece = newState.board[7].piece;
    newState.board[7].piece = undefined;
  }
  if (move.from === 4 && move.to === 2) {
    newState.board[3].piece = newState.board[0].piece;
    newState.board[0].piece = undefined;
  }
  if (move.from === 60 && move.to === 62) {
    newState.board[61].piece = newState.board[63].piece;
    newState.board[63].piece = undefined;
  }
  if (move.from === 60 && move.to === 58) {
    newState.board[59].piece = newState.board[56].piece;
    newState.board[56].piece = undefined;
  }
  return newState;
}



function updateSquaresUnderAttack(board: Square[]): Square[] {
  const newBoard: Square[] = board.map((square) => {
    return {
      ...square,
      attackingPieces: [],
      movablePieces: [],
    }
  });
  for (let i = 0; i < 64; i++) {
    const square = newBoard[i];
    if (square.piece) {
      const attackingPositions = attackingSquares(board, i, true, "check");
      attackingPositions.forEach((position) => {
        newBoard[position].attackingPieces.push(square.piece!);
      });

      const movablePositions = attackingSquares(board, i, true, "move");
      movablePositions.forEach((position) => {
        newBoard[position].movablePieces.push(square.piece!);
      });
    }
  }
  return newBoard;
}

function insufficientMaterial(board: Square[]): boolean {
  const whitePieces = board.filter((square) => square.piece && square.piece.isWhite).map((square) => square.piece!);
  const blackPieces = board.filter((square) => square.piece && !square.piece.isWhite).map((square) => square.piece!);
  return insufficientCombination(whitePieces) && insufficientCombination(blackPieces);
}

function insufficientCombination(pieces: Piece[]): boolean {
  if (pieces.length > 2) return false;
  if (pieces.length === 1) return true;
  const otherPiece = pieces.find((piece) => piece.type !== PieceType.King);
  return otherPiece?.type === PieceType.Bishop || otherPiece?.type === PieceType.Knight;
}