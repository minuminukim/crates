import { ListSpread } from '../ListCard';
import { FaUserCircle } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './FeedPost.css';

const FeedPost = ({ list }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

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
          {!userID && (
            <>
              <FaUserCircle />
              <span>{list.User.username}</span>
            </>
          )}
          <span>{`${list.albums.length} albums`}</span>
          {userID && +userID === sessionUser?.id && (
            <Link exact to={`/lists/${list.id}/edit`}>
              <MdModeEditOutline className="icon" />
            </Link>
          )}
        </div>
        <div>
          <p className="description">{list.description}</p>
        </div>
      </div>
    </li>
  );
};

export default FeedPost;
