import handleImageError from '../../utils/handleImageError';

const BacklogGrid = ({ albums }) => {
  return (
    <ul className="backlog-grid">
      {albums?.length > 0 &&
        albums.map((album, i) => (
          <li key={`backlog-item-${i}`} className="album-grid-item">
            {/* <Link to="#"> */}
            <span className="overlay"></span>
            <img
              alt={album.title}
              src={album.artworkURL}
              className="backlog-album"
              onError={handleImageError}
            />
          </li>
        ))}
    </ul>
  );
};

export default BacklogGrid;
