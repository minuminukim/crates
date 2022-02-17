import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postReview } from '../../store/reviewsReducer';
import AlbumArt from '../AlbumArt';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import './ReviewForm.css';

const ReviewForm = ({ album = null }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.session);
  const { errors } = useSelector((state) => state.reviews);
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [isRelisten, setIsRelisten] = useState(false);
  const [listenedDate, setListenedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const review = await dispatch(postReview(params));
    if (Object.values(errors).length) {
      return;
    }
    console.log('errors', errors);
    return history.push(`/reviews/${review.id}`);
    // return review;
  };

  return (
    <div>
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
            <h1>I LISTENED...</h1>
            <div>
              <h2>{album?.title}</h2>
              <span>{album?.releaseYear}</span>
            </div>
          </div>
          <div className="form-row">
            <InputLabel label="Specify the date you listened to it" />
            <InputField
              type="date"
              id="listenedDate"
              value={listenedDate}
              error={errors?.listenedDate}
              onChange={(e) => setListenedDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <input
              type="checkbox"
              value={isRelisten}
              checked={isRelisten}
              onChange={() => setIsRelisten(!isRelisten)}
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
          <div className="form-row">
            <InputLabel label="Rating" />
            <InputField
              type="number"
              id="rating"
              value={rating}
              error={errors?.rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {/* TODO: star rating component */}
          </div>
          <div className="form-row">
            <button className="submit-button" type="submit">
              SAVE
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default ReviewForm;
