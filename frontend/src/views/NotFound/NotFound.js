import error from '../../images/garage.jpeg';
import { Link } from 'react-router-dom';
import handleImageError from '../../utils/handleImageError';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="page-container not-found">
      <h2 className="message">
        Sorry, we can't find the page you've requested.
      </h2>
      <p className="message">Perhaps you imagined it?</p>
      <img
        src={error}
        alt="An evening at Paradise Garage."
        className="error-backdrop"
        onError={handleImageError}
      />
    </div>
  );
};

export default NotFound;
