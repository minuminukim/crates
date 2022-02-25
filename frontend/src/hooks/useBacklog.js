import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appendBacklog, removeFromBacklog } from '../store/backlogsReducer';

const useBacklog = (album) => {
  const [inBacklog, setInBacklog] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onAdd = () => {
    setErrors([]);
    setMessage('');
    dispatch(appendBacklog(album, sessionUser.id))
      .then(() => {
        setInBacklog(true);
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
    dispatch(removeFromBacklog(album.id, album.spotifyID, sessionUser.id))
      .then(() => {
        setInBacklog(false);
        setMessage(`You have removed '${album.title} from your backlog.'`);
      })

      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleBacklog = () => (inBacklog ? onRemove() : onAdd());

  return {
    inBacklog,
    setInBacklog,
    backlogSuccess: message,
    backlogErrors: errors,
    handleBacklog,
  };
};

export default useBacklog;
