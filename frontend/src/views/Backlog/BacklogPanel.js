import { useState } from 'react';
import { useBacklog, useSearch } from '../../hooks';
import { SearchField } from '../../components/Search';
import { SearchItem } from '../../components/Search';
import { ErrorMessages } from '../../components/ValidationError';

const BacklogPanel = ({ userID }) => {
  const [showList, setShowList] = useState(false);
  const { query, setQuery, results, searchErrors, isLoading } = useSearch();
  const { message, errors, onAdd } = useBacklog(userID);

  const handleSearchChange = (e) => setQuery(e.target.value);

  return (
    <div className="side-panel">
      <ErrorMessages success={message} errors={errors} />
      <div>
        <h3 className="section-heading">HOW TO ADD</h3>
        <p>
          Add albums you want to hear to your backlog by clicking the Backlog
          icon in the actions panel on a review page, or input a search in the
          field below.
        </p>
      </div>
      <div>
        <h3 className="section-heading">ADD AN ALBUM</h3>
        <SearchField
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          error={searchErrors}
        />
        {showList && !isLoading && (
          <ul className={`search-list ${showList ? 'absolute' : 'block'}`}>
            {results.map((item) => (
              <SearchItem
                key={item.spotifyID}
                title={item.title}
                artist={item.artist}
                releaseYear={item.releaseYear}
                onMouseDown={() => onAdd(item)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BacklogPanel;
