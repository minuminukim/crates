import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../StarRating/StarRating';
import './ReviewBody.css';

const ReviewBody = ({ review }) => {
  const { user } = useSelector((state) => state.session);
  const albums = useSelector((state) => state.albums.items);
  const album = albums[review.albumID];

  return (
    <div className="review">
      <section className="review-header">
        <div className="review-user">
          <FaUserCircle className="review-avatar" />
          <p>{`Review by ${user?.username}`}</p>
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
          {review.rating % review.rating !== 1 && (
            <span className="half-green">½</span>
          )}
        </h1>
        <p className="review-listened-date">{`Listened ${review.listenedDate}`}</p>
      </section>
      <div>
        <p className="review-body">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewBody;
