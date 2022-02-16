import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';
import SearchItem from '../SearchItem';
import './SearchBar.css';

const SearchBar = ({ placeholder = null }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetch = setTimeout(() => {
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
    }, 2000);

    return () => clearTimeout(delayedFetch);
  }, [query]);

  const handleChange = (e) => setQuery(e.target.value);
  // useMemo && memoize queries?

  return (
    <>
      {errors.length >= 0 &&
        errors.values.map((err) => <li>{err.message || err.statusText}</li>)}
      <form className="search">
        <input
          type="text"
          className="search-input"
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <input type="submit" hidden />
      </form>
      {results.length > 0 &&
        results.map((item) => (
          <SearchItem
            key={item.title}
            title={item.title}
            artist={item.artist}
            releaseYear={item.releaseYear}
          />
        ))}
    </>
  );
};

export default SearchBar;
