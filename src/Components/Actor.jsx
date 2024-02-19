import './Actor.css';
import { FaUser } from 'react-icons/fa';

const Actor = ({ actor }) => {
    return ( 
        <div className="actor">
            <div className="actor-icon">
                <FaUser className="user-icon" />
            </div>
            <div className="actor-info">
                {/* <h4>{actor.firstname} {actor.lastName}</h4> */}
                <h4>{actor.role}</h4>
            </div>
        </div>
     );
}
 
export default Actor;