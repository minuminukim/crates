import './AlbumArt.css';

const AlbumArt = ({ title, artworkURL, size, style = null }) => {
  return (
    <div className={`album-art album-art-${size}`} style={style}>
      <img
        className={`album-art album-art-${size}`}
        src={artworkURL}
        alt={`${title} album cover`}
      />
    </div>
  );
};

export default AlbumArt;
