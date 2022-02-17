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
  const { items, isLoading } = useSelector((state) => state.reviews);
  const [showModal, setShowModal] = useState(false);
  const review = Object.values(items)?.find((item) => item.id === +reviewID);
  const album = review?.album;

  useEffect(() => {
    if (review) return;
    dispatch(getSingleReview(reviewID));
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="page-container review-page">
        <div>
          <AlbumArt
            title={album.title}
            artworkURL={album.artworkURL}
            size="medium"
          />
        </div>
        <div className="review-page-middle">
          <ReviewBody review={review} />
        </div>
        <div>
          <ReviewActions onClick={() => setShowModal(true)} />
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditReviewForm review={review} />
          </Modal>
        )}
      </div>
    )
  );
};

export default Review;
