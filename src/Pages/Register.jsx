import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import img from '../Images/oppenheimer2.jpeg';
import { MdEmail } from "react-icons/md";

const Register = () => {
    return ( 
        <div className="register">
            <div className="register-form">
                <div className="header">
                    <h1>Register</h1>
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
                    <div className="input-container">
                        <MdEmail className="icon" />
                        <input type="text" name="email" id="email" placeholder="email" />
                    </div>
                    <div className="button-container">
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Register;