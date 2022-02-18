import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

export const StarRatingReadOnly = ({ rating, className = null }) => {
  return (
    <div className="star-rating read-only">
      {[...Array(Math.floor(rating / 2))].map((_, i) => (
        <FaStar
          key={`star-filled-read-${i}`}
          className={`star-filled-read ${className}`}
        />
      ))}
    </div>
  );
};

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [index, setIndex] = useState(0);

  const grabIndex = (e) => +e.target.id.split('-').pop();
  const onMouseEnter = (e) => setIndex(grabIndex(e));
  const onClick = (e) => setRating(grabIndex(e));

  const onMouseLeave = () => {
    if (rating !== null) return;
    setIndex(0);
  };

  return (
    <div className="star-rating" onMouseLeave={onMouseLeave}>
      {[...Array(10)].map((_, i) => (
        <FaStar
          className={index - 1 >= i ? `star-filled` : `star`}
          key={`star-${i}`}
          id={`star-${i}`}
          onMouseEnter={onMouseEnter}
          // onClick={onClick}
        />
      ))}
      <FaStar />
    </div>
  );
};


export default StarRating;
