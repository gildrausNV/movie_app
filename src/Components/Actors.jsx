import { FaUser } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Actors = ({actors}) => {
    const navigate = useNavigate();

    return ( 
        <>
            {actors && actors.map((actor) => (
                    <div className="actor-actor-page" onClick={() => navigate('/actorDetails/' + actor.id)} key={actor.id}>
                        {actor.image ? <img src={actor.image} alt="" className='actor-card' /> : <FaUser className='actor-card'/>}
                        <div className="info">
                            {actor.firstName} {actor.lastName}
                        </div>
                    </div>
                ))}
        </>
     );
}
 
export default Actors;