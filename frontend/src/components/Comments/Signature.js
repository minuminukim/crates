import { Link } from 'react-router-dom';
import { FaUserCircle, FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { EditCommentModal } from '.';

const Signature = ({ userID, username, body, onEdit, commentID }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const isSessionUser = userID === sessionUser?.id;

  return (
    <div className="signature comment">
      <div>
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
            <EditCommentModal onEdit={onEdit} body={body} commentID={commentID}>
              {(toggleModal) => (
                <MdModeEditOutline
                  className="comment-icon edit"
                  onClick={toggleModal}
                />
              )}
            </EditCommentModal>
            <FaTrash className="comment-icon delete" />
          </span>
        )}
      </div>
    </div>
  );
};

export default Signature;
