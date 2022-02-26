import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Comment = ({ comment }) => {
  return (
    <li className="comment">
      <div>
        <Link className="avatar-link" to={`/users/${comment.userID}`}>
          <FaUserCircle />
        </Link>
        <Link className="user-link" to={`/users/${comment.userID}`}>
          {comment.username}
        </Link>
      </div>
      <div>
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
