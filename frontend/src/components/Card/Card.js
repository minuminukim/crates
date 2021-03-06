import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import AlbumArt from '../AlbumArt';
import StarRatingReadOnly from '../StarRating/StarRatingReadOnly';
import { formatDateMonthDay } from '../../utils/date-helpers';
import './Card.css';

const Card = ({ item }) => {
  const { user, album } = item;
  const formattedDate = formatDateMonthDay(item.listenedDate);
  return (
    <div className="card">
      <Link to={`/reviews/${item.id}`} className="card-link">
        <div className="card-main">
          <span className="overlay"></span>
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
        <div className="card-review-rating">
          <span>{<StarRatingReadOnly rating={item.rating} />}</span>
          {item.rating !== 10 && item.rating % 2 !== 0 && <span className="half">½</span>}
        </div>
        {item.isRelisten && <BsArrowRepeat className="relisten-icon" />}
        {item.body.length > 0 && (
          <Link className="card-review-link" to={`/reviews/${item.id}`}>
            <BiMenuAltLeft className="menu-icon" />
          </Link>
        )}
        <p className="card-review-date">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Card;
