import { useNavigate, useParams } from 'react-router-dom';
import './Style/MovieForm.css';
import useFetchData from '../customHooks/useFetchData';
import usePutData from '../customHooks/usePutData';
import usePostData from '../customHooks/usePostData';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { memo, useEffect, useState } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import Roles from '../Components/Roles';
import useFetchPaginationData from '../customHooks/useFetchPaginationData';

const MemoizedRoles = memo(Roles);

const MovieForm = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState({});
    const [roles, setRoles] = useState([]);
    const { data, loading, error } = useFetchData("https://movieappbackend-production-422b.up.railway.app/movies/" + movieId);
    const { response, loading: loadingPut, error: errorPut, updateData } = usePutData();
    const { postResponse, loading: loadingPost, error: errorPost, postData } = usePostData();

    const handleSubmit = async () => {
        const updatedMovie = {
            ...movie,
            roles: roles,
            genre: genre
        };

        if (movieId) {
            await updateData('https://movieappbackend-production-422b.up.railway.app/movies/' + movieId, updatedMovie);
            navigate('/movieDetails/' + movieId);
        } else {
            await postData('https://movieappbackend-production-422b.up.railway.app/movies', updatedMovie);
        }
    };

    useEffect(() => {
        if (movieId) {
            setMovie(data);
            setRoles(data?.roles);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const { data: actors, loadingActors, errorActors } = useFetchPaginationData("https://movieappbackend-production-422b.up.railway.app/actors", null);
    const [role, setRole] = useState({});
    const handleRoleInputChange = (e) => {
        const { name, value } = e.target;
        setRole((prevRole) => ({
            ...prevRole,
            [name]: value
        }));
    };

    const handleActorSelectChange = (e) => {
        const actorId = e.target.value;
        setRole((prevRole) => ({
            ...prevRole,
            actorId: actorId
        }));
    };

    const [genre, setGenre] = useState();
    const handleGenreSelectChange = (e) => {
        setGenre(e.target.value);
    };


    const handleAddRole = async () => {
        if (roles && roles.length > 0) {
            setRoles(prevRoles => [...prevRoles, role]);
        }
        else {
            setRoles([role]);
        }
    };

    if (loading || loadingPost || loadingPut) {
        return <Loading />
    }

    if (errorActors) {
        return <Error message={errorActors.response.data.body.detail}/>;
    }

    return (
        <div className="form-container">
            <div className="form">
                <div className="input-movie-container">
                    <div className="input-container">
                        <label htmlFor="">Title:</label>
                        <input type="text" name='title' value={movie?.title} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Date:</label>
                        <input type="date" name='releaseDate' value={movie?.releaseDate} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Description:</label>
                        <textarea type="text" name='description' value={movie?.description} onChange={handleChange} id='description' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Genre:</label>
                        <select className="actor-select" onChange={handleGenreSelectChange}>
                            <option value="">Select genre</option>
                            <option value='SCIENCE_FICTION'>Science fiction</option>
                            <option value='ACTION'>Action</option>
                            <option value='COMEDY'>Comedy</option>
                            <option value='DRAMA'>Drama</option>
                            <option value='ROMANCE'>Romance</option>
                            <option value='HORROR'>Horror</option>
                            <option value='THRILLER'>Thriller</option>
                            <option value='WESTERN'>Western</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Poster:</label>
                        <input type="text" name='image' value={movie?.image} onChange={handleChange} />
                    </div>

                    <div className="input-container">
                        <select className="actor-select" onChange={handleActorSelectChange}>
                            <option value="">Select an actor</option>
                            {actors && actors?.map((actor, index) => (
                                <option key={index} value={actor.id}>
                                    {actor.firstName} {actor.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Role:</label>
                        <input type="text" name="role" id="roleName" onChange={handleRoleInputChange} value={role?.role} />
                        <button className="add-button" onClick={handleAddRole} type='button'>Add role</button>
                    </div>
                    <div className="input-container">
                        <MemoizedRoles roles={roles}/> 
                    </div>
                    <div className="input-container">
                        <button type='button' onClick={() => handleSubmit()}>Save changes</button>
                    </div>
                    <div className="button-container">
                        {errorPost && <Error message={errorPost.response.data.body.detail} />}
                        {errorPut && <Error message={errorPut.response.data.body.detail} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieForm;