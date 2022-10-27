import { Position } from "./state";

export function samePosition(a: Position, b: Position): boolean {
    return a[0] === b[0] && a[1] === b[1];
}