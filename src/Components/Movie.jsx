import './Movie.css';
import poster from '../Images/inception.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Movie = ({ movie }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    console.log(movie);

    return ( 
        <div className="watchlist-movie">
            {/* <>test</> */}
            {/* <img src={poster} alt={movie.title} className='watchlist-poster'/> */}
            <img src={movie.image} alt="" className='watchlist-poster' onClick={() => navigate('/movieDetails/' + movie.id)}/>
        </div>
     );
}
 
export default Movie;