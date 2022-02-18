import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
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
          <span className="review-rating">{`${review.rating} / 10`}</span>
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
