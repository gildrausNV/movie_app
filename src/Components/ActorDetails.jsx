import { FaUser } from "react-icons/fa";

const ActorDetails = ({ actor }) => {
  return (
    <div className="actor-details-header">
      <div className="header-info-container">
        <div className="actor-title">
          <div className="actor-details-image">
            {actor?.image ? (
              <img src={actor.image} alt={`${actor.firstName} ${actor.lastName}`} className="actor-card" />
            ) : (
              <FaUser className="actor-card" data-testid="default-icon" />
            )}
          </div>
          <div className="actor-title-name">
            <div className="actor-firstname">{actor?.firstName}</div>
            <div className="actor-lastname">{actor?.lastName}</div>
          </div>
        </div>
        <div className="actor-info">
          <div className="input-container">
            <label htmlFor="">Born:</label>
            <div>{actor?.dateOfBirth}</div>
          </div>
          <div className="input-container">
            <label htmlFor="">Nationality:</label>
            <div>{actor?.nationality}</div>
          </div>
          <div className="input-container">
            <label htmlFor="">Place of birth:</label>
            <div>{actor?.placeOfBirth}</div>
          </div>
          <div className="input-container">
            <label htmlFor="">IMDB:</label>
            <div>
              <a href="https://www.imdb.com/name/nm0000138/" target="_blank" rel="noopener noreferrer">
                https://www.imdb.com/name/nm0000138/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
