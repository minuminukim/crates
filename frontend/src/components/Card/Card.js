import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { GrPowerCycle } from 'react-icons/gr';
import AlbumArt from '../AlbumArt';
import './Card.css';

const Card = ({ item }) => {
  const { user, album } = item;
  return (
    <div className="card">
      <Link to={`/reviews/${item.id}`} className="card-link">
        <div className="card-main">
          <AlbumArt
            title={album.title}
            artworkURL={album.artworkURL}
            size="medium"
          />
          <div className="card-signature">
            <FaUserCircle />
            <span>{user.username}</span>
          </div>
        </div>
      </Link>
      <div className="card-review-info">
        <span>{`Rating: ${item.rating}`}</span>
        {item.body.length > 0 && (
          <Link to={`/reviews/${item.id}`}>
            <BiMenuAltLeft />
          </Link>
        )}
        {item.isRelisten && <GrPowerCycle />}
        <span>{item.listenedDate}</span>
      </div>
    </div>
  );
};

export default Card;
