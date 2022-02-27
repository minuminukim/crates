import './SearchItem.css';

const SearchItem = ({
  title,
  artist,
  releaseYear,
  onClick = null,
  onMouseDown = null,
}) => {
  return (
    <li className="search-item" onClick={onClick} onMouseDown={onMouseDown}>
      {`${title} (${releaseYear})`}
      <span className="search-item-artist">{artist}</span>
    </li>
  );
};

export default SearchItem;
