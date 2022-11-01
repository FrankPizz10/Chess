import React, { useState } from "react";
import "./App.css";
import { GameState, makeNewGame, Position } from "./engine/state";
import { makeMove, getSquareAtPosition } from "./engine/makeMove";
import { SquareComp } from "./Square";
import { pieceOnSquare } from "./engine/board";

const boardArr = Array.from({ length: 64 }, (_, i) => i);

function App() {
  const [gameState, setGameState] = useState<GameState>(makeNewGame());
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);

  const logState = () => {
    console.log(gameState);
  };

  const makePlayerMove = (square1: Position, square2: Position) => {
    try {
      const newGameState = makeMove(gameState, {
        from: square1,
        to: square2,
      });
      setGameState(newGameState);
    } catch (e) {
      window.alert("Invalid Move");
    }
  };

  const onSquareClicked = (square: Position) => {
    if (selectedSquare !== null) {
      if (selectedSquare !== square) {
        makePlayerMove(selectedSquare, square);
      }
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess App</h1>
      </header>
      <div className="Inputs">
        <button onClick={logState}>Get Game State</button>
      </div>
      <div className="chess-board">
        {boardArr.map((i) => {
          const squarePos = [i % 8, Math.floor(i / 8)] as Position;
          const square = gameState.board.find(getSquareAtPosition(squarePos));
          const piece = pieceOnSquare(gameState.board, squarePos);
          return (
            <SquareComp
              square={square}
              onClick={() => onSquareClicked(squarePos)}
              piece={piece}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

