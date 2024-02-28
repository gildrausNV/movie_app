import { Paper, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFetchData from "../customHooks/useFetchData";


const MoviePaper = ({ movie }) => {
    const navigate = useNavigate();
    const { data: rating } = useFetchData("https://movieappbackend-production-422b.up.railway.app/reviews/rating/" + movie.id);


    return (
        <div className="movie" key={movie.id} onClick={() => navigate('/movieDetails/' + movie.id)}>
            <Paper className="movie-paper" style={{ backgroundImage: `url(${movie.image})` }}>
                <div className="overlay">
                    <h2 className="title">{movie.title}</h2>
                    <p className="release-date">{movie.releaseDate}</p>
                    <Rating
                            name="simple-controlled"
                            value={rating}
                            readOnly
                        />
                </div>
            </Paper>
        </div>
    );
}

export default MoviePaper;