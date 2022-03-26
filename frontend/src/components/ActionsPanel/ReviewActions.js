import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StarRating from '../StarRating';
import { ActionsRow } from '.';
import './ReviewActions.css';
import { EditReviewModal, PostReviewModal } from '../../views/Reviews';
import { WarningMessageModal } from '../WarningMessage';
import { ListenActions, AppendListModal } from '.';

const ReviewActions = ({ onDelete, rating }) => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const isSessionUser = userID === review?.userID;

  return (
    <ul className="review-actions">
      <ListenActions album={album} albumID={review?.albumID} />
      <ActionsRow
        className="action-row-rated"
        label={rating ? 'Rated' : 'Not Rated'}
        key={reviewID}
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
          <WarningMessageModal
            onDelete={onDelete}
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
        </>
      )}
      <PostReviewModal album={album}>
        {(togglePostModal) => (
          <ActionsRow
            label="Review or log..."
            onClick={togglePostModal}
            className="hover"
          />
        )}
      </PostReviewModal>
      <AppendListModal album={album}>
        {(toggleListModal) => (
          <ActionsRow
            label="Add this album to a list..."
            className="hover"
            onClick={toggleListModal}
          />
        )}
      </AppendListModal>
    </ul>
  );
};

export default ReviewActions;
