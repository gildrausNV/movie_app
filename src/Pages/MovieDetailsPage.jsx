import React, { useState } from 'react';
import './Style/MovieDetailsPage.css';
import img from '../Images/inception.jpg';
import actors from './useActorsData';
import Actor from '../Components/Actor';
import { Button, Input } from '@mui/material';
import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import CommentSectionModal from '../Components/CommentSectionModal';

const MovieDetailsPage = () => {
    const [movie, setMovie] = useState({
        name: "Inception",
        releaseDate: "2010-07-16",
        description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
        image: '',
        liked: false
    });

    const [showCommentModal, setShowCommentModal] = useState(false);

    const handleToggleCommentModal = () => {
        setShowCommentModal(!showCommentModal);
    };

    return (
        <div className="movie-details-page">
            <div className="movie-details-container">
                <div className="movie-details-image">
                    <img src={img} alt={movie.name} />
                </div>
                <div className="movie-details-content">
                    <h2>{movie.name}</h2>
                    <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                    <p><strong>Description:</strong> {movie.description}</p>
                    <div className="actors">
                        {actors.map((actor) => <Actor actor={actor} />)}
                    </div>
                    <div className="input-container">
                    <div className="comment-button">
                            <button onClick={handleToggleCommentModal}>Show comment section</button>
                        </div>
                        <div className="like-button">
                            <FaHeart className='like-icon'/>
                        </div>
                    </div>
                </div>
            </div>
            <CommentSectionModal open={showCommentModal} onClose={handleToggleCommentModal} />
        </div>
    );
}

export default MovieDetailsPage;
