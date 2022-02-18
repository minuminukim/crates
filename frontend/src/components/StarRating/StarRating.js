import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ reviewRating = 0 }) => {
  const [rating, setRating] = useState(reviewRating);
  const [hoverIndex, setHoverIndex] = useState(0); // hoverRating

  const grabIndex = (e) => +e.target.id.split('-').pop();
  const onMouseEnter = (e) => setHoverIndex(grabIndex(e));
  const onMouseLeave = () => setHoverIndex(0);
  const onClick = (e) => {
    // setHoverIndex(grabIndex(e));
    setRating(grabIndex(e));
  };

  // const onMouseLeave = () => {
  //   if (rating !== null) return;
  //   setIndex(0);
  // };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <FaStar
          // className={hoverIndex - 1 >= i ? `star-filled` : `star`}
          className={i < (hoverIndex || rating) ? `star-filled` : `star`}
          key={`star-${i}`}
          id={`star-${i}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default StarRating;
