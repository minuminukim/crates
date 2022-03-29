import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CommentIcon from './CommentIcon';
import { WarningMessageModal } from '../WarningMessage';
import { deleteComment } from '../../store/commentsReducer';

const DeleteCommentIcon = ({ commentID, reviewID }) => {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleDelete = () => {
    if (isLoading) return;
    setLoading(true);
    dispatch(deleteComment(commentID, reviewID))
      .then(() => {
        setLoading(false);
        setShowInfo(false);
      })
      .catch((error) =>
        console.log(`Error deleting comment ${commentID}`, error)
      );
  };

  useEffect(() => {
    return () => {
      setLoading(false);
      setShowInfo(false);
    };
  }, []);

  return (
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
          onMouseOver={() => setShowInfo(true)}
          onMouseOut={() => setShowInfo(false)}
          showInfo={showInfo}
        />
      )}
    </WarningMessageModal>
  );
};

export default DeleteCommentIcon;
