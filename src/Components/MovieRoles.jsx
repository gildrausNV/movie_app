import { memo } from "react";
import Actor from "./Actor";


const MemoizedActor = memo(Actor);

const MovieRoles = ({ roles }) => {
    return (
        <>
            <div className="actors">
                {roles?.map((role, index) => <MemoizedActor role={role} key={index} />)}
            </div>
        </>
    );
}

export default MovieRoles;