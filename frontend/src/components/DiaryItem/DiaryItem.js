import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './DiaryItem.css';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { StarRatingReadOnly } from '../StarRating';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat, BsFillCalendarFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { EditReviewForm } from '../../views/Reviews';
import handleImageError from '../../utils/handleImageError';
import { AlbumInfo } from '../AlbumArt';
import { ArtWithOverlay } from '../AlbumArt';

const DiaryItem = ({ entry }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [day, month, year] = formatDateDayMonthYear(entry.createdAt).split(' ');
  const { showModal, toggleModal } = useModal();

  return (
    <tr className="diary-item">
      <td className="calendar">
        <div className="calendar">
          <BsFillCalendarFill className="calendar icon" />
          <p className="date">
            {month} <span>{year}</span>
          </p>
        </div>
      </td>
      <td className="day">
        <p className="day">{day}</p>
      </td>
      <td className="album">
        <div className="album-details">
          <div className="diary-album">
            <ArtWithOverlay album={entry.album} className="diary-album" />
          </div>
          <h3 className="entry-title">
            <Link
              exact
              to={`/reviews/${entry.id}`}
              className="diary-item-title"
            >
              {entry.album.title}
            </Link>
          </h3>
        </div>
      </td>
      <td className="released">
        <p className="released">{entry.album.releaseYear}</p>
      </td>
      <td className="rating">
        <div className="entry-rating">
          <StarRatingReadOnly rating={entry.rating} className="diary" />
          {entry.rating !== 10 && entry.rating % 2 !== 0 && (
            <span className="green half">½</span>
          )}
        </div>
      </td>
      <td className="relisten">
        <div className="relisten">
          {entry.isRelisten && <BsArrowRepeat className="icon" />}
        </div>
      </td>
      <td className="review">
        <div className="entry-review">
          {entry.body.length > 0 && (
            <Link exact to={`/reviews/${entry.id}`}>
              <BiMenuAltLeft className="icon" />
            </Link>
          )}
        </div>
      </td>
      {+userID === sessionUser?.id && (
        <td className="edit">
          <div className="entry-edit">
            <MdModeEditOutline className="icon" onClick={toggleModal} />
            {showModal && (
              <Modal onClose={toggleModal}>
                <EditReviewForm
                  review={entry}
                  album={entry.album}
                  onSuccess={toggleModal}
                />
              </Modal>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default DiaryItem;
