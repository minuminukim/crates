import AlbumArt from '../AlbumArt';
import './Card.css';

const Card = ({ album }) => {
  return (
    <div className="card">
      <AlbumArt
        title={album.title}
        artworkURL={album.artworkURL}
        size="medium"
      />
    </div>
  );
};

export default Card;
