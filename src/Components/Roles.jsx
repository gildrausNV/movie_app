import RoleActorCard from './RoleActorCard';
import './Roles.css';

const Roles = ({ roles }) => {
    return ( 
        <div className="roles">
            {roles && roles?.map((role) => (
                <RoleActorCard role={role}/>
            ) )}
        </div>
     );
}
 
export default Roles;