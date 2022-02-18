import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import { Modal } from '../../context/Modal';
import EditReviewForm from '../ReviewForm/EditReviewForm';
import ReviewBody from './ReviewBody';
import AlbumArt from '../AlbumArt';
import ReviewActions from './ReviewActions';
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = review?.album;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (review && album) return;
    return dispatch(getSingleReview(+reviewID))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error', data.errors);
        }
      });
  }, [dispatch]);

  return (
    !isLoading && review && (
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
            userID={review?.userID}
            onClick={() => setShowModal(true)}
          />
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditReviewForm
              review={review}
              onSuccess={() => setShowModal(false)}
            />
          </Modal>
        )}
      </div>
    )
  );
};

export default Review;
