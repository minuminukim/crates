import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleReview } from '../../store/reviewsReducer';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import { ReviewActions } from '../../components/ActionsPanel';
import { deleteReview } from '../../store/reviewsReducer';
import { CommentSection } from '../../components/Comments';
import LoginPanel from '../../components/ActionsPanel/LoginPanel';
import './Review.css';
import { fetchSingleAlbum } from '../../store/albumsReducer';

const Review = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const user = useSelector((state) => state.session.user);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (review) {
      if (!album) {
        setLoading(true);
        dispatch(fetchSingleAlbum(review.albumID))
          .then(() => setLoading(false))
          .catch((error) => console.log('error fetching album', error));
      } else {
        setLoading(false);
        return;
      }
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
    dispatch(deleteReview(+reviewID, user?.id)).then(
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
            {user ? <ReviewActions onDelete={handleDelete} /> : <LoginPanel />}
          </section>
        </div>
      );
};

export default Review;
