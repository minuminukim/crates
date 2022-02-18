import { useSelector } from 'react-redux';
import StarRating from '../StarRating';
import './ReviewActions.css';

const ActionsRow = ({ label, onClick, children = null }) => {
  return (
    <li className="actions-row" onClick={onClick}>
      {label}
      {children}
    </li>
  );
};

const ReviewActions = ({ userID, onEditClick, onPostClick, rating }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="review-actions">
      <li className="actions-row"></li>
      {sessionUser.id === userID && (
        <>
          <ActionsRow
            label="Rated"
            children={<StarRating reviewRating={rating % 2} />}
          />
          <ActionsRow
            label="Edit or delete this review..."
            onClick={onEditClick}
          />
        </>
      )}
      <ActionsRow label="Review or log again..." onClick={onPostClick} />
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
