import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchAlbums } from '../store/albumsReducer';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query.length) {
      setResults([]);
      return;
    }

    const delayedFetchTimer = setTimeout(async () => {
      try {
        const albums = await dispatch(searchAlbums(query));
        setResults(albums);
      } catch (error) {
        console.log('error', error);
      }
    }, 1000);

    return () => clearTimeout(delayedFetchTimer);
  }, [dispatch]);
};
