import React, { useState } from "react";
import "./Styles/App.css";
import { EndStatus, GameState, makeNewGame } from "./engine/state";
import { makeMove, isGameOver } from "./engine/makeMove";
import { SquareComp } from "./Components/Square";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const boardArr = Array.from({ length: 64 }, (_, i) => i);

function App() {
  const [gameState, setGameState] = useState<GameState>(makeNewGame());
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const makePlayerMove = (square1: number, square2: number) => {
    if (!gameOver) {
      try {
        const newGameState = makeMove(gameState, {
          from: square1,
          to: square2,
        });
        setGameState(newGameState);
        playMoveSound();
        const endStatus = isGameOver(newGameState);
        if (endStatus !== EndStatus.InProgress) {
          toast(endStatus.toString());
          setGameOver(true);
        }
      } catch (e) {
        window.alert(e);
      }
    }
  };

  const playMoveSound = () => {
    const audio = new Audio(require("./Sounds/standard-move.wav"));
    audio.play();
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
        <h1>Frank's Chess App</h1>
      </header>
      <ToastContainer
        bodyClassName={"toast-container"}
        autoClose={500000}
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
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
