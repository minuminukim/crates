import Card from '../Card';
import './CardRow.css';

// items are review objects on homepage
const CardRow = ({ items }) => {
  console.log('items', items);
  return (
    <div className="card-row">
      {items && items.map((item) => <Card key={item.id} item={item} />)}
    </div>
  );
};

export default CardRow;
