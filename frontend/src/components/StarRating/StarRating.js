import { useState, useEffect } from 'react';
import { FaStarHalf, FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = () => {
  // somehow track mouse movement, fill up to a certain range
  // depending on position, render half or full?
  return (
    <div className="star-rating">
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star-flipped" />
      <FaStarHalf className="star" />
      <FaStar className="star" />
      <FaStar className="star" />
      <FaStar className="star" />
      <FaStar className="star" />
      <FaStar className="star" />
    </div>
  );
};

export default StarRating;
