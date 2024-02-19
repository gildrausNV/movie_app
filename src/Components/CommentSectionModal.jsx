import React, { useState } from "react";
import { Modal, TextField, Button, Typography, Box } from "@mui/material";
import "./CommentSectionModal.css";
import useFetchData from "../customHooks/useFetchData";
import usePostData from "../customHooks/usePostData";

const CommentSectionModal = ({ open, onClose, movieId }) => {
  const { data: comments, getError, getLoading, refetchData } = useFetchData("http://localhost:8080/comments/movie/" + movieId);
  const { data, postError, postLoading, postData } = usePostData();

  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    postData("http://localhost:8080/comments/" + movieId, comment);
    setComment("");
    refetchData();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Comment Section
        </Typography>
        <TextField
          id="outlined-basic"
          label="Enter your comment"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
        <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
          Comments:
        </Typography>

        {comments &&
          comments.map((comment, index) => (
            <div className="comment" key={comment.id}>
              {comment.user.firstName} {comment.user.lastName} :
              {comment.content}
            </div>
          ))}
      </Box>
    </Modal>
  );
};

export default CommentSectionModal;
