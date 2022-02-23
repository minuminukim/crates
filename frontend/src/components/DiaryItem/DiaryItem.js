import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiaryItem.css';
import { formatDateMonthDay } from '../../utils/date-helpers';
import { StarRatingReadOnly } from '../StarRating';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';

const DiaryItem = ({ entry }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [month, day] = formatDateMonthDay(entry.createdAt).split(' ');

  return (
    <li className="diary-item">
      <p>{month}</p>
      <p>{day}</p>
      <div className="diary-album-container">
        <span className="overlay"></span>
        <img
          alt={entry.album.title}
          src={entry.album.artworkURL}
          className="diary-album"
        />
      </div>
      <h3>
        <Link exact to={`/reviews/${entry.id}`} className="diary-item-title">
          {entry.album.title}
        </Link>
      </h3>
      <p>{entry.album.releaseYear}</p>
      <div>
        <StarRatingReadOnly rating={entry.rating} />
      </div>
      <div>{entry.isRelisten && <BsArrowRepeat />}</div>
      <div>{entry.isRelisten && <BiMenuAltLeft />}</div>
      <div>{+userID === sessionUser?.id && <MdModeEditOutline />}</div>
    </li>
  );
};

export default DiaryItem;
