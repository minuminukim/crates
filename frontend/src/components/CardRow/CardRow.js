import { useSelector } from 'react-redux';
import Card from '../Card';
import './CardRow.css';

// items are review objects on homepage
const CardRow = ({ reviewIDs }) => {
  const mostRecentlyListened = useSelector((state) => {
    return [...reviewIDs]
      .sort((a, b) => {
        const left = state.reviews.items[a];
        const right = state.reviews.items[b];
        return new Date(right.listenedDate) - new Date(left.listenedDate);
      })
      .slice(0, 4);
  });

  return (
    <div className="card-row">
      {mostRecentlyListened.map((id) => (
        <Card key={id} reviewID={id} />
      ))}
    </div>
  );
};

export default CardRow;
