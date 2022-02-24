import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarRating from '../StarRating';
import { ActionsRow } from '.';
import './ReviewActions.css';
import ListenActions from './ListenActions';
import { EditReviewModal } from '../../views/Reviews';
import { WarningMessageModal } from '../WarningMessage';

const ReviewActions = ({
  userID,
  onPostClick,
  onListClick,
  onDelete,
  rating,
  album,
  review,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const isSessionUser = sessionUser?.id === userID;
  const { reviewID } = useParams();

  return sessionUser ? (
    <ul className="review-actions">
      <ListenActions album={album} />
      <ActionsRow
        className="action-row-rated"
        label={rating ? 'Rated' : 'Rate'}
        key={reviewID}
        onClick={onPostClick}
      >
        <StarRating reviewRating={rating} readOnly={true} />
      </ActionsRow>
      {isSessionUser && (
        <>
          <EditReviewModal review={review} album={album}>
            {(toggleEditModal) => (
              <ActionsRow
                className="hover"
                label="Edit or delete this review..."
                onClick={toggleEditModal}
              />
            )}
          </EditReviewModal>
          <WarningMessageModal onDelete={onDelete} item="review">
            {(toggleWarning) => (
              <ActionsRow
                className="hover"
                label="Delete this review..."
                onClick={toggleWarning}
              />
            )}
          </WarningMessageModal>
        </>
      )}
      <ActionsRow
        label="Review or log..."
        onClick={onPostClick}
        className="hover"
      />
      <ActionsRow
        label="Add this album to a list..."
        className="hover"
        onClick={onListClick}
      />
    </ul>
  ) : (
    <ActionsRow className="solo" label="Sign in to log, rate or review" />
  );
};

export default ReviewActions;
