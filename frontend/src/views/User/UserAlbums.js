import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import { StarRatingReadOnly } from '../../components/StarRating';
import { Empty } from '.';
import { ArtWithOverlay } from '../../components/AlbumArt';

const UserAlbums = () => {
  const { userID } = useParams();
  const user = useSelector((state) => state.users[userID]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(getReviewsByUserID(+userID))
      .then((reviews) => setReviews(reviews))
      .then(() => setLoading(false))
      .catch((err) => setErrors(err));
  }, [dispatch, userID]);

  const albumIDs = new Set();
  const uniqueReviews = reviews?.filter(({ album }) => {
    if (albumIDs.has(album.id)) return false;
    albumIDs.add(album.id);
    return true;
  });

  const sorted = [...uniqueReviews].sort(
    (a, b) => b.album.releaseYear - a.album.releaseYear
  );

  return (
    <div className="user-albums-content">
      {!loading && sorted?.length > 0 ? (
        sorted.map(({ rating, album }, i) => (
          <div key={`album-${i}`} className="grid-item">
            <ArtWithOverlay album={album} className="album-art-grid" />
            <div className="grid-item-rating">
              <StarRatingReadOnly rating={rating} />
              {rating % 2 !== 0 && <span className="half">½</span>}
            </div>
          </div>
        ))
      ) : (
        <Empty item="albums" />
      )}
    </div>
  );
};

export default UserAlbums;
