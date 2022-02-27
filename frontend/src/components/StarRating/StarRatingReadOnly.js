import { FaStar } from 'react-icons/fa';

const StarRatingReadOnly = ({ rating, className = null, size = 'medium', children }) => {
  return (
    <div className="star-rating read-only">
      {[...Array(Math.floor(rating / 2))].map((_, i) => (
        <FaStar
          key={`star-filled-read-${i}`}
          className={`star-filled-read star-${size} ${className}`}
        />
      ))}
      {children}
    </div>
  );
};

export default StarRatingReadOnly;
