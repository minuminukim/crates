import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DiaryItem.css';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { StarRatingReadOnly } from '../StarRating';
import { BiMenuAltLeft } from 'react-icons/bi';
import { BsArrowRepeat, BsFillCalendarFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { EditReviewForm } from '../../views/Reviews';
import { ArtWithOverlay } from '../AlbumArt';

const DiaryItem = ({ reviewID }) => {
  const { userID } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const album = useSelector((state) => state.albums.items[review?.albumID]);
  const [day, month, year] = formatDateDayMonthYear(review?.listenedDate).split(
    ' '
  );
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
            <ArtWithOverlay albumID={review?.albumID} className="diary-album" />
          </div>
          <h3 className="entry-title">
            <Link to={`/reviews/${reviewID}`} className="diary-item-title">
              {album?.title}
            </Link>
          </h3>
        </div>
      </td>
      <td className="released">
        <p className="released">{album?.releaseYear}</p>
      </td>
      <td className="rating">
        <div className="entry-rating">
          <StarRatingReadOnly rating={review?.rating} className="diary" />
          {review?.rating !== 10 && review?.rating % 2 !== 0 && (
            <span className="green half">½</span>
          )}
        </div>
      </td>
      <td className="relisten">
        <div className="relisten">
          {review?.isRelisten && <BsArrowRepeat className="icon" />}
        </div>
      </td>
      <td className="review">
        <div className="entry-review">
          {review?.body.length > 0 && (
            <Link to={`/reviews/${reviewID}`}>
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
                  reviewID={reviewID}
                  albumID={review?.albumID}
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
