import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiaryItem.css';
import { formatDateMonthDay } from '../../utils/date-helpers';
import { StarRatingReadOnly } from '../StarRating';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import StarRating from '../StarRating';

const DiaryItem = ({ entry }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [month, day] = formatDateMonthDay(entry.createdAt).split(' ');

  return (
    <li className="diary-item">
      <p className="month">{month}</p>
      <p className="day">{day}</p>
      <div className="album-details">
        <div className="diary-album-container">
          <span className="overlay"></span>
          <img
            alt={entry.album.title}
            src={entry.album.artworkURL}
            className="diary-album"
          />
        </div>
        <h3 className="entry-title">
          <Link exact to={`/reviews/${entry.id}`} className="diary-item-title">
            {entry.album.title}
          </Link>
        </h3>
      </div>
      <p className="released">{entry.album.releaseYear}</p>
      <div className="entry-rating">
        <StarRatingReadOnly rating={entry.rating} className="diary" />
        {entry.rating !== 10 && entry.rating % 2 !== 0 && (
          <span className="green half">½</span>
        )}
      </div>
      <div classsName="relisten">{entry.isRelisten && <BsArrowRepeat />}</div>
      <div className="entry-review">
        {entry.body.length > 0 && (
          <Link exact to={`/reviews/${entry.id}`}>
            <BiMenuAltLeft />
          </Link>
        )}
      </div>
      {+userID === sessionUser?.id && (
        <div className="entry-edit">
          <MdModeEditOutline />
        </div>
      )}
    </li>
  );
};

export default DiaryItem;
