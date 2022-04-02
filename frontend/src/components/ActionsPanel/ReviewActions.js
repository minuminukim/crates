import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  EditReviewPanel,
  RatingPanel,
  DeleteReviewPanel,
  PostReviewPanel,
  AppendListPanel,
  ListenActions,
} from '.';
import './ReviewActions.css';

const ReviewActions = () => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const reviewBelongsToSessionUser = userID === review?.userID;

  return (
    <ul className="review-actions">
      <ListenActions albumID={review?.albumID} />
      <RatingPanel albumID={review?.albumID} />
      {reviewBelongsToSessionUser && (
        <>
          <EditReviewPanel reviewID={reviewID} albumID={review?.albumID} />
          <DeleteReviewPanel reviewID={+reviewID} />
        </>
      )}
      <PostReviewPanel album={album} />
      <AppendListPanel album={album} />
    </ul>
  );
};

export default ReviewActions;
