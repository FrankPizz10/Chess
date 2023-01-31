import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Register = () => {
    const [values, setValues] = useState({
        userName: '',
        password: '',
    });

    const handleChange = (event: any) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className="RegisterPage">
            <h2 className="RegisterTitle">Create Account</h2>
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
            <button className="submit" onClick={(e) => handleSubmit(e)}>Create User</button>
            {/* {playerExists && <h3 className="PlayerExists">Player already exists</h3>} */}
            <h2 >
                <Link className="LoginButton" to="/login">Login.</Link>
            </h2>
        </div>
    );
}

export default Register;