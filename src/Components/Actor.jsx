import { useState } from 'react';
import './Style/Actor.css';
import { FaUser } from 'react-icons/fa';
import ActorModal from './ActorModal';
import useFetchData from '../customHooks/useFetchData';
import { useAuth } from '../AuthContext';
import Loading from './Loading';
import Error from './Error';

const Actor = ({ role }) => {
    // const { user } = useAuth();

    const url = "https://movieappbackend-production-422b.up.railway.app/actors/" + role?.actorId;

    const { data: actor, error, loading, refetchData } = useFetchData(url);

    const [showActorModal, setShowActorModal] = useState(false);

    const handleToggleActorModal = () => {
        setShowActorModal(!showActorModal);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.message}/>;
    }

    return ( 
        <div className="actor" onClick={handleToggleActorModal}>
            <div className="actor-icon">
                {actor?.image ? <img src={actor.image} alt="" className='user-avatar'/> : <FaUser className="user-icon" /> }
                
            </div>
            <div className="actor-info">
                <h4>{role?.role}</h4>
            </div>
            <ActorModal open={showActorModal} onClose={handleToggleActorModal} actor={actor}/>
        </div>
     );
}
 
export default Actor;