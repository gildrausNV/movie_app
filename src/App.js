import "./App.css";
import Login from "./Pages/Login";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import MoviesPage from "./Pages/MoviesPage";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { MdLocalMovies } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import UserPage from "./Pages/UserPage";
import { useContext, useEffect, useState } from "react";
import { AuthProvider, useAuth } from './AuthContext';
import { MdAddToPhotos } from "react-icons/md";
import { MdRecentActors } from "react-icons/md";
import MovieForm from "./Pages/MovieForm";
import ActorsPage from "./Pages/ActorsPage";
import ActorDetailsPage from "./Pages/ActorDetailsPage";

function App() {
  const { user, setUser } = useAuth();
  
  // const [user, setUser] = useState({
  //   token: localStorage.getItem('token') || null,
  //   id: localStorage.getItem('id') || null,
  //   role: localStorage.getItem('role') || null
  // })
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [id, setId] = useState(localStorage.getItem('id') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  useEffect(() => {
    setId(localStorage.getItem('id'));
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setUser({
      id,
      token,
      role
    });
  }, [localStorage.getItem('role'), localStorage.getItem('id'), localStorage.getItem('token')])

  return (
    <div className="App">
        <Router>
          <div className="page">
            <div className="icons-container">
              {token && <>
                <Link to={"/movies"}>
                  <MdLocalMovies className="menu-icon" />
                </Link>
                {role === "USER" ? <Link to={"/user"}>
                  <FaUser className="menu-icon" />
                </Link>: <Link to={"/addMovie"}>
                  <MdAddToPhotos  className="menu-icon" />
                </Link>}
                <Link to={"/actors"}>
                  <MdRecentActors className="menu-icon" />
                </Link>
              </>}
            </div>

            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path='/login' element={<Login setId={setId} setToken={setToken} setRole={setRole}/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movieDetails/:movieId" element={<MovieDetailsPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/edit/:movieId" element={<MovieForm />} />
              <Route path="/addMovie" element={<MovieForm />} />
              <Route path="/actors" element={<ActorsPage />} />
              <Route path="/actorDetails/:actorId" element={<ActorDetailsPage />} />
            </Routes>

            <Link to={"/login"}>
              <CiLogout className="logout-icon" />
            </Link>
          </div>
        </Router>
    </div>
  );
}

export default App;
