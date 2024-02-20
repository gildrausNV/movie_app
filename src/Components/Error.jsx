import { FaExclamationTriangle } from 'react-icons/fa';

const Error = ({ message }) => {
  return (
    <div className="error">
      <FaExclamationTriangle className="error-icon" />
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;
