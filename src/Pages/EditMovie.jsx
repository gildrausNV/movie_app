import { useNavigate, useParams } from 'react-router-dom';
import './Style/EditMovie.css';
import useFetchData from '../customHooks/useFetchData';
import { useEffect, useState } from 'react';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import usePutData from '../customHooks/usePutData';

const EditMovie = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const { data, loading, error } = useFetchData("http://localhost:8080/movies/" + movieId);
    const { response, loadingPut, errorPut, updateData } = usePutData();

    const handleUpdate = async () => {
        await updateData('http://localhost:8080/movies/' + movieId, movie);
    }

    useEffect(() => {
        setMovie(data);
    }, [data])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    if(loading){
        return <Loading />
    }

    if(error){
        return <Error message={error.message}/>
    }

    return ( 
        <div className="edit-movie-page">
            <form className="form-container" onSubmit={handleUpdate}>
                <div className="image-container">
                    <img src={movie?.image} alt={movie?.title} className='poster'/>
                </div>
                <div className="input-movie-container">
                    <div className="input-container">
                        <label htmlFor="">Title:</label>
                        <input type="text" name='title' value={movie?.title} onChange={handleChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Date:</label>
                        <input type="text" name='releaseDate' value={movie?.releaseDate} onChange={handleChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Description:</label>
                        <textarea type="text" name='description' value={movie?.description} onChange={handleChange}/>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Poster:</label>
                        <input type="text" name='image' value={movie?.image} onChange={handleChange}/>
                    </div>
                    <div className="button-container">
                        <button type='submit'>Save changes</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default EditMovie;