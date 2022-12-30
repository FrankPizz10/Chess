import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import './GameMenu.css';

export enum GameType {
    TwoPlayer = "TwoPlayer",
    Online = "Online",
}

const GameMenu: React.FC<{gameType: GameType | undefined, setGameType: (gameType: GameType | undefined) => void}> = ({
    gameType,
    setGameType,
}) => {
    const naviagte = useNavigate();

    const handleGameClick = (gameType: GameType) => {
        setGameType(gameType);
        naviagte(`/${gameType.toString().toLowerCase()}`);
    }

    return (
        <div className="GameMenu">
            <h2 className='ChooseGame'>Choose a game type</h2>
            <div className='GameList'>
                <motion.div 
                    whileHover={{scale: 1.1}}
                    className="GameType" 
                    onClick={() => handleGameClick(GameType.TwoPlayer)}
                >
                    <h3>{GameType.TwoPlayer}</h3>
                </motion.div>
                <motion.div 
                    whileHover={{scale: 1.1}}
                    className="GameType" 
                    onClick={() => handleGameClick(GameType.Online)}
                >
                    <h3>{GameType.Online}</h3>
                </motion.div>
            </div>
        </div>
    );
}

export default GameMenu;
