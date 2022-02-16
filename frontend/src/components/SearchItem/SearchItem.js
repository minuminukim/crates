import './SearchItem.css';

const SearchItem = ({ title, artist, releaseYear }) => {
  return (
    <li className="search-item">
      {`${title} (${releaseYear})`}
      <span className="search-item-artist">{artist}</span>
    </li>
  );
};

export default SearchItem;
