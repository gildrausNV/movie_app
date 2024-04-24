import { render, screen } from '@testing-library/react';
import ActorDetails from '../../Components/ActorDetails';

describe('ActorDetails Component', () => {
  it('should render actor details correctly', () => {
    const actor = {
      firstName: 'Johnny',
      lastName: 'Depp',
      image: 'https://example.com/johnny-depp.jpg',
      dateOfBirth: 'June 9, 1963',
      nationality: 'American',
      placeOfBirth: 'Owensboro, Kentucky',
    };

    const { getByText, getByAltText } = render(<ActorDetails actor={actor} />);

    // Check if actor's name is rendered
    expect(getByText('Johnny')).toBeInTheDocument();
    expect(getByText('Depp')).toBeInTheDocument();

    // Check if actor's image is rendered
    expect(getByAltText('Johnny Depp')).toBeInTheDocument();

    // Check if actor's details are rendered
    expect(getByText('June 9, 1963')).toBeInTheDocument();
    expect(getByText('American')).toBeInTheDocument();
    expect(getByText('Owensboro, Kentucky')).toBeInTheDocument();
  });

  it('should render default icon if image is not provided', () => {
    const actor = {
      firstName: 'Johnny',
      lastName: 'Depp',
    };

    const { getByTestId } = render(<ActorDetails actor={actor} />);

    // Check if default icon is rendered
    expect(getByTestId('default-icon')).toBeInTheDocument();
  });
});
