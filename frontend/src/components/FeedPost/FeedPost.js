import { ListSpread } from '../ListCard';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FeedPost.css';

const FeedPost = ({ list }) => {
  return (
    <li className="feed-post">
      <div>
        <ListSpread albums={list.albums} listID={list.id} />
      </div>
      <div className="feed-post-right">
        <h3>
          <Link to={`/lists/${list.id}`}>{list.title}</Link>
        </h3>
        <div>
          <FaUserCircle />
          <span>{list.User.username}</span>
          <span>{`${list.albums.length} albums`}</span>
        </div>
        <div>
          <p className="description">{list.description}</p>
        </div>
      </div>
    </li>
  );
};

export default FeedPost;
