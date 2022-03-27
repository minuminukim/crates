import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AlbumInfo } from '.';
import handleImageError from '../../utils/handleImageError';

const ArtWithOverlay = ({ albumID, children, className = '' }) => {
  const album = useSelector((state) => state.albums.items[albumID]);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {showInfo && <AlbumInfo title={album.title} year={album.releaseYear} />}
      <div
        className={`album-art-container with-overlay ${className}`}
        onMouseOver={() => setShowInfo(true)}
        onMouseOut={() => setShowInfo(false)}
      >
        <span className="overlay">{children}</span>
        <img
          src={album?.artworkURL}
          alt={album?.title}
          onError={handleImageError}
          className={`album-art-with-overlay ${className}`}
        />
      </div>
    </>
  );
};

export default ArtWithOverlay;
