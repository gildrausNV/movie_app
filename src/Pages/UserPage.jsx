import './Style/UserPage.css';
import { FaUserAlt } from "react-icons/fa";
import Movie from '../Components/Movie';
import useFetchData from '../customHooks/useFetchData';
import { memo, useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import Loading from '../Components/Loading';
import Error from '../Components/Error';

const MemoizedMovie = memo(Movie);

const UserPage = () => {
    const { data, error, loading, refetchData } = useFetchData("https://movieappbackend-production-422b.up.railway.app/users/watchlist");

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error message={error.response.data.body.detail}/>;
    }

    return (
        <div className="user-page">
            <div className="user-info">
                <div className="user-details">
                    <div className="user-image-container">
                        {data && data?.user?.avatar !== "" ? <img src={data?.user.avatar} alt="" className='user-avatar'/> : <FaUserAlt className='user-picture' />}
                    </div>
                    <div className="user-name">
                        <h2>{data?.user?.firstName} {data?.user?.lastName}</h2>
                    </div>
                </div>
            </div>
            <div className="watchlist-container">
                <h1>My watchlist</h1>
                <div className="watchlist">
                    {data?.movies?.map((movie) => (
                        <MemoizedMovie movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default UserPage;
