import React, { useState } from 'react';
import './Style/MoviesPage.css';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../customHooks/useFetchData';
import { useAuth } from '../AuthContext';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { Search } from '@mui/icons-material';

const MoviesPage = () => {
    // const { user } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { data: movies, error, loading, refetchData, setUrl } = useFetchData('https://movieappbackend-production-422b.up.railway.app/movies');

    const handleMovieNameChange = (e) => {
        setTitle(e.target.value)
    }

    const search = () => {
        if (title === "") {
            setUrl('https://movieappbackend-production-422b.up.railway.app/movies');
        }
        else {
            setUrl('https://movieappbackend-production-422b.up.railway.app/movies/search/' + title);
        }
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.message} />;
    }

    return (
        <div className="movies-page">
            <div className="search-container">
                <div className="search">
                    <div className="input-search-container">
                        <input type="text" name="search" id="search" placeholder='' onChange={handleMovieNameChange} />
                    </div>
                    <div className="button-search-container">
                        <button onClick={() => search()}>Search</button>
                    </div>
                </div>
            </div>
            <div className="movies">
                { movies && movies?.length !== 0 ? (movies && movies.map((movie, index) => (
                    <div className="movie" key={movie.id} onClick={() => navigate('/movieDetails/' + movie.id)}>
                        <Paper className="movie-paper" style={{ backgroundImage: `url(${movie.image})` }}>
                            <div className="overlay">
                                <h2 className="title">{movie.title}</h2>
                                <p className="release-date">{movie.releaseDate}</p>
                            </div>
                        </Paper>
                    </div>
                ))) : <Error message={"Sorry, no movies found"}/>}
            </div>
        </div>
    );
}

export default MoviesPage;
