import { useState } from 'react';
import movie1Image from '../Images/inception.jpg';
// import movie2Image from './inception.jpg';
// import movie3Image from './inception.jpg';
// import movie4Image from './inception.jpg';
// import movie5Image from './inception.jpg';

const useMovieData = () => {
  const [movies, setMovies] = useState([
    {
        name: "Inception",
        releaseDate: "2010-07-16",
        description: "A thief who enters the dreams of others to steal their secrets from their subconscious.",
        image: {movie1Image}
      },
      {
        name: "The Dark Knight",
        releaseDate: "2008-07-18",
        description: "Batman sets out to dismantle the remaining criminal organizations that plague the city streets.",
        image: 'inception.jpg'
      },
      {
        name: "The Shawshank Redemption",
        releaseDate: "1994-10-14",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        image: ''
      },
      {
        name: "Pulp Fiction",
        releaseDate: "1994-10-14",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        image: ''
      },
      {
        name: "The Matrix",
        releaseDate: "1999-03-31",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        image: ''
      }
  ]);

  return { movies };
};

export default useMovieData;