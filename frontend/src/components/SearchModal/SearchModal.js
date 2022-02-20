import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAlbums } from '../../store/albumsReducer';
import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import './SearchModal.css';

const SearchModal = ({ closeSearch = null }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  // const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { items, errors, isLoading } = useSelector((state) => state.albums);

  /** TODO:
   * error handling
   * useMemo && memoize query results?
   */

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(async () => {
      const albums = await dispatch(searchAlbums(query));
      setResults(albums);
      console.log('albums', results);
    }, 1000);

    return () => clearTimeout(delayedFetchTimer);
  }, [query, dispatch]);

  const handleChange = (e) => setQuery(e.target.value);

  return (
    <form className="search-modal" onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        <h1 className="search-modal-heading">ADD TO YOUR ALBUMS...</h1>
      </div>
      <div className="form-section">
        <div className="form-input-group">
          <label htmlFor="search" className="form-label">
            Name of Album
          </label>
          <SearchBar value={query} onChange={handleChange} id="search" />
        </div>
      </div>
      {results.length > 0 && (
        <SearchList items={results} closeSearch={closeSearch} />
      )}
    </form>
  );
};

export default SearchModal;
