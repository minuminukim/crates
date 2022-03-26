import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserAlbum,
  removeUserAlbum,
  fetchAlbumsByUserID,
} from '../store/albumsReducer';

const useListen = (albumID) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.session.user?.id);
  const album = useSelector((state) => state.albums.items[albumID]);
  const userAlbums = useSelector((state) => state.users[userID]?.albums);
  const isListened = userAlbums && userAlbums.some((id) => id === albumID);

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userAlbums) {
      setLoading(false);
      return;
    }

    dispatch(fetchAlbumsByUserID(userID)).then(
      () => setLoading(false),
      (error) => {
        console.log('error fetching user', error);
      }
    );
  }, [userAlbums, userID]);

  const onListen = () => {
    setErrors([]);
    setMessage('');
    dispatch(addUserAlbum(userID, album))
      .then(() => {
        setMessage(`You have added '${album.title}' to your albums.`);
      })
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const onUnlisten = () => {
    setErrors([]);
    setMessage('');
    dispatch(removeUserAlbum(userID, albumID))
      .then(() => {
        setMessage(`You have removed '${album.title}' from your albums.`);
      })
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return {
    onUnlisten,
    onListen,
    message,
    errors,
    isListened,
    isLoading,
  };
};

export default useListen;
