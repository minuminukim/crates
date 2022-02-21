import AlbumArt from '../AlbumArt';
import './AlbumGrid.css';

const AlbumGrid = ({ albums }) => {
  return (
    <ul className="album-grid">
      {albums &&
        albums.length > 0 &&
        albums.map((album, i) => (
          <AlbumArt
            key={`grid-item-${i}`}
            artworkURL={album.artworkURL}
            title={album.title}
            size="grid"
          />
        ))}
    </ul>
  );
};

export default AlbumGrid;
