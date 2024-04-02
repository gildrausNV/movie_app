import { memo } from "react";
import Error from "./Error";
import MoviePaper from './MoviePaper';

const MemoizedMoviePaper = memo(MoviePaper);

const Movies = ({movies}) => {
    return ( 
        <>
            {movies && movies?.length !== 0 ? (movies && movies.map((movie, index) => (
                    <MemoizedMoviePaper movie={movie} key={movie.id} />
                ))) : <Error message={"Sorry, no movies found"} />}
        </>
     );
}
 
export default Movies;