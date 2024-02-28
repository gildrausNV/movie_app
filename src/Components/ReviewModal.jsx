import { Modal, Rating } from '@mui/material';
import './Style/ReviewModal.css';
import { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import useFetchData from '../customHooks/useFetchData';
import usePostData from '../customHooks/usePostData';
import Loading from './Loading';
import Error from './Error';
import useDeleteData from '../customHooks/useDeleteData';
import { TiDelete } from 'react-icons/ti';

const ReviewModal = ({ open, onClose, movieId }) => {
    const { data: reviews, loading, error, refetchData } = useFetchData("https://movieappbackend-production-422b.up.railway.app/reviews/" + movieId);
    const { data: averateRating } = useFetchData("https://movieappbackend-production-422b.up.railway.app/reviews/rating/" + movieId);
    const { postData } = usePostData();
    const { deleteData } = useDeleteData();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setRating(averateRating);
    }, [averateRating])

    const handleCommentChange = () => {
        setComment(inputRef.current.innerText);
    };

    const handleSubmit = async () => {
        if (comment.trim() !== "") {
            await postData("https://movieappbackend-production-422b.up.railway.app/reviews/" + movieId, {
                content: comment,
                rating: rating
            });
            setComment("");
            refetchData();
        }
    };

    const handleDelete = async (reviewId) => {
        await deleteData("https://movieappbackend-production-422b.up.railway.app/reviews/" + reviewId);
        refetchData();
    }

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error.message} />
    }

    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className="modal-box">
                <div className="reviews">
                    {reviews && reviews.map((review) => (
                        <div className='review'>
                            <p>
                                {review.user.firstName} {review.user.lastName} : {review.content}
                            </p>
                            <div className="delete-icon-container">
                                <Rating
                                name="simple-controlled"
                                value={review.rating}
                                readOnly
                                className='review-rating'
                            />
                                { (localStorage.getItem('role') === 'ADMIN' || review.user.id === localStorage.getItem("id")) && <TiDelete className="delete-icon" onClick={() => handleDelete(review.id)} />}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="review-input-container">
                    <div className="input-rating-container">
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                    <div className="input-comment-container">
                        <div
                            className="input"
                            contentEditable
                            onInput={handleCommentChange}
                            ref={inputRef}
                        ></div>
                        <div className="submit-comment-button-container">
                            <IoIosSend
                                className="submit-comment-button-icon"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

    );
}

export default ReviewModal;