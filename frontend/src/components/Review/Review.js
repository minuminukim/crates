import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import ReviewBody from './ReviewBody';
import AlbumArt from '../AlbumArt';
import ReviewActions from './ReviewActions';
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const { items, isLoading } = useSelector((state) => state.reviews);
  const review = Object.values(items)?.find((item) => item.id === +reviewID);
  const album = review?.album;

  useEffect(() => {
    if (review) return;
    dispatch(getSingleReview(reviewID));
  }, [dispatch]);

  return (
    !isLoading && (
      <div className="page-container review-page">
        <div>
          <AlbumArt
            title={album.title}
            artworkURL={album.artworkURL}
            size="medium"
          />
        </div>
        <div className="review-page-middle">
          <ReviewBody review={review} />
        </div>
        <div>
          <ReviewActions />
        </div>
      </div>
    )
  );
};

export default Review;
