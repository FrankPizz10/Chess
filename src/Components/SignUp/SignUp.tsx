import React, { useState } from "react";
import { IPlayer } from "../../Interfaces";
import { getPlayer } from "../SignIn/SignIn";

import "./SignUp.css";

async function checkExisitngPlayer(email: string) {
    const player = await getPlayer(email);
    if (player) {
        return true;
    }
}

const SignUp: React.FC<{setPlayer: (player: IPlayer | undefined) => void, setSignUp: (signUp: boolean) => void}> = ({
    setPlayer,
    setSignUp,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [playerExists, setPlayerExists] = useState(false);

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSignUpClick = () => {
        createPlayer();
    }

    const handleSignInClick = () => {
        setSignUp(false);
        setPlayer(undefined);
    };

    const createPlayer = async () => {
        if (await checkExisitngPlayer(email)) {
            setPlayerExists(true);
            return;
        }
        const url = "http://localhost:5000/players";
        let playerId: string | undefined;
        let player: IPlayer | undefined;
        try {
            const data = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: email,
                    password: password,
                    elo: 1000,
                }),
            });
            playerId = await data.json();
        } catch (HttpException) {
            console.log(HttpException);
            return;
        }
        if (!playerId) {
            console.log("error creating player");
            return;
        }
        player = {
            id: playerId,
            userName: email,
            password: password,
            elo: 1000,
        };
        setPlayer(player);
    }

    return (
        <div className="SignUpPage">
            <h2 className="SignUpTitle">Create Account</h2>
            <div className="input-container ic1">
                <input id="emil" className="input" type="text" placeholder=" " onChange={handleEmailChange} />
                <div className="cut"></div>
                <label htmlFor="firstname" className="placeholder">Email</label>
            </div>
            <div className="input-container ic2">
                <input id="password" className="input" type="text" placeholder=" " onChange={handlePasswordChange} />
                <div className="cut"></div>
                <label htmlFor="lastname" className="placeholder">Password</label>
            </div>
            <button className="submit" onClick={handleSignUpClick}>SignUp</button>
            {playerExists && <h3 className="PlayerExists">Player already exists</h3>}
            <h2 className="SignInButton" onClick={handleSignInClick}>Sign In</h2>
        </div>
    );
}

export default SignUp;