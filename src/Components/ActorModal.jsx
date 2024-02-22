import { Box, Modal } from '@mui/material';
import './Style/ActorModal.css';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../AuthContext';

const ActorModal = ({ open, onClose, actor }) => {
    const { user } = useAuth();

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