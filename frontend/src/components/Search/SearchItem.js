import './SearchItem.css';

const SearchItem = ({ title, artist, releaseYear, onClick }) => {
  return (
    <li className="search-item" onClick={onClick}>
      {`${title} (${releaseYear})`}
      <span className="search-item-artist">{artist}</span>
    </li>
  );
};

export default SearchItem;
