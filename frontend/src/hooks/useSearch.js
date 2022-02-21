import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchAlbums } from '../store/albumsReducer';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(() => {
      return dispatch(searchAlbums(query))
        .then((albums) => setResults(albums))
        .then(() => setIsLoading(false))
        .catch((error) => setError(error));
    }, 1000);

    return () => clearTimeout(delayedFetchTimer);
  }, [query, dispatch]);

  return { query, setQuery, results, isLoading, error };
};

export default useSearch;
