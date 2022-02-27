import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAlbum, removeUserAlbum } from '../store/albumsReducer';

const useListen = (album) => {
  const [listened, setListened] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onListen = () => {
    setErrors([]);
    setMessage('');
    dispatch(addUserAlbum(sessionUser.id, album))
      .then(() => {
        setListened(true);
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
    dispatch(removeUserAlbum(sessionUser.id, album.id))
      .then(() => {
        setListened(false);
        setMessage(`You have removed '${album.title}' from your albums.`);
      })
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleListen = () => (listened ? onUnlisten() : onListen());

  return {
    handleListen,
    listenSuccess: message,
    listenErrors: errors,
    setListened,
    listened,
  };
};

export default useListen;
