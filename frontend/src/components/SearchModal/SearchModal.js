import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import './SearchModal.css';

const SearchModal = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  /** TODO:
   * error handling
   * useMemo && memoize query results?
   */

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(() => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      };

      csrfFetch('/api/search', options)
        .then((response) => response.json())
        .then((data) => setResults(data.albums))
        .catch((err) => {
          console.log('errors', err);
          setErrors(err);
        });
    }, 1000);

    return () => clearTimeout(delayedFetchTimer);
  }, [query]);

  const handleChange = (e) => setQuery(e.target.value);

  return (
    <form className="search-modal">
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
      {results.length > 0 && <SearchList items={results} />}
    </form>
  );
};

export default SearchModal;
