import { ListSpread } from '../ListCard';
import { FaUserCircle } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './FeedPost.css';

const FeedPost = ({ listID }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const list = useSelector((state) => state.lists.items[listID]);
  const user = useSelector((state) => state.users[list?.userID]);
  return (
    <li className="feed-post">
      <div className="feed-post-left">
        <ListSpread albums={list.albums} listID={listID} />
      </div>
      <div className="feed-post-right">
        <h3>
          <Link className="list-link" to={`/lists/${list.id}`}>
            {list.title}
          </Link>
        </h3>
        <div className="feed-post-info">
          {!userID && (
            <>
              <Link className="avatar-link" to={`/users/${list.userID}`}>
                <FaUserCircle className="avatar icon" />
              </Link>
              <Link className="user-link" to={`/users/${list.userID}`}>
                <span>{user?.username}</span>
              </Link>
            </>
          )}
          <span className="list-length">{`${list.albums.length} ${
            list.albums.length > 1 ? 'albums' : 'album'
          }`}</span>
          {userID && +userID === sessionUser?.id && (
            <Link to={`/lists/${list.id}/edit`}>
              <MdModeEditOutline className="icon edit" />
            </Link>
          )}
        </div>
        <div className={`${list.description ? 'list-body' : 'collapse'}`}>
          <p className="description">{list.description}</p>
        </div>
      </div>
    </li>
  );
};

export default FeedPost;
