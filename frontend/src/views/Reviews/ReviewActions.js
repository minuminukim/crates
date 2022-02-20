import { useSelector } from 'react-redux';
import StarRating from '../../components/StarRating';
import { ActionsRow } from '../../components/ActionsPanel';
import './ReviewActions.css';

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
