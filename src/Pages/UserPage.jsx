import './Style/UserPage.css';
import icon from './Icons/person.png';
import { FaUserAlt } from "react-icons/fa";
import useMovieData from './useMovieData';
import Movie from '../Components/Movie';
import useFetchData from '../customHooks/useFetchData';

const UserPage = () => {
    // const { movies } = useMovieData();

    const { data: movies, error, loading, refetchData } = useFetchData("http://localhost:8080/users/watchlist");


    return (
        <div className="user-page">
            <div className="user-info">
                {/* <div className="user-image"> */}

                {/* </div> */}
                <div className="user-details">
                    {/* <img src={icon} alt="" className='user-picture' /> */}
                    <div className="user-image-container">
                        <FaUserAlt className='user-picture' />
                    </div>
                    <h2>Nikola Vujcic</h2>
                </div>
            </div>
            <div className="watchlist">
                {movies && movies.map((movie) => (
                    <Movie movie={movie}/>
                ))}
            </div>
        </div>
    );
}

export default UserPage;