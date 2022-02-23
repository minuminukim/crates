import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchAlbums } from '../store/albumsReducer';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchErrors, setSearchErrors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(() => {
      setSearchErrors([])
      return dispatch(searchAlbums(query))
        .then((albums) => setResults(albums))
        .then(() => setIsLoading(false))
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) {
            setSearchErrors(data.errors);
            setResults([])
          }
        });
    }, 1000);

    return () => clearTimeout(delayedFetchTimer);
  }, [query, dispatch]);

  return { query, setQuery, results, isLoading, searchErrors };
};

export default useSearch;
