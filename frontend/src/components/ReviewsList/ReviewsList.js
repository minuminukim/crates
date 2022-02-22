import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewsByUserID, getReviews } from '../../store/reviewsReducer';
import { sortByRecent } from '../../utils/sorts';
import ReviewListItem from '../ReviewListItem';
import './ReviewsList.css';

const ReviewsList = ({ className = null }) => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  // const { items } = useSelector((state) => state.reviews);

  const filterByUserID = (reviews) =>
    reviews.filter((review) => review.userID === +userID);

  // just slicing 6 for now because current db schema doesn't have any
  // sort of popularity metric
  const sortPopularReviews = (reviews) => reviews.slice(0, 6);

  useEffect(() => {
    // return dispatch(getReviewsByUserID(+userID))
    // if (!userID) return;
    return (
      dispatch(getReviews())
        // .then((reviews) => reviews.filter((review) => review.userID === userID))
        .then((reviews) =>
          userID
            ? sortByRecent(filterByUserID(reviews))
            : sortPopularReviews(reviews)
        )
        .then((sorted) => setReviews(sorted))
        .catch((err) => console.log('ReviewsList error', err))
    );
  }, [dispatch]);

  return (
    reviews.length > 0 && (
      <div className="page-container reviews-list-container">
        <ul className={`reviews-list ${className}`}>
          {reviews.map((review) => (
            <li key={`review-${review.id}`}>
              <ReviewListItem
                review={review}
                className={userID ? 'user' : 'popular'}
                shape="landscape"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ReviewsList;
