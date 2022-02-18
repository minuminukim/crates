import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import ReviewListItem from '../ReviewListItem';
import './ReviewsList.css';

const ReviewsList = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    return dispatch(getReviewsByUserID(+userID))
      .then((reviews) => reviews.filter((review) => (review.userID = userID)))
      .then((filtered) => setReviews(filtered))
      .catch((err) => console.log('ReviewsList error', err));
  }, [dispatch]);

  return (
    reviews.length >= 0 && (
      <ul>
        {reviews.map((review) => (
          <li key={`review-${review.id}`}>
            <ReviewListItem review={review} />
          </li>
        ))}
      </ul>
    )
  );
};

export default ReviewsList;
