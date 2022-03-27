import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ActionsRow } from '.';
import './ReviewActions.css';
import { EditReviewModal, PostReviewModal } from '../../views/Reviews';
import { WarningMessageModal } from '../WarningMessage';
import { ListenActions, AppendListModal } from '.';
import RatingPanel from './RatingPanel';
import LoginPanel from './LoginPanel';

const ReviewActions = ({ onDelete }) => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const isSessionUser = userID === review?.userID;

  return (
    <ul className="review-actions">
      <ListenActions albumID={review?.albumID} />
      <RatingPanel albumID={review?.albumID} />

      {isSessionUser && (
        <>
          <EditReviewModal
            review={review}
            reviewID={reviewID}
            albumID={album?.id}
            album={album}
          >
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
      <PostReviewModal album={album} albumID={album?.id}>
        {(togglePostModal) => (
          <ActionsRow
            label="Review or log..."
            onClick={togglePostModal}
            className="hover"
          />
        )}
      </PostReviewModal>
      <AppendListModal album={album} albumID={album?.id}>
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
