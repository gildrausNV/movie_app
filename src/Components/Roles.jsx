import { memo } from 'react';
import RoleActorCard from './RoleActorCard';
import './Style/Roles.css';

const MemoizedRoleActorCard = memo(RoleActorCard);

const Roles = ({ roles }) => {
    return ( 
        <div className="roles">
            {roles && roles?.map((role) => (
                <MemoizedRoleActorCard role={role}/>
            ) )}
        </div>
     );
}
 
export default Roles;