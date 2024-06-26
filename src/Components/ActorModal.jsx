import { Box, Modal } from '@mui/material';
import './Style/ActorModal.css';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ActorModal = ({ open, onClose, actor }) => {
    const navigate = useNavigate();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box className="actor-modal-box">
                <FaUser className='like-icon'/>
                <div className="actor-info-modal">
                    <p>{actor?.firstName} {actor?.lastName}</p>
                </div>
                <button name='Visit page' onClick={() => navigate('/actorDetails/' + actor?.id)}>Visit page</button>
            </Box>

        </Modal>
    );
}

export default ActorModal;