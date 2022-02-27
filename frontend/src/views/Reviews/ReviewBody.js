import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../../components/StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { Link } from 'react-router-dom';
import './ReviewBody.css';

const ReviewBody = () => {
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const user = useSelector((state) => state.users[review?.userID]);
  const albums = useSelector((state) => state.albums.items);
  const album = Object.values(albums)?.find(
    (album) => album.id === review.albumID
  );

  return (
    <div className="review">
      <section className="review-header">
        <div className="user-info">
          <Link className="avatar-link" to={`/users/${review?.userID}`}>
            <FaUserCircle className="user-avatar" />
          </Link>
          <p className="review-by">
            Review by{' '}
            <Link className="user-link" to={`/users/${review?.userID}`}>
              {user?.username}
            </Link>
          </p>
        </div>
        <div>
          <h1 className="review-heading">{album?.title}</h1>
          <span className="review-release-year">{album?.releaseYear}</span>
        </div>
        <div className="single-review-filled-stars">
          <StarRatingReadOnly
            rating={review?.rating}
            className="star-filled-green"
          />

          {review.rating !== 10 && review.rating % 2 !== 0 && (
            <p className="half-green">½</p>
          )}
        </div>

        <p className="review-listened-date">{`Listened ${formatDateDayMonthYear(
          review.listenedDate
        )}`}</p>
      </section>
      <div>
        <p className="review-body">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewBody;
