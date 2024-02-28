import React, { useState, useEffect } from 'react';
import './Style/MoviesPage.css';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import useFetchPaginationData from '../customHooks/useFetchPaginationData';
import { GrPrevious, GrNext } from "react-icons/gr";
import MoviePaper from '../Components/MoviePaper';

const MoviesPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 4;

    const { data: movies, error, loading, totalPages, updateParams, setUrl } = useFetchPaginationData('https://movieappbackend-production-422b.up.railway.app/movies', { size: pageSize, page });

    const handleMovieNameChange = (e) => {
        setTitle(e.target.value)
    }

    const handleNextPage = () => {
        if(page + 1 < totalPages){
            setPage(currentPage => currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(currentPage => currentPage - 1);
        }
    }

    useEffect(() => {
        updateParams({ size: pageSize, page });
    }, [page])

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
                <div className="pagination">
                    <GrPrevious className='pagination-button' onClick={handlePrevPage}/>
                </div>
                {movies && movies?.length !== 0 ? (movies && movies.map((movie, index) => (
                    <MoviePaper movie={movie} key={movie.id}/>
                    // <div className="movie" key={movie.id} onClick={() => navigate('/movieDetails/' + movie.id)}>
                    //     <Paper className="movie-paper" style={{ backgroundImage: `url(${movie.image})` }}>
                    //         <div className="overlay">
                    //             <h2 className="title">{movie.title}</h2>
                    //             <p className="release-date">{movie.releaseDate}</p>
                    //         </div>
                    //     </Paper>
                    // </div>
                ))) : <Error message={"Sorry, no movies found"} />}
                <div className="pagination">
                    <GrNext className='pagination-button' onClick={handleNextPage}/>
                </div>
            </div>
        </div>
    );
}

export default MoviesPage;
