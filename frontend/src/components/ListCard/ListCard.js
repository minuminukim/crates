import { Link } from 'react-router-dom';
import { ListSpread } from '.';
import { FaUserCircle } from 'react-icons/fa';
import './ListCard.css';

const ListCard = ({ list, size = 'medium' }) => {
  const albums = list?.albums;

  return (
    <div className={`list-card list-card-${size}`}>
      <ListSpread albums={albums} listID={list.id} gap={30} size={size} />
      <div>
        <div className="list-card-links">
          <Link to={`/lists/${list.id}`} className="list-card-title">
            {list.title}
          </Link>
        </div>
        <div className="list-card links">
          <Link to={`/users/${list.userID}`} className="avatar-link">
            <FaUserCircle className="avatar-link" />
          </Link>
          <Link to={`/users/${list.userID}`} className="user-link">
            {list.User?.username}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
