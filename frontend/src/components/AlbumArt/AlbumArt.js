import handleImageError from '../../utils/handleImageError';
import './AlbumArt.css';

const AlbumArt = ({ title, artworkURL, size, style = null, children }) => {
  return (
    <>
      <div className={`album-art album-art-${size}`} style={style}>
        <img
          className={`album-art album-art-${size}`}
          src={artworkURL}
          alt={`${title} album cover`}
          onError={handleImageError}
        />
      </div>
      {children}
    </>
  );
};

export default AlbumArt;
