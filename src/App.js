import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import MoviesPage from './Pages/MoviesPage';
import Register from './Pages/Register';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar/> */}
        <div className="page">
          <Routes>
            {/* <Login/> */}
            {/* <MoviesPage/> */}



            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movieDetails' element={<MovieDetailsPage />} />


            {/* <Register/> */}
          </Routes>
          <Link to={'/login'}><CiLogout className='logout-icon'/></Link>
        </div>
      </Router>
    </div>
  );
}

export default App;
