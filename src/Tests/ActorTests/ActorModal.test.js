import { render, screen } from '@testing-library/react';
import ActorModal from '../../Components/ActorModal';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('ActorModal Component', () => {
  const actor = {
    id: '1',
    firstName: 'Johnny',
    lastName: 'Depp',
  };

  it('renders actor modal correctly', () => {
    const handleClose = jest.fn();
    render(
      <BrowserRouter>
        <ActorModal open={true} onClose={handleClose} actor={actor} />
      </BrowserRouter>
    );

    expect(screen.getByText('Johnny Depp')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Visit page' })).toBeInTheDocument();
  });

  it('navigates to actor details page when visit page button is clicked', () => {
    const handleClose = jest.fn();
    const navigate = jest.fn();
    
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);
    
    render(
      <BrowserRouter>
        <ActorModal open={true} onClose={handleClose} actor={actor} />
      </BrowserRouter>
    );

    screen.getByRole('button', { name: 'Visit page' }).click();

    expect(navigate).toHaveBeenCalledWith('/actorDetails/1');
  });


});
