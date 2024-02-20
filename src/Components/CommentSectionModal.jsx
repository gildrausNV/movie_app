import React, { useState, useRef, useEffect } from "react";
import { Modal, Typography, Box } from "@mui/material";
import { IoIosSend } from "react-icons/io";
import "./CommentSectionModal.css";
import useFetchData from "../customHooks/useFetchData";
import usePostData from "../customHooks/usePostData";

const CommentSectionModal = ({ open, onClose, movieId }) => {
  const [comments, setComments] = useState([]);
  const { data: fetchedComments, getError, getLoading, refetchData } = useFetchData(
    "http://localhost:8080/comments/movie/" + movieId
  );
  const { postData, response } = usePostData();

  const [comment, setComment] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (fetchedComments) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);

  const handleCommentChange = () => {
    setComment(inputRef.current.innerText);
  };

  const handleSubmit = async () => {
    if (comment.trim() !== "") {
      await postData("http://localhost:8080/comments/" + movieId, {
        content: comment
      });
      setComment("");
      refetchData();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Typography className="modal-title" variant="h6" component="h2">
          Comment Section
        </Typography>

        {comments &&
          comments.map((comment, index) => (
            <div className="comment" key={comment.id}>
              {comment.user.firstName} {comment.user.lastName} :{" "}
              {comment.content}
            </div>
          ))}

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
      </Box>
    </Modal>
  );
};

export default CommentSectionModal;
