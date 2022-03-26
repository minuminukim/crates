import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleReview } from '../../store/reviewsReducer';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import { ReviewActions, ActionsRow } from '../../components/ActionsPanel';
import { deleteReview } from '../../store/reviewsReducer';
import LoginFormModal from '../../components/LoginFormModal';
import { CommentSection } from '../../components/Comments';
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);
  const rating = useSelector((state) => {
    if (!sessionUser) return 0;
    const reviews = state.reviews.items;

    // Iterate over the current user's reviews and find a review
    // associated with the current view's album
    const userReviews = state.users[sessionUser.id].reviews;
    const found = userReviews.find(
      (id) => reviews[id].albumID === review?.albumID
    );
    return found ? reviews[found].rating : 0;
  });

  useEffect(() => {
    if (review) {
      setLoading(false);
      return;
    }

    dispatch(fetchSingleReview(+reviewID)).then(
      () => setLoading(false),
      (error) => {
        console.log(`Error fetching review ${reviewID}`, error);
        if (error.status === 404) {
          history.push('/not-found');
        }
      }
    );
  }, [dispatch, reviewID]);

  const handleDelete = () => {
    dispatch(deleteReview(+reviewID)).then(
      () => history.push('/'),
      (error) => console.error('Error deleting review', error)
    );
  };

  // return null when review doesn't exist after dispatching a delete action
  return !review
    ? null
    : !isLoading && (
        <div className="content-wrapper content-review">
          <section className="review-page-left">
            <div className="left-col-1">
              <AlbumArt albumID={review.albumID} size="review" />
            </div>
            <div className="review-page-middle">
              <ReviewBody />
            </div>
            <CommentSection />
          </section>
          <section className="review-page-right">
            {sessionUser ? (
              <ReviewActions
                rating={rating}
                key={rating}
                userID={review?.userID}
                onDelete={handleDelete}
              />
            ) : (
              <LoginFormModal>
                {(toggleModal) => (
                  <ActionsRow
                    className="solo logged-off hover"
                    label="Sign in to log, rate or review"
                    onClick={toggleModal}
                  />
                )}
              </LoginFormModal>
            )}
          </section>
        </div>
      );
};

export default Review;
