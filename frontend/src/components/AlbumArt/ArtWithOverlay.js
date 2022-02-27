import { useState } from 'react';
import { AlbumInfo } from '.';
import handleImageError from '../../utils/handleImageError';

const ArtWithOverlay = ({ album, children, className }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {showInfo && <AlbumInfo title={album.title} year={album.releaseYear} />}
      <div
        className="album-art-container with-overlay"
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
