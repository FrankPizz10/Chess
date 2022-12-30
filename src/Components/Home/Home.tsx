import React, { useEffect, useState } from "react";
import { IPlayer } from "../../Interfaces";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import TwoPlayer from "../TwoPlayer/TwoPlayer";
import GameMenu from "../GameMenu/GameMenu";
import { GameType } from "../GameMenu/GameMenu";
import Online from "../Online/Online";

import "./Home.css";
import { Link, Navigate } from "react-router-dom";

const Home: React.FC<{
    gameType: GameType | undefined, 
    setGameType: (setGameType: GameType | undefined) => void,
    player: IPlayer | undefined,
    setPlayer: (player: IPlayer | undefined) => void,
    signUp: boolean,
    setSignUp: (signUp: boolean) => void,
}> = ({
    gameType,
    setGameType,
    player,
    setPlayer,
    signUp,
    setSignUp,
}) => {

    return (
        <div className="HomeScreen">
            {player && !gameType && <h1>Welcome {player.userName}</h1>}
            {!player && !signUp &&
                <div className="SignIn">
                    <SignIn setPlayer={setPlayer} setSignUp={setSignUp}/>
                </div>
            }
            {!player && signUp &&
                <SignUp setPlayer={setPlayer} setSignUp={setSignUp}/>
            }
            {player &&
                <Navigate to="game-menu" />
            }
        </div>
    );
};

export default Home;