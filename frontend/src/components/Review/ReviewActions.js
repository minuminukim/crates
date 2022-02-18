import { useSelector } from 'react-redux';
import StarRating from '../StarRating';
import './ReviewActions.css';

const ActionsRow = ({ label, onClick }) => {
  return (
    <li className="actions-row" onClick={onClick}>
      {label}
    </li>
  );
};

const ReviewActions = ({ userID, onClick }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <ul className="review-actions">
      <li className="actions-row"></li>
      <li className="actions-row">
        <StarRating />
      </li>
      {sessionUser.id === userID && (
        <ActionsRow label="Edit or delete this review..." onClick={onClick} />
      )}
      <ActionsRow label="Review or log again..." />
      <ActionsRow label="Add this album to lists..." />
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm review={review} />
        </Modal>
      )} */}
    </ul>
  );
};

export default ReviewActions;
