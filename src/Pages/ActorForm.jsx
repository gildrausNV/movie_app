import { useParams } from "react-router-dom";
import useFetchData from "../customHooks/useFetchData";
import { useEffect, useState } from "react";
import './Style/ActorForm.css';
import usePostData from "../customHooks/usePostData";
import usePutData from "../customHooks/usePutData";

const ActorForm = () => {
    const { actorId } = useParams();
    const [actorData, setActorData] = useState({
        firstName: '',
        lastName: '',
        image: '',
        dateOfBirth: '',
        placeOfBirth: ''
    });

    const { data: actor, loading, error } = useFetchData("https://movieappbackend-production-422b.up.railway.app/actors/" + actorId);
    const { postData } = usePostData();
    const { updateData } = usePutData(); 

    useEffect(() => {
        if (actor) {
            setActorData(actor);
        }
    }, [actor])

    const handleSubmit = () => {
        console.log(actorData);
        if(actorId){
            updateData("https://movieappbackend-production-422b.up.railway.app/actors/" + actorId, actorData);
        }
        else{
            postData("https://movieappbackend-production-422b.up.railway.app/actors", actorData);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActorData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-actor-container">
                    <div className="input-container">
                        <label htmlFor="">First name:</label>
                        <input type="text" name='firstName' value={actorData?.firstName} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Last name:</label>
                        <input type="text" name='lastName' value={actorData?.lastName} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Date of birth:</label>
                        <input type="text" name='dateOfBirth' value={actorData?.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Place of birth:</label>
                        <input type="text" name='placeOfBirth' value={actorData?.placeOfBirth} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="">Nationality:</label>
                        <input type="text" name='nationality' value={actorData?.nationality} onChange={handleChange} />
                    </div>
                    <div className="input-container">
                            <div className="input-container">
                                <label htmlFor="">Image:</label>
                                <input type="text" name='image' value={actorData?.image} onChange={handleChange} />
                            </div>
                    </div>
                    <div className="button-container">
                        <button type='button' onClick={() => handleSubmit()}>Save changes</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ActorForm;