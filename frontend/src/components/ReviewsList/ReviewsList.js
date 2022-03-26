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
  const reviewIDs = useSelector((state) => state.users[userID]?.reviews);
  console.log('reviewIDs', reviewIDs);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterByUserID = (reviews) =>
    reviews.filter((review) => review.userID === +userID);

  // just slicing 6 for now because current db schema doesn't have any
  // sort of popularity metric
  const sortPopularReviews = (reviews) => reviews.slice(0, 6);

  useEffect(() => {
    return dispatch(fetchReviews()).then((reviews) => {
      const sorted = userID
        ? sortByDateListened(filterByUserID([...reviews]))
        : sortPopularReviews([...reviews]);
      setReviews(sorted);
      setLoading(false);
    });
  }, [dispatch, userID]);
  console.log('reviewIDs', reviewIDs)

  return (
    !loading && (
      <div className="page-container reviews-list-container">
        {reviewIDs?.length > 0 ? (
          <ul className={`reviews-list ${className}`}>
            {reviewIDs.map((id) => (
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
