import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Empty } from '.';
import { ArtWithOverlay } from '../../components/AlbumArt';
import {
  fetchAlbumsByUserID,
  selectUserAlbumsSortedByRelease,
} from '../../store/albumsReducer';

const UserAlbums = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const albumsSortedByRelease = useSelector((state) =>
    selectUserAlbumsSortedByRelease(state, userID)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (albumsSortedByRelease) {
      setLoading(false);
      return;
    }

    dispatch(fetchAlbumsByUserID(+userID)).then(
      () => setLoading(false),
      (error) => console.log('error fetching user albums', error)
    );
  }, [dispatch, userID, albumsSortedByRelease]);

  return (
    <div className="user-albums-content">
      {!loading && albumsSortedByRelease?.length > 0 ? (
        albumsSortedByRelease.map((albumID, i) => (
          <div key={`album-${i}`} className="grid-item">
            <ArtWithOverlay albumID={albumID} className="album-art-grid" />
            {/* <div className="grid-item-rating">
              <StarRatingReadOnly rating={rating} />
              {rating % 2 !== 0 && <span className="half">½</span>}
            </div> */}
          </div>
        ))
      ) : (
        <Empty item="albums" />
      )}
    </div>
  );
};

export default UserAlbums;
