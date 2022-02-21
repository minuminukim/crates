import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container not-found">
      <h1>
        <Link to="/">Crates</Link>
      </h1>
      <h2 className="message">
        Sorry, we can't find the page you've requested.
      </h2>
      <p className="message">Perhaps you imagined it?</p>
    </div>
  );
};

export default NotFound;
