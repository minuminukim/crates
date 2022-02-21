import { Link } from 'react-router-dom';
import './ListSpread.css';

const ListSpread = ({ gap, albums, listID, size = 'medium' }) => {
  return (
    <Link to={`/lists/${listID}`} className={`list-spread list-spread-${size}`}>
      <span className="overlay"></span>
      {albums?.length &&
        albums.slice(0, 5).map((album, i) => (
          <div
            className={`album-art-container album-art-container-${size}`}
            key={`album-art-${i}`}
            id={`album-${i}`}
          >
            <img
              className={`list-spread-${size}`}
              src={`${album.artworkURL}`}
              alt={`${album.title}`}
            />
          </div>
        ))}
    </Link>
  );
};

export default ListSpread;
