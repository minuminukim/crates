import { useState } from 'react';
import AlbumArt from '../AlbumArt/AlbumArt';
import './ReviewForm.css';

const ReviewForm = ({ album = null }) => {
  const [date, setDate] = useState(Date.now());
  
  return (
    <div>
      <form className="review-form">
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
            <input type="date" />
          </div>
          <div className="form-row">
            <input type="radio" />
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <textarea>Add a review...</textarea>
          </div>
          <div className="form-row">
            <label>Rating</label>
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
