import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Style/Login.css';
import img from '../Images/oppenheimer2.jpeg';

const Login = () => {
    return (
        <div className="login">
            {/* <img src={img} alt="" width="2029" height="1020" className='background'/> */}
            <div className="login-form">
                <div className="header">
                    <h1>Login</h1>
                </div>
                <form>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input type="text" name="username" id="username" placeholder="Username" />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon" />
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className="button-container">
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
