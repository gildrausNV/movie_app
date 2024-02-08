import './Movie.css';
import poster from '../Images/inception.jpg';
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie }) => {
    const navigate = useNavigate();

    return ( 
        <div className="watchlist-movie">
            <img src={poster} alt="" className='watchlist-poster' onClick={() => navigate('/movieDetails')}/>
        </div>
     );
}
 
export default Movie;