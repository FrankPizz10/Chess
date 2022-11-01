import { Position, Square } from "./state";

export function samePosition(a: Position, b: Position): boolean {
    return a[0] === b[0] && a[1] === b[1];
}

export function getSquareAtPosition(pos: Position){
    return (square: Square) => square.position[0] === pos[0] && square.position[1] === pos[1];
  }