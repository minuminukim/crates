import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = () => {
  // somehow track mouse movement, fill up to a certain range
  // depending on position, render half or full?
  const ifEven = (i) => (i % 2 === 0 ? 'star' : 'star-flipped');
  return (
    <div className="star-rating">
      {Array(10).map((_, i) => (
        <FaStarHalf className={ifEven(i)} />
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
