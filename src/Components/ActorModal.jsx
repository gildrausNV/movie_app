import { Box, Modal } from '@mui/material';
import './ActorModal.css';
import { FaUser } from 'react-icons/fa';

const ActorModal = ({ open, onClose, actor }) => {

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
                
            </Box>
        </Modal>
    );
}

export default ActorModal;