import SearchItem from '../SearchItem';
import './SearchList.css';

const SearchList = ({ items }) => {
  return (
    <ul className="search-list">
      {items.map((item) => (
        <SearchItem
          key={item.title}
          title={item.title}
          artist={item.artist}
          releaseYear={item.releaseYear}
        />
      ))}
    </ul>
  );
};

export default SearchList;
