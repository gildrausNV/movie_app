import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Movie from '../../Components/Movie';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('Movie Component', () => {
  const movie = {
    id: '1',
    image: 'movie-poster-url',
  };

  it('should render movie poster', () => {
    render(
      <MemoryRouter>
        <Movie movie={movie} />
      </MemoryRouter>
    );

    const moviePoster = screen.getByAltText('');
    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster).toHaveAttribute('src', 'movie-poster-url');
  });

  it('should navigate to movie details page when clicking on the movie poster', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
  
    render(
      <MemoryRouter>
        <Movie movie={movie} />
      </MemoryRouter>
    );
  
    const moviePoster = screen.getByAltText('');
    fireEvent.click(moviePoster);
  
    expect(navigate).toHaveBeenCalledWith('/movieDetails/1');
  });
});
