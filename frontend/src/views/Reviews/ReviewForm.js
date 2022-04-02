import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postReview } from '../../store/reviewsReducer';
import AlbumArt from '../../components/AlbumArt';
import { InputField, InputLabel } from '../../components/InputField';
import { ErrorMessages } from '../../components/ValidationError';
import StarRating from '../../components/StarRating';
import { AiOutlineClose } from 'react-icons/ai';
import { toDateString } from '../../utils/date-helpers';
import { SaveButton } from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import './ReviewForm.css';

const ReviewForm = ({ album = null, onSuccess = null, onClose = null }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.session);

  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [isRelisten, setIsRelisten] = useState(false);
  const [errors, setErrors] = useState({});
  const today = toDateString();
  const [listenedDate, setListenedDate] = useState(today);
  const [message, setMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const onStarChange = (star) => setRating(star);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

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

    setInProgress(true);
    dispatch(postReview(params))
      .then((data) => {
        setMessage(
          `You have successfully created a review for '${album.title}' `
        );
        setInProgress(false);
        onSuccess(); // close modal
        history.push(`/reviews/${data.id}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
          setInProgress(false);
        }
      });
  };

  const ratingLabel = (
    <p className="rating-label">{`${rating / 2} out of 5`}</p>
  );

  return (
    <div>
      <ErrorMessages errors={errors} success={message} />
      <form onSubmit={handleSubmit} className="review-form">
        <section className="review-form-left">
          <AlbumArt
            albumID={album?.id}
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </section>
        <section className="review-form-right">
          <div className="review-form-header">
            <div className="label-row">
              <h1>I LISTENED...</h1>
              <AiOutlineClose
                className="close-icon large"
                onClick={onClose || onSuccess}
              />
            </div>
            <div>
              <h2 className="review-form-heading">
                {album?.title}
                <span className="review-form-year">{album?.releaseYear}</span>
              </h2>
            </div>
          </div>
          <div className="form-row checkbox">
            <Checkbox
              value={isRelisten}
              onChange={() => setIsRelisten(!isRelisten)}
            />
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <InputLabel label="Specify the date you listened to it" required />
            <InputField
              type="date"
              id="listenedDate"
              value={listenedDate}
              max={today}
              onChange={(e) => setListenedDate(e.target.value)}
            />
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
                <InputLabel label="Rating" required />
                {rating > 0 && ratingLabel}
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
              <SaveButton label="SAVE" disabled={inProgress} />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ReviewForm;
