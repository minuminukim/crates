import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MdMoreTime } from 'react-icons/md';
import { appendBacklog, removeFromBacklog } from '../../store/backlogsReducer';
import { ErrorMessages } from '../ValidationError';
import './HoverActions.css';

const HoverActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const backlogs = useSelector((state) => state.backlogs);
  const dispatch = useDispatch();
  const [inBacklog, setInBacklog] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionUser?.id in backlogs) {
      const found = backlogs[sessionUser.id].some(
        (id) => id === album.spotifyID
      );
      setInBacklog(found);
    }
  }, [dispatch, sessionUser.id, backlogs]);

  const onAdd = () => {
    setErrors([]);
    setMessage('');
    dispatch(appendBacklog(album, sessionUser.id))
      .then(() => {
        setInBacklog(true);
        setLoading(false);
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
      .then(() => setInBacklog(false))
      .then(() =>
        setMessage(`You have removed '${album.title}' from your backlog.`)
      )
      .then(() => setLoading(false))
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <span className="hover-actions">
        <MdMoreTime
          className="hover-icon"
          onClick={() => (inBacklog ? onRemove() : onAdd())}
        />
      </span>
      <ErrorMessages success={message} errors={errors} />
    </>
  );
};

export default HoverActions;
