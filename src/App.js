import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import MoviesPage from './Pages/MoviesPage';
import Register from './Pages/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { MdLocalMovies } from "react-icons/md";
import { FaUser } from 'react-icons/fa';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
        <div className="page">
          <div className="icons-container">
            <Link to={'/movies'}><MdLocalMovies className='menu-icon' /></Link>
            <Link to={'/user'}><FaUser className='menu-icon' /></Link>
          </div>
          <Routes>
            {/* <Login/> */}
            {/* <MoviesPage/> */}



            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movieDetails' element={<MovieDetailsPage />} />
            <Route path='/user' element={<UserPage />} />

            {/* <Register/> */}
          </Routes>
          <Link to={'/login'}><CiLogout className='logout-icon' /></Link>
        </div>
      </Router>
    </div>
  );
}

export default App;
