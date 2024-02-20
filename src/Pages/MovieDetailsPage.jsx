import React, { useEffect, useState } from 'react';
import './Style/MovieDetailsPage.css';
import img from '../Images/inception.jpg';
import actors from './useActorsData';
import Actor from '../Components/Actor';
import { Button, Input } from '@mui/material';
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import CommentSectionModal from '../Components/CommentSectionModal';
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoIosEyeOff } from "react-icons/io";
import { useParams } from 'react-router-dom';
import useFetchData from '../customHooks/useFetchData';
import usePostData from '../customHooks/usePostData';
import useDeleteData from '../customHooks/useDeleteData';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [isInMyWatchlist, setIsInMyWatchlist] = useState(false);

    const { data: movie, error, loading, refetchData } = useFetchData('http://localhost:8080/movies/' + movieId);
    const { data: isInMyWatchlistData, refetchData: refetchWatchlistData } = useFetchData('http://localhost:8080/movies/isInMyWatchlist/' + movieId);
    const { postData } = usePostData();
    const { deleteData } = useDeleteData();

    const handleAddToWatchlist = async () => {
        await postData('http://localhost:8080/users/watchlist/' + movieId);
        refetchWatchlistData();
    }

    const handleRemoveFromWatchlist = async () => {
        await deleteData('http://localhost:8080/users/watchlist/' + movieId);
        refetchWatchlistData();
    }

    useEffect(() => {
        if (isInMyWatchlistData !== undefined) {
            setIsInMyWatchlist(isInMyWatchlistData);
        }
    }, [isInMyWatchlistData]);
    

    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleToggleCommentModal = () => {
        setShowCommentModal(!showCommentModal);
    };

    
    

    return (
        <div className="movie-details-page">
            {movie &&
                <div className="movie-details-container">
                    <div className="movie-details-image">
                        <img src={img} alt={movie.title} />
                    </div>
                    <div className="movie-details-content">
                        <h2>{movie.title}</h2>
                        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <div className="actors">
                            {movie.roles.map((role, index) => <Actor role={role} key={index} />)}
                        </div>
                        <div className="input-container">
                            {/* <div className="comment-button"> */}
                            <button className='comment-button' onClick={handleToggleCommentModal}>Show comment section</button>
                            {/* </div> */}
                            <div className="like-button">
                                {!isInMyWatchlist ? <MdOutlineRemoveRedEye className='like-icon' onClick={handleAddToWatchlist} /> : <IoIosEyeOff className='like-icon' onClick={handleRemoveFromWatchlist} />}
                            </div>
                        </div>
                    </div>
                </div>}

            <CommentSectionModal open={showCommentModal} onClose={handleToggleCommentModal} movieId={movieId} />
        </div>
    );
}

export default MovieDetailsPage;
