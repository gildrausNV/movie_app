import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Style/Login.css";
import usePostData from "../customHooks/usePostData";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = ({ setToken, setId, setIsAdmin, setUserContext }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { response, postData, loading, error } = usePostData();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await postData("http://localhost:8080/auth/login", loginData);
  };

  useEffect(() => {
    if (response != null) {
      const { token, id, role } = response;
      setUser(response);
      navigate("/movies");
    }
  }, [response]);

  useEffect(() => {
    setUser(null);
  }, []);

  return (
    <div className="login">
      <div className="login-form">
        <div className="header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={loginData.username}
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
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <button type="submit" disabled={loading}>
              Login
            </button>
            
          </div>
          <div className="register-link">
            <Link to={'/register'}>Create an account!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
