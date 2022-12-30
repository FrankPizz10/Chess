import React, { useState } from "react";
import "./Styles/App.css";
import { Online, TwoPlayer } from "./Components";
import { Home } from "./Components";
import GameMenu, { GameType } from "./Components/GameMenu/GameMenu";
import { IPlayer } from "./Interfaces";
import { Routes, Route } from "react-router-dom";

function App() {
  const [gameType, setGameType] = useState<GameType | undefined>(undefined);
  const [player, setPlayer] = useState<IPlayer | undefined>(undefined);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frank's Chess App</h1>
      </header>
      <Routes>
          <Route 
            path="/" 
            element={<Home 
                        gameType={gameType} 
                        setGameType={setGameType} 
                        player={player} 
                        setPlayer={setPlayer} 
                        signUp={signUp} 
                        setSignUp={setSignUp} 
                      />} 
          />
          <Route 
            path="/game-menu" 
            element={<GameMenu gameType={gameType} setGameType={setGameType} />} />
          <Route 
            path={`/${GameType.TwoPlayer.toString().toLowerCase()}`} 
            element={<TwoPlayer />} />
          <Route 
            path={`/${GameType.Online.toString().toLowerCase()}`} 
            element={<Online />} />
      </Routes>      
    </div>
  );
}

export default App;

