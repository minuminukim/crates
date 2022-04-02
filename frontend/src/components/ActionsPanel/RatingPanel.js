import { useParams } from 'react-router-dom';
import ActionsRow from './ActionsRow';
import StarRating from '../StarRating';
import { useSelector } from 'react-redux';
import { selectRatingByAlbumAndUserIDs } from '../../store/reviewsReducer';

const RatingPanel = ({ albumID }) => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const rating = useSelector((state) =>
    selectRatingByAlbumAndUserIDs(state, albumID, userID)
  );

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
