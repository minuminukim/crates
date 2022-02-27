import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import { ReviewActions, ActionsRow } from '../../components/ActionsPanel';
import { fetchSingleUser } from '../../store/usersReducer';
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
  // const [review, setReview] = useState(null);
  const user = useSelector((state) => state.users[review?.userID]);
  const albums = useSelector((state) => state.albums.items);
  const album = Object.values(albums)?.find(
    (album) => review?.albumID === album.id
  );

  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  // const [message, setMessa]

  useEffect(() => {
    (async () => {
      try {
        const review = await dispatch(getSingleReview(+reviewID));
        // setReview(review);
        if (review.userID !== sessionUser?.id) {
          await dispatch(fetchSingleUser(review.userID));
        }

        if (sessionUser) {
          const { reviews } = await dispatch(fetchSingleUser(sessionUser.id));
          const found = reviews?.find(
            (item) => item.albumID === review.albumID
          );

          setRating(found?.rating || 0);
        }

        setIsLoading(false);
      } catch (res) {
        if (res?.status === 404) {
          history.push('/not-found');
        }

        const data = await res.json();
        if (data && data.errors) {
          console.log('error', data.errors);
        }
      }
    })();
    return () => setRating(0);
  }, [dispatch, sessionUser, reviewID]);

  const handleDelete = () => {
    return dispatch(deleteReview(+reviewID))
      .then(() => history.push('/'))
      .catch((err) => console.log('error deleting review', err));
  };

  // return null when review doesn't exist after dispatching a delete action
  return !review
    ? null
    : !isLoading && (
        <div className="content-wrapper content-review">
          <section className="review-page-left">
            <div className="left-col-1">
              <AlbumArt
                title={review.album?.title}
                artworkURL={review.album?.artworkURL}
                size="review"
              />
            </div>
            <div className="review-page-middle">
              <ReviewBody
                review={review}
                album={review.album}
                user={user}
                rating={rating}
              />
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
        // </div>
      );
};

export default Review;
