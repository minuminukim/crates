import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

export const StarRatingReadOnly = ({ rating }) => {
  return (
    <div className="star-rating read-only">
      {[...Array(Math.floor(rating / 2))].map((_, i) => (
        <FaStar key={`star-filled-read-${i}`} className="star-filled-read" />
      ))}
    </div>
  );
};

const StarRating = () => {
  const [index, setIndex] = useState(0);
  const onMouseEnter = (e) => {
    const i = +e.target.id.split('-').pop();
    setIndex(i);
  };
  const onMouseLeave = () => {
    setIndex(0);
  };
  // somehow track mouse movement, fill up to a certain range
  // depending on position, render half or full?
  const isEven = (i) => i % 2 === 0;
  const flippedIfEven = (i) => (i % 2 === 0 ? 'star' : 'star-flipped');
  return (
    <div className="star-rating" onMouseLeave={onMouseLeave}>
      {[...Array(10)].map((_, i) => (
        // <FaStarHalf className={flippedIfEven(i)} />
        // <FaStarHalf className={isEven(i) ? 'star' : 'star-flipped'} />
        <FaStar
          className={index - 1 >= i ? `star-filled` : `star`}
          key={`star-${i}`}
          id={`star-${i}`}
          onMouseEnter={onMouseEnter}
        />
      ))}
      {/* <div>
        <FaStarHalf className="star" />
      </div>
      <div>
        <FaStarHalf className="star-flipped" />
      </div>
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" /> */}
    </div>
  );
};

export default StarRating;
