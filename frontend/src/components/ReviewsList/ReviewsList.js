import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReviews,
  selectMostRecentReviews,
} from '../../store/reviewsReducer';
import ReviewListItem from '../ReviewListItem';
import { Empty } from '../../views/User';
import './ReviewsList.css';

const ReviewsList = ({ className = null }) => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const userReviewIDs = useSelector((state) => state.users[userID]?.reviews);
  const allReviewIDs = useSelector((state) => state.reviews.reviewIDs);

  // Component renders in two separate routes
  const reviewIDs = userID ? userReviewIDs : allReviewIDs;
  const mostRecentlyListened = useSelector((state) =>
    selectMostRecentReviews(state, reviewIDs)
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchReviews()).then(
      () => setLoading(false),
      (error) => console.error('error fetching reviews at ReviewList', error)
    );
  }, [dispatch]);

  return (
    !loading && (
      <div className="page-container reviews-list-container">
        {mostRecentlyListened?.length > 0 ? (
          <ul className={`reviews-list ${className}`}>
            {mostRecentlyListened.map((id) => (
              <li key={`review-${id}`}>
                <ReviewListItem
                  reviewID={id}
                  className={userID ? 'user' : 'popular'}
                  shape="landscape"
                />
              </li>
            ))}
          </ul>
        ) : (
          <Empty item="reviews" />
        )}
      </div>
    )
  );
};

export default ReviewsList;
