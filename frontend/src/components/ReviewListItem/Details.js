import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { Link } from 'react-router-dom';

const Details = ({ review, album, shape, showInfo = true }) => {
  return (
    <>
      {shape === 'block' && (
        <div className="user-info">
          <Link to={`/users/${review.userID}`}>
            <FaUserCircle className="user-avatar" />
          </Link>
          <Link className="user-link" to={`/users/${review.userID}`}>
            {review.user.username}
          </Link>
        </div>
      )}
      {showInfo && (
        <div className="review-list-item-release">
          <Link className="review-list-item-title" to={`/reviews/${review.id}`}>
            {album.title}{' '}
          </Link>

          <span className="review-list-item-year">{album.releaseYear}</span>
        </div>
      )}
      <div className="review-list-item-info">
        <StarRatingReadOnly
          rating={review.rating}
          className="star-filled-green"
          size="small"
        />
        {review.rating !== 10 && review.rating % 2 !== 0 && (
          <span className="half-green">½</span>
        )}
        {shape === 'landscape' && (
          <div>
            <Link to={`/reviews/${review.id}`}>Listened by </Link>
            <Link
              to={`/users/${review.userID}`}
              className="review-list-item-username"
            >
              {review.user.username}
            </Link>
            {showInfo && (
              <span className="review-list-item-date">
                {formatDateDayMonthYear(review.listenedDate)}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
