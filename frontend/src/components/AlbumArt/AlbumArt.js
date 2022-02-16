import './AlbumArt.css';

const AlbumArt = ({ title, artworkURL, size }) => {
  return (
    <div className={`album-art album-art-${size}`}>
      <img
        className={`album-art album-art-${size}`}
        src={artworkURL}
        alt={`${title} album cover`}
      />
    </div>
  );
};

export default AlbumArt;
