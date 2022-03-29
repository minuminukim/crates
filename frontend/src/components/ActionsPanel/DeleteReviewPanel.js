import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteReview } from '../../store/reviewsReducer';
import { WarningMessageModal } from '../WarningMessage';
import ActionsRow from './ActionsRow';

const DeleteReviewPanel = ({ reviewID }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userID = useSelector((state) => state.session.user?.id);

  const handleDelete = () => {
    dispatch(deleteReview(reviewID, userID)).then(
      () => history.push('/'),
      (error) => console.error('Error deleting review', error)
    );
  };

  return (
    <WarningMessageModal
      onDelete={handleDelete}
      item="review"
      itemID={reviewID}
    >
      {(toggleWarning) => (
        <ActionsRow
          className="hover"
          label="Delete this review..."
          onClick={toggleWarning}
        />
      )}
    </WarningMessageModal>
  );
};

export default DeleteReviewPanel;
