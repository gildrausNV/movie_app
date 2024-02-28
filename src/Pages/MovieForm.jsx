import { useNavigate, useParams } from 'react-router-dom';
import './Style/MovieForm.css';
import useFetchData from '../customHooks/useFetchData';
import usePutData from '../customHooks/usePutData';
import usePostData from '../customHooks/usePostData';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { memo, useEffect, useState } from 'react';
import ActorsModal from '../Components/ActorsModal';
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
            };

        if (movieId) {
            await updateData('https://movieappbackend-production-422b.up.railway.app/movies/' + movieId, updatedMovie);
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

    const [showActorsModal, setShowActorsModal] = useState(false);

    const handleToggleActorsModal = () => {
        setShowActorsModal(!showActorsModal);
    };

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

    const handleAddRole = async () => {
        if(roles && roles.length > 0){
            setRoles(prevRoles => [...prevRoles, role]);
        }
        else{
            setRoles([role]);
        }
    };

    if (loading || loadingPost || loadingPut) {
        return <Loading />
    }

    if (error && movieId) {
        return <Error message={error.message} />
    }

    return (
        <div className="edit-movie-page">
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="image-container">
                    {movie?.image !== "" && <img src={movie?.image} alt={movie?.title} className='poster' />}
                </div>
                <div className="input-movie-container">
                    <div className="input-container">
                        <label htmlFor="">Title:</label>
                        <input type="text" name='title' value={movie?.title} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Date:</label>
                        <input type="text" name='releaseDate' value={movie?.releaseDate} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Description:</label>
                        <textarea type="text" name='description' value={movie?.description} onChange={handleChange} />
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
                        <div className="input-box-modal">
                            <label htmlFor="">Role:</label>
                            <input type="text" name="role" id="roleName" onChange={handleRoleInputChange} value={role?.role} />
                            <button className="add-button" onClick={handleAddRole} type='button'>Add role</button>
                        </div>
                        
                    </div>

                    <div className="button-container">
                        <button className='actors-modal' type="button" onClick={handleToggleActorsModal}>Create new actor</button>
                        <button type='button' onClick={() => handleSubmit()}>Save changes</button>
                    </div>
                </div>
            </form>
            <MemoizedRoles roles={roles}/>
            <ActorsModal open={showActorsModal} onClose={handleToggleActorsModal} />
        </div>
    );
}

export default MovieForm;