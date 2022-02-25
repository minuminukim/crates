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
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const sessionUser = useSelector((state) => state.session.user);
  // const album = review?.album;
  const album = useSelector(
    (state) => state.albums.items[review?.album?.spotifyID]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    (async () => {
      if (!sessionUser) {
        setIsLoading(false);
        return;
      }
      try {
        const [review, { reviews }] = await Promise.all([
          dispatch(getSingleReview(+reviewID)),
          dispatch(fetchSingleUser(sessionUser?.id)),
        ]);
        const found = reviews.find((item) => item.albumID === review.albumID);
        setRating(found?.rating || 0);
        setIsLoading(false);
      } catch (res) {
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
  return !review ? null : (
    <div className="page-container review-page">
      <div className="content-wrapper">
        <div>
          <AlbumArt
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </div>
        <div className="review-page-middle">
          <ReviewBody review={review} album={album} />
        </div>
        <div>
          {sessionUser && !isLoading ? (
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
        </div>
      </div>
    </div>
  );
};

export default Review;
