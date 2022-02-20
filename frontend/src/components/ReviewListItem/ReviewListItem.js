import { Link } from 'react-router-dom';
import StarRatingReadOnly from '../StarRating/StarRatingReadOnly';
import AlbumArt from '../AlbumArt';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import './ReviewListItem.css';

const ReviewListItem = ({ review, className = null }) => {
  const album = review?.album;
  return (
    <div className={`review-list-item ${className}`}>
      <div className="review-list-item-art">
        <AlbumArt
          title={album.title}
          artworkURL={album.artworkURL}
          size="small"
        />
      </div>
      <div className="review-list-item-main">
        <Link className="review-list-item-title" to={`/reviews/${review.id}`}>
          {album.title}{' '}
          <span className="review-list-item-year">{album.releaseYear}</span>
        </Link>
        <div className="review-list-item-info">
          <StarRatingReadOnly
            rating={review.rating}
            className="star-filled-green"
            size="small"
          />
          {review.rating !== 10 && review.rating % review.rating !== 1 && (
            <span className="half-green">½</span>
          )}
          <div>
            <Link to={`/reviews/${review.id}`}>Reviewed by </Link>
            <span className="review-list-item-username">
              {review.user.username}
            </span>
            <span className="review-list-item-date">
              {formatDateDayMonthYear(review.listenedDate)}
            </span>
          </div>
        </div>
        <p className="review-list-item-body">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewListItem;
