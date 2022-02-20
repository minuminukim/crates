import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import { fetchSingleAlbumFromDB } from '../../store/albumsReducer';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import ReviewForm from './ReviewForm';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import ReviewActions from './ReviewActions';
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = review?.album;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // if (review && album) return;
    return dispatch(getSingleReview(+reviewID))
      .then((review) => setRating(review.rating))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error', data.errors);
        }
      });
  }, [dispatch]);

  return (
    !isLoading &&
    review && (
      <div className="page-container review-page">
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
          <ReviewActions
            rating={rating}
            userID={review?.userID}
            onEditClick={() => setShowEditModal(true)}
            onPostClick={() => setShowPostModal(true)}
          />
        </div>
        {showEditModal && (
          <Modal onClose={() => setShowEditModal(false)}>
            <EditReviewForm
              review={review}
              album={album}
              onSuccess={() => setShowEditModal(false)}
            />
          </Modal>
        )}
        {showPostModal && (
          <Modal onClose={() => setShowPostModal(false)}>
            <ReviewForm album={album} />
          </Modal>
        )}
      </div>
    )
  );
};

export default Review;
