import { useSelector } from 'react-redux';
import AlbumArt from '../AlbumArt';
import Details from './Details';
import './ReviewListItem.css';

const ReviewListItem = ({
  className = '',
  shape,
  withArt = true,
  showInfo = true,
  reviewID,
}) => {
  const review = useSelector((state) => state.reviews.items[reviewID]);

  return (
    <div className={`review-list-item ${className} ${shape}`}>
      <div className="review-list-item-art">
        {withArt && <AlbumArt albumID={review?.albumID} size="small" />}
        {shape === 'block' && (
          <div className="review-list-details">
            <Details
              albumID={review?.albumID}
              reviewID={reviewID}
              shape={shape}
            />
          </div>
        )}
      </div>
      <div className="review-list-item-main">
        {shape !== 'block' && (
          <Details
            reviewID={reviewID}
            albumID={review?.albumID}
            shape={shape}
            showInfo={showInfo}
          />
        )}
        <p className="review-list-item-body">{review?.body}</p>
      </div>
    </div>
  );
};

export default ReviewListItem;
