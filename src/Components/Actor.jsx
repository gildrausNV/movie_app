import { useState } from 'react';
import './Actor.css';
import { FaUser } from 'react-icons/fa';
import ActorModal from './ActorModal';
import useFetchData from '../customHooks/useFetchData';

const Actor = ({ role }) => {
    const url = "http://localhost:8080/actors/" + role?.actorId;

    const { data: actor, error, loading, refetchData } = useFetchData(url);

    const [showActorModal, setShowActorModal] = useState(false);

    const handleToggleActorModal = () => {
        setShowActorModal(!showActorModal);
    };

    return ( 
        <div className="actor" onClick={handleToggleActorModal}>
            <div className="actor-icon">
                <FaUser className="user-icon" />
            </div>
            <div className="actor-info">
                {/* <h4>{actor.firstname} {actor.lastName}</h4> */}
                <h4>{role.role}</h4>
            </div>
            <ActorModal open={showActorModal} onClose={handleToggleActorModal} actor={actor}/>
        </div>
     );
}
 
export default Actor;