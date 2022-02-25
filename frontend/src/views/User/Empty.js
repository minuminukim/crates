import { Link } from 'react-router-dom';
import './Empty.css';

const Empty = ({ item = '', path = '', children }) => {
  return (
    <div className="empty">
      {item ? <p>No {item} yet.</p> : <p>Nothing to show yet</p>}
      {path && (
        <Link exact to={path}>
          {children}
        </Link>
      )}
    </div>
  );
};

export default Empty;
