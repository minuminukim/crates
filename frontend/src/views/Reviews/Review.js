import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import {
  ReviewActions,
  AppendList,
  ActionsRow,
} from '../../components/ActionsPanel';
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
  const album = review?.album;
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // if (review && album) return;
    (async () => {
      try {
        const review = await dispatch(getSingleReview(+reviewID));

        if (!sessionUser) {
          return;
        }
        // fetching the session user here to set rating state for the action panel
        const { reviews } = await dispatch(fetchSingleUser(sessionUser?.id));
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
          {!isLoading && sessionUser ? (
            <ReviewActions
              review={review}
              rating={rating}
              album={album}
              key={rating}
              userID={review?.userID}
              onDelete={handleDelete}
            />
          ) : (
            <>
              <LoginFormModal>
                {(toggleModal) => (
                  <ActionsRow
                    className="solo logged-off hover"
                    label="Sign in to log, rate or review"
                    onClick={toggleModal}
                  />
                )}
              </LoginFormModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
