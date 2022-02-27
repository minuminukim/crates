import {
  AiOutlineClose,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import AlbumArt from '../AlbumArt';

const DraggableListItem = ({
  title,
  year,
  artworkURL,
  index,
  isRanked = false,
  length,
  onRemoveItem,
  onSwapItems,
}) => {
  return (
    <li className="draggable-list-item">
      <div className="list-item-info">
        {isRanked && (
          <div className="list-index">
            <p className="list-index">{index + 1}</p>
          </div>
        )}
        <AlbumArt title={title} artworkURL={artworkURL} size="tiny" />
        <h3 className="title">{title}</h3>
        <p className="year">{year}</p>
      </div>
      <div className="list-item-controls">
        <AiOutlineArrowUp
          className="list-item-move"
          onClick={() => (index === 0 ? null : onSwapItems(index, index - 1))}
        />
        <AiOutlineArrowDown
          className="list-item-move"
          onClick={() =>
            index + 1 === length ? null : onSwapItems(index, index + 1)
          }
        />
        <AiOutlineClose
          className="list-item-remove"
          onClick={() => onRemoveItem(index)}
        />
      </div>
    </li>
  );
};

export default DraggableListItem;
