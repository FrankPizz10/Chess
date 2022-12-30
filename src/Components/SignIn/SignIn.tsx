import React, { useEffect, useState } from "react";
import { IPlayer } from "../../Interfaces";

import "./SignIn.css";

export const getPlayer = async (email: string) => {
    const url = `http://localhost:5000/players/getByUserName/${email}`;
    const data = await fetch(url);
    const user = await data.json();
    return user;
}

const SignIn: React.FC<{setPlayer: (player: IPlayer | undefined) => void, setSignUp: (signUp: boolean) => void}> = ({
    setPlayer,
    setSignUp,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [getUser, setGetUser] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setGetUser(false);
            const user = await getPlayer(email);
            if (!user) {
                console.log("user not found");
                return;
            }
            if (!checkPassword(user.password)) {
                console.log("password incorrect");
                setInvalidPass(true);
                return;
            }
            setInvalidPass(false);
            setPlayer(user);
        }

        if (getUser) {
            console.log("getting user");
            fetchUser().catch((err) => console.log(err));
        }
    }, [getUser]);

    const checkPassword = (userPass:String) => {
        return userPass === password;
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    const handleSubmitClick = () => {
        setGetUser(true);
    }

    const handleSignUpClick = () => {
        setSignUp(true);
    }

    return (
        <div className="SignInPage">
            <h2 className="SignInTitle">Sign In</h2>
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
            <button className="submit" onClick={handleSubmitClick}>SignIn</button>
            {invalidPass && <h1 className="InvalidPassword">Invalid Password</h1>}
            <button className="SignUp" onClick={handleSignUpClick}>CreateAccount</button>
        </div>
    );
};

export default SignIn;