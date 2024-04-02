import { Navigate, useNavigate } from "react-router-dom";

const ActorMovies = ({actorMovies}) => {

    const navigate = useNavigate();

    return ( 
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
     );
}
 
export default ActorMovies;