import { Link } from 'react-router-dom';
import AlbumArt from '../AlbumArt';
import './ListCard.css';

const ListCard = ({ list }) => {
  const albums = list?.albums;
  return (
    <div className="list-card">
      <Link to="#" className="list-link">
        {albums?.length &&
          albums
            .slice(0, 5)
            .map((album) => (
              <AlbumArt
                title={album.title}
                artworkURL={album.artworkURL}
                size="medium"
              />
            ))}
      </Link>
    </div>
  );
};

export default ListCard;
