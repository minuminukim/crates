import { Link } from 'react-router-dom';
import StarRatingReadOnly from '../StarRating/StarRatingReadOnly';
import AlbumArt from '../AlbumArt';
import './ReviewListItem.css';

const ReviewListItem = ({ review }) => {
  const album = review?.album;
  return (
    <div className="review-list-item">
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
        <div>
          <StarRatingReadOnly
            rating={review.rating}
            className="star-filled-green"
            size="small"
          />
          {review.rating !== 10 && review.rating % review.rating !== 1 && (
            <span className="half-green">½</span>
          )}
          <div>
            <Link to={`/reviews/${review.id}`}>Watched by</Link>
            <span>{review.user.username}</span>
            <span>{review.listenedDate}</span>
          </div>
        </div>
        <p>{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewListItem;
