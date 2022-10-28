import React, { useState } from 'react';
import './App.css';
import { makeNewGame } from './engine/state';
import { makeMove } from './engine/makeMove';

function App() {
  const [gameState, setGameState] = useState(makeNewGame());

  const logState = () => {
    console.log(gameState);
  }

  const makePlayerMove = () => {
    const newGameState = makeMove(gameState, {
      from: [4, 6],
      to: [4, 5],
    });
    setGameState(newGameState);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess App</h1>
      </header>
      <div className="Inputs">
        <button onClick={logState}>Get Game State</button>
        <br></br>
        <button onClick={makePlayerMove}>Make Move</button>
      </div>
      <h1>{ gameState.whiteToMove.toString() }</h1>
    </div>
  );
}

export default App;
