import { useState } from 'react';
import { SearchField, SearchItem } from '../../components/Search';
import { useSearch } from '../../hooks';

const ListFormSearch = ({ albums, updateAlbums, updateErrors }) => {
  const [showList, setShowList] = useState(false);
  const { query, setQuery, results, isLoading, searchErrors } = useSearch();
  const showResults = !isLoading && results?.length > 0;

  const handleMouseDown = (item) => {
    updateErrors([]);
    const inList = albums.some(({ spotifyID }) => spotifyID === item.spotifyID);

    if (inList) {
      updateErrors(['Albums in a list must be unique.']);
    } else {
      updateAlbums([...albums, item]);
      setShowList(false);
    }
  };

  return (
    <div className="search-field">
      <SearchField
        query={query}
        error={searchErrors}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowList(true)}
        onBlur={() => setShowList(false)}
      />
      {!searchErrors.length && showList && (
        <ul className={`search-list ${showList ? 'absolute' : 'block'}`}>
          {showResults &&
            results.map((item) => (
              <SearchItem
                key={item.spotifyID}
                title={item.title}
                artist={item.artist}
                releaseYear={item.releaseYear}
                onMouseDown={() => handleMouseDown(item)}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default ListFormSearch;
