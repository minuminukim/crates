import AlbumArt from '../AlbumArt';
import Details from './Details';
import './ReviewListItem.css';

const ReviewListItem = ({
  review,
  className = '',
  shape,
  withArt = true,
  showInfo = true,
}) => {
  const album = review?.album;
  return (
    <div className={`review-list-item ${className} ${shape}`}>
      <div className="review-list-item-art">
        {withArt && (
          <AlbumArt
            title={album.title}
            artworkURL={album.artworkURL}
            size="small"
          />
        )}
        {shape === 'block' && (
          <div className="review-list-details">
            <Details review={review} album={album} shape={shape} />
          </div>
        )}
      </div>
      <div className="review-list-item-main">
        {shape !== 'block' && (
          <Details
            review={review}
            album={album}
            shape={shape}
            showInfo={showInfo}
          />
        )}
        <p className="review-list-item-body">{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewListItem;
