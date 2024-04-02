import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Style/ActorDetailsPage.css';
import useFetchData from '../customHooks/useFetchData';
import { FaUser } from 'react-icons/fa';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { CiEdit } from "react-icons/ci";
import ActorMovies from '../Components/ActorMovies';
import ActorDetails from '../Components/ActorDetails';

const MemoizedActorMovies = memo(ActorMovies);
const MemoizedActorDetails = memo(ActorDetails);

const ActorDetailsPage = () => {
    const navigate = useNavigate();
    const { actorId } = useParams();
    const { data: actor, loading, error } = useFetchData("https://movieappbackend-production-422b.up.railway.app/actors/" + actorId);
    const { data: actorMovies, loading: loadingMovies, error: errorMovies } = useFetchData("https://movieappbackend-production-422b.up.railway.app/actors/movies/" + actorId);
    const role = localStorage.getItem("role");

    if (loading || loadingMovies) {
        return <Loading />;
    }

    if (error || errorMovies) {
        return <Error message={error ? error.message : errorMovies.message} />;
    }

    return (
        <div className="actor-details-page">
            <div className="actor-details">
                <MemoizedActorDetails actor={actor} />
                <div className="edit-button">
                    {role === "ADMIN" && <CiEdit className='like-icon' onClick={() => navigate('/editActor/' + actor.id)} />}
                </div>
            </div>
            <MemoizedActorMovies actorMovies={actorMovies}/>
        </div>
    );
}

export default ActorDetailsPage;
