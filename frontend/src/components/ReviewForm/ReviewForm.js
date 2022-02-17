import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postReview } from '../../store/reviewsReducer';
import AlbumArt from '../AlbumArt/AlbumArt';
import './ReviewForm.css';

const initialState = {
  body: '',
  date: new Date().toISOString().slice(0, 10),
};

const ReviewForm = ({ album = null }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const { errors } = useSelector((state) => state.reviews);
  const [body, setBody] = useState('');
  const [listenedDate, setListenedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [rating, setRating] = useState(0);
  const [isRelisten, setIsRelisten] = useState(
    user.albums.some((item) => item.spotifyID === album.spotifyID)
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
    console.log('errors', errors);
    return review;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-section">
          <AlbumArt
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </div>
        <div className="form-section">
          <div className="review-form-header">
            <h1>I LISTENED...</h1>
            <h2>{album?.title}</h2>
            <span>{album?.releaseYear}</span>
          </div>
          <div>
            <label>Listened on</label>
            <input
              type="date"
              value={listenedDate}
              onChange={(e) => setListenedDate(e.target.value)}
            />
            {errors?.listenedDate}
          </div>
          <div className="form-row">
            <input
              type="radio"
              value={isRelisten}
              checked={isRelisten}
              onClick={() => setIsRelisten(!isRelisten)}
            />
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <textarea value={body} onChange={(e) => setBody(e.target.value)}>
              Add a review...
            </textarea>
          </div>
          <div className="form-row">
            <label>Rating</label>
            <input
              type="number"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors?.rating}
            {/* TODO: star rating component */}
          </div>
          <div className="form-row">
            <button type="submit">SAVE</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
