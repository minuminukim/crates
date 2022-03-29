import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { WarningMessageModal } from '../WarningMessage';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteComment } from '../../store/commentsReducer';
import { EditCommentModal } from '.';
import { CommentIcon } from '.';

const Signature = ({
  userID,
  reviewID,
  username,
  body,
  onEdit,
  commentID,
  onDelete,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const isSessionUser = userID === sessionUser?.id;
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    (async () => {
      try {
        // dispatch delete action
        await dispatch(deleteComment(commentID, reviewID));
        // update parent's state
        onDelete(commentID);
      } catch (res) {
        return res;
      }
    })();
  };

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
            <EditCommentModal onEdit={onEdit} body={body} commentID={commentID}>
              {(toggleModal) => (
                <CommentIcon
                  text="Edit Comment"
                  type="edit"
                  onClick={toggleModal}
                  onMouseOver={() => setShowEdit(true)}
                  onMouseOut={() => setShowEdit(false)}
                  showInfo={showEdit}
                />
              )}
            </EditCommentModal>
            <WarningMessageModal
              onDelete={handleDelete}
              item="comment"
              itemID={commentID}
            >
              {(toggleWarning) => (
                <CommentIcon
                  text="Delete comment"
                  type="delete"
                  onClick={toggleWarning}
                  onMouseOver={() => setShowDelete(true)}
                  onMouseOut={() => setShowDelete(false)}
                  showInfo={showDelete}
                />
              )}
            </WarningMessageModal>
          </span>
        )}
      </div>
    </div>
  );
};

export default Signature;
