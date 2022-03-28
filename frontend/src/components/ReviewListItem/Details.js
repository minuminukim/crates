import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Details = ({ shape, reviewID, showInfo = true }) => {
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const user = useSelector((state) => state.users[review?.userID]);

  return (
    <>
      {shape === 'block' && (
        <div className="user-info">
          <Link to={`/users/${review?.userID}`}>
            <FaUserCircle className="user-avatar" />
          </Link>
          <Link className="user-link" to={`/users/${review?.userID}`}>
            {user?.username}
          </Link>
        </div>
      )}
      {showInfo && (
        <div className="review-list-item-release">
          <Link className="review-list-item-title" to={`/reviews/${reviewID}`}>
            {album?.title}{' '}
          </Link>

          <span className="review-list-item-year">{album?.releaseYear}</span>
        </div>
      )}
      <div className="review-list-item-info">
        <StarRatingReadOnly
          rating={review?.rating}
          className="star-filled-green"
          size="small"
        />
        {review?.rating !== 10 && review?.rating % 2 !== 0 && (
          <span className="half-green">½</span>
        )}
        {shape === 'landscape' && (
          <div>
            <Link to={`/reviews/${reviewID}`}>Listened by </Link>
            <Link
              to={`/users/${review?.userID}`}
              className="review-list-item-username"
            >
              {user?.username}
            </Link>
            {showInfo && (
              <span className="review-list-item-date">
                {formatDateDayMonthYear(review?.listenedDate)}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
