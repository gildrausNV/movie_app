import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Style/ActorDetailsPage.css';
import useFetchData from '../customHooks/useFetchData';
import { FaUser } from 'react-icons/fa';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { CiEdit } from "react-icons/ci";

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
                <div className="actor-details-header">


                    <div className="header-info-container">
                        <div className="actor-title">
                            <div className="actor-details-image">
                                {actor?.image ? <img src={actor.image} alt="" className='actor-card' /> : <FaUser className='actor-card' />}
                            </div>
                            <div className="actor-title-name">
                                <div className="actor-firstname">{actor?.firstName}</div>
                                <div className="actor-lastname">{actor?.lastName}</div>
                            </div>
                        </div>
                        <div className="actor-info">
                            <div className="input-container">
                                <label htmlFor="">Born:</label>
                                <div>{actor?.dateOfBirth}</div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Nationality:</label>
                                <div>{actor?.nationality}</div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Place of birth:</label>
                                <div>{actor?.placeOfBirth}</div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">IMDB:</label>
                                <div><a href="https://www.imdb.com/name/nm0000138/" target="_blank" rel="noopener noreferrer">https://www.imdb.com/name/nm0000138/</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edit-button">
                    {role === "ADMIN" && <CiEdit className='like-icon' onClick={() => navigate('/editActor/' + actor.id)} />}
                </div>
            </div>
            <div className="actor-movies">
                {actorMovies && actorMovies.map((movie) => (
                    <div className="movie-card" onClick={() => navigate('/movieDetails/' + movie.id)}>
                        <div className="movie-card-poster">
                            <img src={movie.image} alt="" className='actor-movie-poster' />
                        </div>
                        <div className="movie-card-info">
                            <div className="movie-card-info-header">{movie.title}</div>
                            <div>{movie.releaseDate}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActorDetailsPage;
