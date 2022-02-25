import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { StarRatingReadOnly } from '../../components/StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { Link } from 'react-router-dom';
import './ReviewBody.css';

const ReviewBody = () => {
  // console.log('review', review, 'album', album, 'isLoading', isLoading);
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const user = useSelector((state) => state.users[review?.userID]);
  const albums = useSelector((state) => state.albums.items);
  const album = Object.values(albums)?.find(
    (album) => album.id === review.albumID
  );
  // useEffect(() => {
  //   return dispatch(fetchSingleUser(review.userID))
  //     .then((user) => setUser(user))
  //     .then(() => setIsLoaded(true))
  //     .catch(async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) {
  //         console.log('error in ReviewBody fetching user', data);
  //         return data.errors;
  //       }
  //     });
  // }, [dispatch, review.userID]);

  return (
    <div className="review">
      <section className="review-header">
        <div className="user-info">
          <FaUserCircle className="user-avatar" />
          <p>
            Review by{' '}
            <Link className="user-link" to={`/users/${review?.userID}`}>
              {user?.username}
            </Link>
          </p>
        </div>
        <h1 className="review-heading">
          {album?.title}{' '}
          <span className="review-release-year">{album?.releaseYear}</span>
          <span className="single-review-filled-stars">
            {
              <StarRatingReadOnly
                rating={review?.rating}
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
  );
};

export default ReviewBody;
