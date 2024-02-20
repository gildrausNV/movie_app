import './Style/UserPage.css';
import icon from './Icons/person.png';
import { FaUserAlt } from "react-icons/fa";
import Movie from '../Components/Movie';
import useFetchData from '../customHooks/useFetchData';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const UserPage = () => {
    const { user } = useAuth();
    const { data, error, loading, refetchData } = useFetchData("http://localhost:8080/users/watchlist", user.token);

    useEffect(() => {
        console.log("TEST: " + loading);
    }, [loading])

    return (
        <div className="user-page">
            <div className="user-info">
                <div className="user-details">
                    <div className="user-image-container">
                        <FaUserAlt className='user-picture' />
                    </div>
                    <div className="user-name">
                        <h2>{data?.user.firstName} {data?.user.lastName}</h2>
                    </div>
                </div>
            </div>
            <div className="watchlist-container">
                <h1>My watchlist</h1>
                <div className="watchlist">

                    {data?.movies?.map((movie) => (
                        <Movie movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserPage;