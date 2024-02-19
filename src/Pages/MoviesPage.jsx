import React, { useContext } from 'react';
import './Style/MoviesPage.css';
import useMovieData from './useMovieData';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import img from '../Images/inception.jpg';
import { useNavigate } from 'react-router-dom';

const MoviesPage = () => {
    const { movies } = useMovieData();
    const navigate = useNavigate(); 
    console.log(localStorage.getItem("role"));
    return (
        <div className="movies-page">
            <div className="movies">
                    {movies.map((movie, index) => (
                        <div className="movie" key={index} onClick={() => navigate('/movieDetails')}>
                            <Paper className="movie-paper" style={{ backgroundImage: `url(${img})`, color: 'white' }}/>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MoviesPage;
