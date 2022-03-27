import { Link } from 'react-router-dom';
import { ListSpread } from '.';
import { FaUserCircle } from 'react-icons/fa';
import './ListCard.css';
import { useSelector } from 'react-redux';

const ListCard = ({ listID, size = 'medium' }) => {
  const list = useSelector((state) => state.lists.items[listID]);
  const user = useSelector((state) => state.users[list?.userID]);

  return (
    <div className={`list-card list-card-${size}`}>
      <ListSpread listID={listID} gap={30} size={size} />
      <div>
        <div className="list-card-links">
          <Link to={`/lists/${listID}`} className="list-card-title">
            {list.title}
          </Link>
        </div>
        <div className="list-card links">
          <Link to={`/users/${list.userID}`} className="avatar-link">
            <FaUserCircle className="avatar-link" />
          </Link>
          <Link to={`/users/${list.userID}`} className="user-link">
            {user?.username}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
