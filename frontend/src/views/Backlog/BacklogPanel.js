import { useSearch } from '../../hooks';
import { SearchField } from '../../components/Search';
import { useState } from 'react';
import { SearchItem } from '../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { appendBacklog } from '../../store/backlogsReducer';
import { ErrorMessages } from '../../components/ValidationError';

const BacklogPanel = ({ userID }) => {
  const dispatch = useDispatch();
  const albumIDs = useSelector((state) => state.backlogs.items[userID]?.albums);
  const albums = useSelector((state) => {
    if (!albumIDs) return [];
    return albumIDs.map((id) => state.albums.items[id]);
  });

  const [showList, setShowList] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const { query, setQuery, results, searchErrors, isLoading } = useSearch();

  const handleSearchChange = (e) => setQuery(e.target.value);

  const onAdd = (album) => {
    setStatus('pending');
    setMessage('');
    setErrors([]);

    setStatus('pending');
    const inBacklog = albums.some(
      ({ spotifyID }) => spotifyID === album.spotifyID
    );
    if (inBacklog) {
      setErrors(['Albums in a backlog must be unique.']);
      setStatus('rejected');
    } else {
      dispatch(appendBacklog(album, +userID))
        .then(() => {
          setMessage(`You have added '${album.title}' to your backlog.`);
          setStatus('fulfilled');
        })
        .catch(async (error) => {
          setStatus('rejected');
          const data = await error.json();
          if (data && data.errors) {
            setErrors([...errors, ...data.errors]);
          }
        });
    }
  };

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
