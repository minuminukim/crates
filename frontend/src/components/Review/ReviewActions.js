import { useSelector } from 'react-redux';
import StarRating from '../StarRating';
import './ReviewActions.css';

const ActionsRow = ({ label, onClick, children = null, className }) => {
  return (
    <li className={`actions-row ${className}`} onClick={onClick}>
      <p>{label}</p>
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
            className="action-row-rated"
            label="Rated"
            children={<StarRating reviewRating={rating} readOnly={true} />}
          />
          <ActionsRow
            className="hover"
            label="Edit or delete this review..."
            onClick={onEditClick}
          />
        </>
      )}
      <ActionsRow
        label="Review or log again..."
        onClick={onPostClick}
        className="hover"
      />
      <ActionsRow label="Add this album to lists..." className="hover" />
    </ul>
  );
};

export default ReviewActions;
