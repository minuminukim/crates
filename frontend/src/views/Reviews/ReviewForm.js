import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postReview } from '../../store/reviewsReducer';
import AlbumArt from '../../components/AlbumArt';
import { InputField, InputLabel } from '../../components/InputField';
import ValidationError from '../../components/ValidationError';
import StarRating from '../../components/StarRating';
import { formatDateDayMonthYear } from '../../utils/date-helpers';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import './ReviewForm.css';

const ReviewForm = ({ album = null, onSuccess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.session);
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [isRelisten, setIsRelisten] = useState(false);
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().slice(0, 10);
  const [listenedDate, setListenedDate] = useState(today);
  const hiddenInput = useRef(null);

  const handleSubmit = (e) => {
    console.log('album in submit', album);
    e.preventDefault();
    setErrors({});

    const params = {
      body,
      listenedDate,
      rating,
      isRelisten,
      userID: user.id,
      spotifyID: album.spotifyID,
      title: album.title,
      artworkURL: album.artworkURL,
      artist: album.artist,
      releaseYear: album.releaseYear,
    };

    return dispatch(postReview(params))
      .then((data) => history.push(`/reviews/${data.id}`))
      .then(() => onSuccess())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const onStarChange = (star) => setRating(star);

  return (
    <div>
      {Object.values(errors).length > 0 &&
        Object.values(errors).map((error) => <ValidationError error={error} />)}
      <form onSubmit={handleSubmit} className="review-form">
        <section className="review-form-left">
          <AlbumArt
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </section>
        <section className="review-form-right">
          <div className="review-form-header">
            <div className="label-row">
              <h1>I LISTENED...</h1>
              <AiOutlineClose className="close-icon large" />
            </div>
            <div>
              <h2>
                {album?.title}
                <span className="review-form-year">{album?.releaseYear}</span>
              </h2>
            </div>
          </div>
          <div className="form-row">
            <InputLabel label="Specify the date you listened to it" />
            {/* <p>{formatDateDayMonthYear(listenedDate)}</p> */}
            <input
              type="date"
              id="listenedDate"
              value={listenedDate}
              max={today}
              onChange={(e) => setListenedDate(e.target.value)}
              hidden
            />
            <InputField
              type="date"
              id="listenedDate"
              value={listenedDate}
              max={today}
              onChange={(e) => setListenedDate(e.target.value)}
            />
          </div>
          <div className="form-row checkbox">
            <div
              className="replace-checkbox"
              onClick={() => hiddenInput.current.click()}
            >
              {isRelisten && <AiOutlineCheck />}
            </div>
            <input
              type="checkbox"
              value={isRelisten}
              checked={isRelisten}
              ref={hiddenInput}
              onChange={() => setIsRelisten(!isRelisten)}
              hidden
            />
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <textarea
              id="body"
              placeholder="Add a review..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {errors?.body}
          </div>
          <div className="form-row-last">
            <div className="form-row rating-row">
              <div className="label-row">
                <InputLabel label="Rating" />
                {rating > 0 && (
                  <p className="rating-label">{`${rating / 2} out of 5`}</p>
                )}
              </div>
              <InputField
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                hidden={true}
              />
              <StarRating handleForm={onStarChange} className="form-star" />
            </div>
            <div className="form-row">
              <button className="submit-button" type="submit">
                SAVE
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ReviewForm;
