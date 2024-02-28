import React, { memo, useEffect, useMemo, useState } from 'react';
import './Style/MovieDetailsPage.css';
import Actor from '../Components/Actor';
import { Button, Input, Rating } from '@mui/material';
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '../customHooks/useFetchData';
import usePostData from '../customHooks/usePostData';
import useDeleteData from '../customHooks/useDeleteData';
import { useAuth } from '../AuthContext';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { CiEdit } from "react-icons/ci";
import ReviewModal from '../Components/ReviewModal';
import useFetchPaginationData from '../customHooks/useFetchPaginationData';

const MemoizedActor = memo(Actor);

const MovieDetailsPage = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const { movieId } = useParams();
    const [isInMyWatchlist, setIsInMyWatchlist] = useState(false);

    const { data: averateRating } = useFetchData("https://movieappbackend-production-422b.up.railway.app/reviews/rating/" + movieId);
    const { data: movie, error, loading, refetchData } = useFetchData("https://movieappbackend-production-422b.up.railway.app/movies/" + movieId);
    const { data: isInMyWatchlistData, refetchData: refetchWatchlistData } = useFetchData('https://movieappbackend-production-422b.up.railway.app/movies/isInMyWatchlist/' + movieId);
    const { postData, loading: loadingPost, error: errorPost } = usePostData();
    const { deleteData, loading: loadingDelete, error: errorDelete } = useDeleteData();

    const handleAddToWatchlist = async () => {
        await postData('https://movieappbackend-production-422b.up.railway.app/users/watchlist/' + movieId);
        refetchWatchlistData();
    }

    const handleRemoveFromWatchlist = async () => {
        await deleteData('https://movieappbackend-production-422b.up.railway.app/users/watchlist/' + movieId);
        refetchWatchlistData();
    }

    useEffect(() => {
        if (isInMyWatchlistData !== undefined) {
            setIsInMyWatchlist(isInMyWatchlistData);
        }
    }, [isInMyWatchlistData]);


    const [showReviewModal, setShowReviewModal] = useState(false);

    const handleToggleReviewModal = () => {
        setShowReviewModal(!showReviewModal);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.message} />;
    }

    return (
        <div className="movie-details-page">
            {movie &&
                <div className="movie-details-container">
                    <div className="movie-details-image">
                        <img src={movie.image} alt={movie.title} />
                    </div>
                    <div className="movie-details-content">
                        <div className="movie-details-header">
                            <h2>{movie.title}</h2>
                            <Rating
                                name="simple-controlled"
                                value={averateRating}
                                readOnly
                            />
                        </div>

                        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <div className="actors">
                            {movie?.roles?.map((role, index) => <MemoizedActor role={role} key={index} />)}
                        </div>
                        <div className="comment-container">
                            <button className='comment-button' onClick={handleToggleReviewModal}>Show reviews</button>
                            <div className="like-button">
                                {!(loadingDelete || loadingPost) ? (role === "USER" ? (!isInMyWatchlist ? <MdOutlineRemoveRedEye className='like-icon' onClick={handleAddToWatchlist} />
                                    : <IoIosEyeOff className='like-icon' onClick={handleRemoveFromWatchlist} />) : <CiEdit className='like-icon' onClick={() => navigate('/editMovie/' + movie.id)} />) :
                                    <div className="button-loading"><Loading /></div>}
                            </div>
                        </div>
                    </div>
                </div>}
            <ReviewModal open={showReviewModal} onClose={handleToggleReviewModal} movieId={movieId} />
        </div>
    );
}

export default MovieDetailsPage;
