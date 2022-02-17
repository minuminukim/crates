import Card from '../Card';
import './CardRow.css';

// should be receiving reviews, not albums
const CardRow = ({ albums }) => {
  return (
    <div className="card-row">
      {albums &&
        albums.map((album) => {
          <Card album={album} />;
        })}
    </div>
  );
};

export default CardRow;
