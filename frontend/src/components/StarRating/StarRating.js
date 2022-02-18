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
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <FaStar
          // className={hoverIndex - 1 >= i ? `star-filled` : `star`}
          className={i + 1 <= (hoverIndex || rating) ? `star-filled` : `star`}
          key={`star-${i}`}
          id={`star-${i}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
