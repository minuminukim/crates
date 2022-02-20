import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ reviewRating = 0, handleForm }) => {
  const [rating, setRating] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  const isFilled = (i) => (i <= (hoverIndex || rating) ? 'star-filled' : '');

  // width 26px, half-width 13px
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <div className="star-wrapper" key={`star-index-${i}`}>
          <div className="star-left">
            <FaStar
              className={`star star-left ${isFilled(i * 2 + 1)}`}
              id={`star-${i * 2 + 1}`} // id === rating
              onMouseEnter={() => setHoverIndex(i * 2 + 1)}
              onMouseLeave={() => setHoverIndex(rating)}
              onClick={() => {
                setRating(i * 2 + 1);
                handleForm(i * 2 + 1);
              }}
            />
          </div>
          <div className="star-right">
            <FaStar
              className={`star star-right ${isFilled(i * 2 + 2)}`}
              id={`star-${i * 2 + 2}`} // id === rating
              onMouseEnter={() => setHoverIndex(i * 2 + 2)}
              onMouseLeave={() => setHoverIndex(rating)}
              onClick={() => {
                setRating(i * 2 + 2);
                handleForm(i * 2 + 2);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
