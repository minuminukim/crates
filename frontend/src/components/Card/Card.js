import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import AlbumArt from '../AlbumArt';
import StarRatingReadOnly from '../StarRating/StarRatingReadOnly';
import { formatDateMonthDay } from '../../utils/date-helpers';
import './Card.css';
import { fetchSingleAlbum } from '../../store/albumsReducer';

const Card = ({ reviewID }) => {
  const dispatch = useDispatch();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const user = useSelector((state) => state.users[review.userID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const formattedDate = formatDateMonthDay(review?.listenedDate);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!album) {
      setLoading(true);
      dispatch(fetchSingleAlbum(review?.albumID)).then(
        () => setLoading(false),
        (error) =>
          console.log(`Error fetching album data for ${review?.albumID}`, error)
      );
    }
    setLoading(false);
    return;
  }, [album, review?.albumID, dispatch]);

  useEffect(() => {});

  return (
    !isLoading && (
      <div className="card">
        <Link to={`/reviews/${review.id}`} className="card-link">
          <div className="card-main">
            <span className="overlay"></span>
            <AlbumArt albumID={review.albumID} size="medium" />
            <div className="card-signature">
              <FaUserCircle />
              <span>{user?.username}</span>
            </div>
          </div>
        </Link>
        <div className="card-review-info">
          <div className="card-review-rating">
            <span>{<StarRatingReadOnly rating={review.rating} />}</span>
            {review.rating !== 10 && review.rating % 2 !== 0 && (
              <span className="half">½</span>
            )}
          </div>
          {review.isRelisten && <BsArrowRepeat className="relisten-icon" />}
          {review.body.length > 0 && (
            <Link className="card-review-link" to={`/reviews/${review.id}`}>
              <BiMenuAltLeft className="menu-icon" />
            </Link>
          )}
          <p className="card-review-date">{formattedDate}</p>
        </div>
      </div>
    )
  );
};

export default Card;
