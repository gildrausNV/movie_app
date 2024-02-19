import React, { useContext, useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Style/Login.css";
import usePostData from "../customHooks/usePostData";
import authContext from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setId, setIsAdmin, setUserContext }) => {
  const { user } = useContext(authContext);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("http://localhost:8080/auth/login", loginData);
    
  };

  useEffect(() => {
    if (response != null) {
      const { token, id, role } = response;
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/movies");
      //   setToken(token);
      //   setId(id);
      //   setIsAdmin(role === "ADMIN");
      //   setUserContext({
      //     id,
      //     token,
      //     isAdmin: role === "ADMIN",
      //   });
    }
  }, [response]);

  useEffect(() => {
    localStorage.clear();
    // setToken(null);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        </form>
      </div>
    </div>
  );
};

export default Login;
