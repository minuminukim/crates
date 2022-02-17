import { FaUserCircle } from 'react-icons/fa';
import './ReviewBody.css';

const ReviewBody = ({ review }) => {
  const { album } = review;
  return (
    <div className="review">
      <section className="review-header">
        <div className="review-user">
          <FaUserCircle className="review-avatar" />
          <p>{`Review by ${review.user?.username}`}</p>
        </div>
        <h2 className="review-heading">
          {album.title}{' '}
          <span className="review-release-year">{album.releaseYear}</span>
          <span className="review-rating">{`${review.rating} / 10`}</span>
        </h2>
        <p className="review-listened-date">{`Listened ${review.listenedDate}`}</p>
      </section>
      <div>
        <p className="review-body">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewBody;
