import "./App.css";
import Login from "./Pages/Login";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import MoviesPage from "./Pages/MoviesPage";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdLocalMovies } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import UserPage from "./Pages/UserPage";
import { useContext, useEffect, useState } from "react";
import authContext from "./AuthContext.jsx";

function App() {
  // const auth = useContext(authContext);

  const [user, setUser] = useState({
    token: localStorage.getItem('token') || null,
    id: localStorage.getItem('id') || null,
    isAdmin: localStorage.getItem('isAdmin') || null
  })
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [id, setId] = useState(localStorage.getItem('id') || null);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') || null);

  return (
    <div className="App">
      <authContext.Provider value={user}>
        <Router>
          <div className="page">
            <div className="icons-container">
              <Link to={"/movies"}>
                <MdLocalMovies className="menu-icon" />
              </Link>
              <Link to={"/user"}>
                <FaUser className="menu-icon" />
              </Link>
            </div>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/login' element={<Login setToken={setToken} setId={setId} setIsAdmin={setIsAdmin} setUserContext={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movieDetails" element={<MovieDetailsPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>

            <Link to={"/login"}>
              <CiLogout className="logout-icon" />
            </Link>
          </div>
        </Router>
      </authContext.Provider>
    </div>
  );
}

export default App;
