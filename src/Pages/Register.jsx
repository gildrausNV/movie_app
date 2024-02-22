import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Style/Login.css';
import img from '../Images/oppenheimer2.jpeg';
import { MdEmail } from "react-icons/md";
import usePostData from '../customHooks/usePostData';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const Register = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        avatar: ""
    });

    const { response, error, loading, postData } = usePostData();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postData("https://movieappbackend-production-422b.up.railway.app/auth/register", registerData);
    };

    useEffect(() => {
        if (response != null) {
            const { token, id, role } = response;
            localStorage.setItem("id", id);
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            setUser(response);
            navigate("/movies");
        }
    }, [response]);

    useEffect(() => {
        localStorage.clear();
    }, []);

    const [fileToBig, setFileToBig] = useState(false);

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const maxSize = 1024 * 1024;
    
        if (file && file.size > maxSize) {
            setFileToBig(prevState => ( !prevState ));
            console.log("File size exceeds the maximum allowed size.");
            return;
        }
    
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setRegisterData(prevData => ({
                ...prevData,
                avatar: reader.result
            }))
        }
        reader.onerror = error => {
            console.log("Error: ", error);
        }
    }
    

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.message} />;
    }


    return (
        <div className="register">
            <div className="register-form">
                <div className="header">
                    <h1>Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={registerData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <FaLock className="icon" />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={registerData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <MdEmail className="icon" />
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="email"
                            value={registerData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="firstname"
                            value={registerData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="lastname"
                            value={registerData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container-avatar">
                        <label htmlFor="">Chose your avatar</label>
                        <input type="file" accept="image/*" onChange={convertToBase64} />
                    </div>
                    {fileToBig && <div className="input-container">
                        <Error message={"File to big, try again"}/>
                    </div>}
                    <div className="button-container">
                        <button>Register</button>
                    </div>
                    <div className="register-link">
                        <Link to={'/login'}>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;