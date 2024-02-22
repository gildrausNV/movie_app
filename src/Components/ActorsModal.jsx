import { Box, Modal, Typography } from '@mui/material';
import './ActorsModal.css';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import useFetchData from '../customHooks/useFetchData';
import usePostData from '../customHooks/usePostData';
import { useNavigate } from 'react-router-dom';
import Error from './Error';

const ActorsModal = ({ open, onClose, roles, setRoles }) => {
    const navigate = useNavigate();
    const { response, loading: loadingPost, error: errorPost, postData } = usePostData();
    const [newActor, setNewActor] = useState({
        firstName: "",
        lastName: "",
        image: ""
    });

    const handleActorInputChange = (e) => {
        const { name, value } = e.target;
        setNewActor((prevRole) => ({
            ...prevRole,
            [name]: value
        }));
    }


    const handleAddActor = async () => {
        await postData("http://localhost:8080/actors", newActor);
        navigate('/movies');
    }

    if(errorPost){
        return <Error message={errorPost.message}/>
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="actors-modal-box">
                <Typography className="modal-title" variant="h6" component="h2">
                    Actor form
                </Typography>
                <div className="actors-form">

                    <div className="actor-info">
                        <FaUser className="user-icon" />
                        <div className="input-container-modal">
                            <div className="input-box-modal">
                                <label htmlFor="">First name:</label>
                                <input type="text" name="firstName" id="firstName" onChange={handleActorInputChange} />
                            </div>
                            <div className="input-box-modal">
                                <label htmlFor="">Last name:</label>
                                <input type="text" name="lastName" id="lastName" onChange={handleActorInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="role-input">
                        <div className="input-box-modal">
                            <label htmlFor="">Image url:</label>
                            <input type="text" name="image" id="image" onChange={handleActorInputChange} />
                        </div>
                    </div>
                    <div className="add-button-container">
                        <button className="add-button" onClick={handleAddActor}>Add actor</button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}

export default ActorsModal;
