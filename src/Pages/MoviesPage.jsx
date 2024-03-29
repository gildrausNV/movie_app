import React, { useState, useEffect, memo } from 'react';
import './Style/MoviesPage.css';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import useFetchPaginationData from '../customHooks/useFetchPaginationData';
import { GrPrevious, GrNext } from "react-icons/gr";
import MoviePaper from '../Components/MoviePaper';
import Filter from '../Components/Filter';

const MemoizedMoviePaper = memo(MoviePaper);

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
        if (page + 1 < totalPages) {
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
        setPage(0);
    }

    const handleGenreSelectChange = (e) => {
        setUrl('https://movieappbackend-production-422b.up.railway.app/movies/genre/' + e.target.value);
        setPage(0);
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.message} />;
    }

    return (
        <div className="movies-page">
            <Filter handleMovieNameChange={handleMovieNameChange} handleGenreSelectChange={handleGenreSelectChange} search={search}/>
            <div className="movies">
                <div className="pagination">
                    <GrPrevious className='pagination-button' onClick={handlePrevPage} />
                </div>
                {movies && movies?.length !== 0 ? (movies && movies.map((movie, index) => (
                    <MemoizedMoviePaper movie={movie} key={movie.id} />
                ))) : <Error message={"Sorry, no movies found"} />}
                <div className="pagination">
                    <GrNext className='pagination-button' onClick={handleNextPage} />
                </div>
            </div>
        </div>
    );
}

export default MoviesPage;
