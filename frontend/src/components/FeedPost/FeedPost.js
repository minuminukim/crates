import { ListSpread } from '../ListCard';
import { FaUserCircle } from 'react-icons/fa';
import './FeedPost.css';

const FeedPost = ({ list }) => {
  return (
    <li className="feed-post">
      <div><ListSpread albums={list.albums} listID={list.id} /></div>
      <div>
        <h3>{list.title}</h3>
        <div>
          <FaUserCircle />
          <span>{list.User.username}</span>
          <span>{list.albums.length}</span>
        </div>
        <div>
          <p className="description">{list.description}</p>
        </div>
      </div>
    </li>
  );
};

export default FeedPost;
