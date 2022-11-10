import React, { useState } from "react";
import "./App.css";
import { GameState, makeNewGame, } from "./engine/state";
import { makeMove } from "./engine/makeMove";
import { SquareComp } from "./Square";

const boardArr = Array.from({ length: 64 }, (_, i) => i);

function App() {
  const [gameState, setGameState] = useState<GameState>(makeNewGame());
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  const logState = () => {
    console.log(gameState);
  };

  const makePlayerMove = (square1: number, square2: number) => {
    try {
      const newGameState = makeMove(gameState, {
        from: square1,
        to: square2,
      });
      setGameState(newGameState);
    } catch (e) {
      window.alert(e);
    }
  };

  const onSquareClicked = (position: number) => {
    if (selectedSquare !== null) {
      if (selectedSquare !== position) {
        makePlayerMove(selectedSquare, position);
      }
      setSelectedSquare(null);
    } else {
      setSelectedSquare(position);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess App</h1>
      </header>
      <div className="board-container">
      <div className="chess-board">
        {boardArr.map((i) => {
          const square = gameState.board[i];
          return (
            <SquareComp
              square={square}
              onClick={() => onSquareClicked(i)}
              piece={square.piece}
              key={i}
              index={i}
            />
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default App;

