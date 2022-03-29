import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Empty } from '.';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { fetchAlbumsByUserID } from '../../store/albumsReducer';

const UserAlbums = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const albumIDs = useSelector((state) => state.users[userID]?.albums);
  const sortedByRelease = useSelector((state) => {
    if (!albumIDs) return null;
    else if (albumIDs?.length === 0) return [];
    return [...albumIDs].sort((a, b) => {
      const left = state.albums.items[a];
      const right = state.albums.items[b];
      return right.releaseYear - left.releaseYear;
    });
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (albumIDs) {
    //   setLoading(false);
    //   return;
    // }

    dispatch(fetchAlbumsByUserID(+userID)).then(
      () => setLoading(false),
      (error) => console.log('error fetching user albums', error)
    );
  }, [dispatch, userID]);

  return (
    <div className="user-albums-content">
      {!loading && sortedByRelease?.length > 0 ? (
        sortedByRelease?.map((albumID, i) => (
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
