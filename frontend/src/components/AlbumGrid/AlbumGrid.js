import AlbumArt from '../AlbumArt';
import './AlbumGrid.css';

const AlbumGrid = ({ albums, isRanked = false }) => {
  return (
    <ul className="album-grid">
      {albums &&
        albums.length > 0 &&
        albums.map((album, i) => (
          <li key={`grid-item-${i}}`} className="grid-item">
            <AlbumArt
              artworkURL={album.artworkURL}
              title={album.title}
              size="grid"
            />
            {isRanked && <span className="position">{i + 1}</span>}
          </li>
        ))}
    </ul>
  );
};

export default AlbumGrid;
