import useFetchData from "../customHooks/useFetchData";
import Error from "./Error";
import Loading from "./Loading";
import './Roles.css';

const RoleActorCard = ({ role }) => {
    const { data: actor, loading, error } = useFetchData("http://localhost:8080/actors/" + role.actorId);

    if(loading){
        return <Loading />
    }

    if(error){
        return <Error message={error.message}/>
    }
    
    return (
        <div className="role-actor-card">
            <div className="actor-card-image">
                <img src={actor?.image} alt="" className="actor-card" />
            </div>
            <div className="actor-card-info">
                <h3>{actor?.firstName} {actor?.lastName} as {role.role}</h3>
            </div>
        </div>
    );
}

export default RoleActorCard;