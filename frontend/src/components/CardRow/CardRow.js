import { useSelector } from 'react-redux';
import { selectMostRecentReviews } from '../../store/reviewsReducer';
import Card from '../Card';
import './CardRow.css';

const CardRow = ({ reviewIDs }) => {
  const mostRecentlyListened = useSelector((state) =>
    selectMostRecentReviews(state, reviewIDs)
  );

  return (
    <div className="card-row">
      {mostRecentlyListened?.slice(0, 4).map((id) => (
        <Card key={id} reviewID={id} />
      ))}
    </div>
  );
};

export default CardRow;
