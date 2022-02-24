import { Link } from 'react-router-dom';

const Empty = ({ item = '', path = '', children }) => {
  return (
    <div>
      <p>No {item} yet.</p>
      {path && (
        <Link exact to={path}>
          {children}
        </Link>
      )}
    </div>
  );
};

export default Empty;
