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
    console.log('rating before', rating);
    console.log('hoverIndex before', hoverIndex);
    setRating(grabIndex(e) + 1);
    console.log('rating after click', rating);
    console.log('hoverIndex after', hoverIndex);
  };

  // const onMouseLeave = () => {
  //   if (rating !== null) return;
  //   setIndex(0);
  // };
  const onDivEnter = () => {
    // setRating(0);
    setHoverIndex(0);
  };

  const onDivLeave = () => {
    setRating(reviewRating);
  };

  const isFilled = (i) => i + 1 <= (hoverIndex || rating);
  const isFlipped = (i) => (i % 2 === 0 ? 'normal' : 'flipped');
  const position = (i) => (i % 2 === 0 ? 'left' : 'right');
  // width 26px, half-width 13px
  return (
    <div className="star-rating">
      {[...Array(10)].map((_, i) => (
        <div className="star-container" key={`star-${i}`}>
          <FaStar
            className={`star star-${isFilled(i)} star-${position(i)}`}
            // key={`star-${i}`}
            id={`star-${i}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => setRating(i + 1)}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
