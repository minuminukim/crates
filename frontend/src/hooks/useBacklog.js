import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  appendBacklog,
  removeFromBacklog,
  fetchBacklogByUserID,
} from '../store/backlogsReducer';

const useBacklog = (userID) => {
  const dispatch = useDispatch();
  const backlog = useSelector((state) => state.backlogs.items[userID]);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (backlog || !userID) {
      setLoading(false);
      return;
    }

    setLoading(true);
    dispatch(fetchBacklogByUserID(userID)).then(
      () => setLoading(false),
      (error) => {
        console.log('error fetching backlog', error);
      }
    );
  }, [dispatch, userID, backlog]);

  const findAlbum = (albumID) =>
    backlog && backlog?.albums.some((id) => id === albumID);

  const onAdd = (album) => {
    setErrors([]);
    setMessage('');
    dispatch(appendBacklog(album, userID))
      .then(() => {
        setMessage(`You have added '${album.title}' to your backlog.`);
      })
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const onRemove = (album) => {
    setErrors([]);
    setMessage('');
    dispatch(removeFromBacklog(album.id, userID))
      .then(() => {
        setMessage(`You have removed '${album.title}' from your backlog.`);
      })
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return {
    isLoading,
    message,
    errors,
    onRemove,
    onAdd,
    findAlbum,
  };
};

export default useBacklog;
