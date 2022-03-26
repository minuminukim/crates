import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  appendBacklog,
  removeFromBacklog,
  fetchBacklogByUserID,
} from '../store/backlogsReducer';

const useBacklog = (albumID) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.session.user?.id);
  const backlog = useSelector((state) => state.backlogs.items[userID]);
  const album = useSelector((state) => state.albums.items[albumID]);
  const inBacklog = backlog && backlog.albums.some((id) => id === albumID);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (backlog) {
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

  const onAdd = () => {
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

  const onRemove = () => {
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
    inBacklog,
    message,
    errors,
    onRemove,
    onAdd,
  };
};

export default useBacklog;
