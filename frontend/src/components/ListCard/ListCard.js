import { Link } from 'react-router-dom';
import { ListSpread } from '.';
import './ListCard.css';

const ListCard = ({ list, size = 'medium' }) => {
  const albums = list?.albums;

  return (
    <div className={`list-card list-card-${size}`}>
      <ListSpread albums={albums} listID={list.id} gap={30} size={size} />
      <div>
        <Link to={`/lists/${list.id}`} className="list-card-title">
          {list.title}
        </Link>
      </div>
    </div>
  );
};

export default ListCard;
