import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const [values, setValues] = useState({
        userName: '',
        password: '',
    });
    const [invalidValues, setInvalidValues] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);

    const handleChange = (event: any) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const validateForm = () => {
        const { userName, password } = values;
        if (userName === "") {
          setInvalidValues(true);
          return false;
        } else if (password === "") {
          setInvalidValues(true);
          return false;
        }
        return true;
      };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        validateForm();
    }

    return (
        <div className="LoginPage">
            <h2 className="LoginTitle">Login</h2>
            <div className="input-container ic1">
                <input name="userName" className="input" type="text" placeholder=" " onChange={(e) => handleChange(e)} />
                <div className="cut"></div>
                <label htmlFor="userName" className="placeholder">Username</label>
            </div>
            <div className="input-container ic2">
                <input name="password" className="input" type="password" placeholder=" " onChange={(e) => handleChange(e)} />
                <div className="cut"></div>
                <label htmlFor="Password" className="placeholder">Password</label>
            </div>
            <button className="submit" onClick={handleSubmit}>Login</button>
            {invalidValues && <h1 className="InvalidValues">Email and Password is required</h1>}
            {invalidPass && <h1 className="InvalidPassword">Invalid Password</h1>}
            <h2 >
                <Link className="RegisterButton" to="/register">Register</Link>
            </h2>
        </div>
    );
}

export default Login;