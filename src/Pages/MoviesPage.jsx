import React, { useState } from 'react';
import './Style/MoviesPage.css';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../customHooks/useFetchData';
import img from '../Images/inception.jpg';
import { useAuth } from '../AuthContext';

const MoviesPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate(); 
    const { data: movies, error, loading, refetchData } = useFetchData('http://localhost:8080/movies', user.token);

    return (
        <div className="movies-page">
            <div className="movies">
                {movies && movies.map((movie, index) => (
                    <div className="movie" key={movie.id} onClick={() => navigate('/movieDetails/' + movie.id)}>
                        <Paper className="movie-paper" style={{ backgroundImage: `url(${img})` }}>
                            <div className="overlay">
                                <h2 className="title">{movie.title}</h2>
                                <p className="release-date">{movie.releaseDate}</p>
                            </div>
                        </Paper>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesPage;
