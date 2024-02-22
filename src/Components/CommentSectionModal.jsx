import React, { useState, useRef, useEffect } from "react";
import { Modal, Typography, Box } from "@mui/material";
import { IoIosSend } from "react-icons/io";
import "./Style/CommentSectionModal.css";
import useFetchData from "../customHooks/useFetchData";
import usePostData from "../customHooks/usePostData";
import { TiDelete } from "react-icons/ti";
import useDeleteData from "../customHooks/useDeleteData";
import { useAuth } from "../AuthContext";
import Loading from "./Loading";
import Error from "./Error";

const CommentSectionModal = ({ open, onClose, movieId }) => {
  // const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const { data: fetchedComments, getError, getLoading, refetchData } = useFetchData(
    "https://movieappbackend-production-422b.up.railway.app/comments/movie/" + movieId
  );

  const { postData, response } = usePostData();

  const { deleteData } = useDeleteData();

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

  const handleDelete = async (commentId) => {
    await deleteData("http://localhost:8080/comments/" + commentId);
    refetchData();
  }

  if (getLoading) {
    return <Loading />;
  }

  if (getError) {
    return <Error message={getError.message}/>;
  }

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
              <div className="comment-content">
                {comment.user.firstName} {comment.user.lastName} :{" "}
                {comment.content}
              </div>
              <div className="delete-icon-container">
                {comment.user.id === localStorage.getItem("id") && <TiDelete className="delete-icon" onClick={() => handleDelete(comment.id)} />}
              </div>
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
