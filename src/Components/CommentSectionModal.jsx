import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Box } from '@mui/material';
import './CommentSectionModal.css';

const CommentSectionModal = ({ open, onClose }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([{user: 'Nikola Vujcic', content: 'Nice!'},{user: 'Dimitrije Vujcic', content: 'Awesome!'},{user: 'Milos Vujcic', content: 'Meh!'}]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        setComments([...comments, comment]);
        setComment('');
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
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
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
                <Typography variant="h6" component="h2" sx={{ mt: 3 }}>
                    Comments:
                </Typography>
                
                    {comments.map((comment, index) => (
                        <div className='comment'>
                            {comment.user} {comment.content}
                        </div>
                    ))}
                    
            </Box>
        </Modal>
    );
}

export default CommentSectionModal;
