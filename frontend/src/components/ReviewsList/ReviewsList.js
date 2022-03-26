import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../store/reviewsReducer';
import { sortByRecent, sortByDateListened } from '../../utils/sorts';
import ReviewListItem from '../ReviewListItem';
import { Empty } from '../../views/User';
import './ReviewsList.css';

const ReviewsList = ({ className = null }) => {
  const { userID } = useParams();
  const dispatch = useDispatch();

  // Select and sort depending on the current location:
  const mostRecentlyListened = useSelector((state) => {
    const reviewIDs = userID
      ? state.users[userID].reviews
      : state.reviews.reviewIDs;

    return [...reviewIDs].sort((a, b) => {
      const left = state.reviews.items[a];
      const right = state.reviews.items[b];
      return new Date(right.listenedDate) - new Date(left.listenedDate);
    });
  });

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
