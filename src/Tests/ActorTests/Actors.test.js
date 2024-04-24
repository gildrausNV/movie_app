import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Actors from '../../Components/Actors';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('Actors Component', () => {
  const actors = [
    {
      id: 1,
      firstName: 'Johnny',
      lastName: 'Depp',
      image: 'https://example.com/johnny-depp.jpg',
    },
    {
      id: 2,
      firstName: 'Tom',
      lastName: 'Cruise',
      image: 'https://example.com/tom-cruise.jpg',
    },
  ];

  it('renders actors correctly', () => {
    render(
      <BrowserRouter>
        <Actors actors={actors} />
      </BrowserRouter>
    );

    // Check if actors are rendered
    expect(screen.getAllByRole('img')).toHaveLength(2);

    // Check if actor names are rendered
    expect(screen.getByText('Johnny Depp')).toBeInTheDocument();
    expect(screen.getByText('Tom Cruise')).toBeInTheDocument();
  });

  it('navigates to actor details page when an actor is clicked', () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Actors actors={actors} />
      </BrowserRouter>
    );

    // Simulate clicking on an actor
    screen.getByText('Johnny Depp').click();

    // Check if navigate function is called with correct path
    expect(navigate).toHaveBeenCalledWith('/actorDetails/1');
  });
});
