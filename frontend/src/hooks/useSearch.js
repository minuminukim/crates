import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchAlbums } from '../store/albumsReducer';

const useSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchErrors, setSearchErrors] = useState([]);

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(() => {
      setSearchErrors([]);
      dispatch(searchAlbums(query))
        .then((albums) => {
          setResults(albums);
          setIsLoading(false);
        })
        .catch(async (response) => {
          const data = await response.json();
          if (data && data.errors) {
            setSearchErrors(data.errors);
            setResults([]);
          }
        });
    }, 100);

    return () => clearTimeout(delayedFetchTimer);
  }, [query, dispatch]);

  return { query, setQuery, results, isLoading, searchErrors };
};

export default useSearch;
