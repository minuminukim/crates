import { useParams } from 'react-router-dom';
import ActionsRow from './ActionsRow';
import StarRating from '../StarRating';
import { useSelector } from 'react-redux';

const RatingPanel = ({ albumID }) => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  
  // Iterate over the current user's reviews to find most recent
  // rating associated with the current album
  const rating = useSelector((state) => {
    if (!userID) return 0;

    // Sort in descending order because we want the most recent rating
    const foundID = state.users[userID].reviews
      ?.slice()
      .sort((a, b) => b - a)
      .find((id) => {
        const current = state.reviews.items[id];
        return current?.albumID === review.albumID;
      });

    return foundID ? state.reviews.items[foundID].rating : 0;
  });

  return (
    <ActionsRow
      className="action-row-rated"
      label={rating ? 'Rated' : 'Not Rated'}
      key={reviewID}
    >
      <StarRating reviewRating={rating} readOnly={true} />
    </ActionsRow>
  );
};

export default RatingPanel;
