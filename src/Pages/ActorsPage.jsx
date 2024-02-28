import { useEffect, useState } from 'react';
import useFetchPaginationData from '../customHooks/useFetchPaginationData';
import './Style/ActorsPage.css';
import { GrPrevious, GrNext } from "react-icons/gr";
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { FaUser } from 'react-icons/fa';

const ActorsPage = () => {
    const [page, setPage] = useState(0);
    const pageSize = 6;
    const { data: actors, totalPages, loading, error, updateParams } = useFetchPaginationData("https://movieappbackend-production-422b.up.railway.app/actors", { size: pageSize, page: page });

    const handleNextPage = () => {
        if (page + 1 < totalPages) {
            setPage(currentPage => currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(currentPage => currentPage - 1);
        }
    }

    useEffect(() => {
        updateParams({ size: pageSize, page });
    }, [page])

    if(error){
        return <Error message={error.message}/>
    }

    if(loading){
        return <Loading />
    }

    return (
        <>
            <div className="pagination">
                <GrPrevious className='pagination-button' onClick={handlePrevPage} />
            </div>
            <div className="actors-page">

                {actors && actors.map((actor) => (
                    <div className="actor" key={actor.id}>
                        {actor.image ? <img src={actor.image} alt="" className='actor-card' /> : <FaUser className='actor-card'/>}
                        <div className="info">
                            {actor.firstName} {actor.lastName}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <GrNext className='pagination-button' onClick={handleNextPage} />
            </div>
        </>

    );
}

export default ActorsPage;
