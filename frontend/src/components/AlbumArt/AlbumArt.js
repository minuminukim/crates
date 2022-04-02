import { useSelector } from 'react-redux';
import handleImageError from '../../utils/handleImageError';
import './AlbumArt.css';

const AlbumArt = ({
  albumID,
  size,
  style = null,
  artworkURL = '',
  children,
}) => {
  const album = useSelector((state) => state.albums.items[albumID]);

  return (
    <>
      <div className={`album-art album-art-${size}`} style={style}>
        <img
          className={`album-art album-art-${size}`}
          src={artworkURL || album?.artworkURL}
          alt={`${album?.title} album cover`}
          onError={handleImageError}
        />
      </div>
      {children}
    </>
  );
};

export default AlbumArt;
