import { FaStar } from 'react-icons/fa';

const StarRatingReadOnly = ({ rating, className = null }) => {
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

export default StarRatingReadOnly;
