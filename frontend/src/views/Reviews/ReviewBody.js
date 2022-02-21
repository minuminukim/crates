import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../store/usersReducer';
import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../../components/StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import './ReviewBody.css';

const ReviewBody = ({ review, shape }) => {
  const albums = useSelector((state) => state.albums.items);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const album = albums[review.albumID];
  // const user = users[review.userID];

  useEffect(() => {
    return dispatch(fetchSingleUser(review.userID))
      .then((user) => setUser(user))
      .then(() => setIsLoaded(true))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error in ReviewBody fetching user', data);
          return data.errors;
        }
      });
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="review">
        <section className="review-header">
          <div className="review-user">
            <FaUserCircle className="review-avatar" />
            <p>
              Review by <span>{user?.username}</span>
            </p>
          </div>
          <h1 className="review-heading">
            {album?.title}{' '}
            <span className="review-release-year">{album?.releaseYear}</span>
            <span className="single-review-filled-stars">
              {
                <StarRatingReadOnly
                  rating={review.rating}
                  className="star-filled-green"
                />
              }
            </span>
            {review.rating !== 10 && review.rating % 2 !== 0 && (
              <span className="half-green">½</span>
            )}
          </h1>
          <p className="review-listened-date">{`Listened ${formatDateDayMonthYear(
            review.listenedDate
          )}`}</p>
        </section>
        <div>
          <p className="review-body">{review.body}</p>
        </div>
      </div>
    )
  );
};

export default ReviewBody;
