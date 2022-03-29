import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { EditCommentModal, DeleteCommentIcon } from '.';

const Signature = ({ userID, commentID, reviewID }) => {
  const username = useSelector((state) => state.users[userID]?.username);
  const sessionUserID = useSelector((state) => state.session.user?.id);
  const isSessionUser = userID === sessionUserID;

  return (
    <div className="signature-comment">
      <div className="avatar-link">
        <Link className="avatar-link" to={`/users/${userID}`}>
          <FaUserCircle className="avatar-link" />
        </Link>
      </div>
      <div className="signature right">
        <Link className="user-link" to={`/users/${userID}`}>
          {username}
        </Link>
        {isSessionUser && (
          <span className="tools">
            <EditCommentModal commentID={commentID} />
            <DeleteCommentIcon commentID={commentID} reviewID={reviewID} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Signature;
