import { useNavigate, useParams } from 'react-router-dom';
import './Style/ActorDetailsPage.css';
import useFetchData from '../customHooks/useFetchData';
import { FaUser } from 'react-icons/fa';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const ActorDetailsPage = () => {
    const navigate = useNavigate();
    const { actorId } = useParams();
    const { data: actor, loading, error } = useFetchData("https://movieappbackend-production-422b.up.railway.app/actors/" + actorId);
    const { data: actorMovies, loading: loadingMovies, error: errorMovies } = useFetchData("https://movieappbackend-production-422b.up.railway.app/actors/movies/" + actorId);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error.message} />
    }

    return (
        <div className="actor-details-page">
            <div className="actor-details">
                <div className="actor-details-header">
                    {actor?.image ? <img src={actor.image} alt="" className='actor-card' /> : <FaUser className='actor-card' />}
                    <div className="header-info-container">
                        <div className="input-container">
                            <label htmlFor="">First name:</label>
                            <div>{actor?.firstName}</div>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Last name:</label>
                            <div>{actor?.lastName}</div>
                        </div>
                    </div>
                </div>
                <div className="actor-details-form">
                    <div className="input-container">
                        <label htmlFor="">Born:</label>
                        <div>DD-MM-YYYY</div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Nationality:</label>
                        <div>American</div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Place of birth:</label>
                        <div>Los Angeles</div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">IMDB:</label>
                        <div>https://www.imdb.com/name/nm0000138/</div>
                    </div>
                </div>
            </div>
            <div className="actor-movies">
                {actorMovies && actorMovies?.map((movie) => (
                    <div className="movie-card" onClick={() => navigate('/movieDetails/' + movie.id)}>
                        <div className="movie-card-poster">
                            <img src={movie.image} alt="" className='actor-movie-poster' />
                        </div>
                        <div className="movie-card-info">
                            <div>
                                <div className="movie-card-info-header">
                                    {movie.title}
                                </div>
                                <div>
                                    {movie.releaseDate}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActorDetailsPage;
