import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import './Review.css';

const ReviewBody = ({ review }) => {
  return (
    <div className="review-body">
      <div>
        {`Listened ${review.listenedDate}`}
        {review.rating}
        {review.body}
      </div>
    </div>
  );
};

const Review = () => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const { items, isLoading } = useSelector((state) => state.reviews);
  const review = Object.values(items)?.find((item) => item.id === +reviewID);

  useEffect(() => {
    if (review) return;
    dispatch(getSingleReview(reviewID));
  }, [dispatch]);
  // const review = useSelector((state) => state.reviews);
  return (
    !isLoading && (
      <div className="page-container review-page">
        <div></div>
        <div>
          <ReviewBody review={review} />
        </div>
        <div></div>
      </div>
    )
  );
};

export default Review;
