import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { Link } from 'react-router-dom';

const Details = ({ review, album, shape }) => {
  return (
    <>
      {shape === 'block' && (
        <div className="user-info">
          <Link exact to={`/users/${review.userID}`}>
            <FaUserCircle className="user-avatar" />
          </Link>
          <Link className="user-link" exact to={`/users/${review.userID}`}>
            {review.user.username}
          </Link>
        </div>
      )}
      <Link className="review-list-item-title" to={`/reviews/${review.id}`}>
        {album.title}{' '}
      </Link>
      <span className="review-list-item-year">{album.releaseYear}</span>
      <div className="review-list-item-info">
        <StarRatingReadOnly
          rating={review.rating}
          className="star-filled-green"
          size="small"
        />
        {review.rating !== 10 && review.rating % 2 !== 0 && (
          <span className="half-green">½</span>
        )}
        {shape !== 'block' && (
          <div>
            <Link to={`/reviews/${review.id}`}>Reviewed by </Link>
            <span className="review-list-item-username">
              {review.user.username}
            </span>
            <span className="review-list-item-date">
              {/* {formatDateDayMonthYear(review.listenedDate)} */}
              {formatDateDayMonthYear(review.createdAt)}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
