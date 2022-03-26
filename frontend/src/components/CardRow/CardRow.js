import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import './CardRow.css';

// items are review objects on homepage
const CardRow = ({ items, reviewIDs, feed }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.items);

  return (
    <div className="card-row">
      {/* {items && items.map((item) => <Card key={item.id} item={item} />)} */}
      {reviewIDs.map((id) => (
        <Card key={id} reviewID={id} />
      ))}
    </div>
  );
};

export default CardRow;
