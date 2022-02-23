import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { useHistory } from 'react-router-dom';
import { MdHearing, MdMoreTime } from 'react-icons/md';
import { appendBacklog, removeFromBacklog } from '../../store/backlogsReducer';
import { fetchUserBacklog } from '../../store/backlogsReducer';
import { getUserAlbums } from '../../store/albumsReducer';
import ValidationError, {
  SuccessMessage,
  ErrorMessages,
} from '../ValidationError';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const backlog = useSelector((state) => state.backlogs[sessionUser?.id]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listened, setListened] = useState(null);
  const [inBacklog, setInBacklog] = useState(null);
  const [listenText, setListenText] = useState('');
  const [message, setMessage] = useState('');
  const [backlogText, setBacklogText] = useState('Backlog');

  useEffect(() => {
    dispatch(fetchUserBacklog(sessionUser?.id))
      .then((items) => items.some((item) => item.spotifyID === album.spotifyID))
      .then((found) => (found ? setInBacklog(true) : setInBacklog(false)))
      .then(() => dispatch(getUserAlbums(sessionUser.id)))
      .then((items) => items.some((item) => item.albumID === album.id))
      .then((found) => {
        if (found) {
          setListened(true);
          setListenText('Listened');
        } else {
          setListened(false);
          setListenText('Listen');
        }
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, [dispatch, sessionUser.id]);

  const onAdd = () => {
    setErrors([]);
    setMessage('');
    dispatch(appendBacklog(album, sessionUser.id))
      .then((response) => console.log('response', response))
      .then(() => setInBacklog(true))
      .then(() => setLoading(false))
      .then(() => setMessage(`You have added ${album.title} to your backlog.`))
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

  const onListen = () => {
    setErrors([]);
    setMessage('');
    dispatch()
  }

  return (
    !loading && (
      <>
        <ActionsRow className="listen-actions">
          <div
            className={`action hover ${listened ? 'listened' : 'listen'}`}
            onMouseOver={() => (listened ? setListenText('Remove') : null)}
            onMouseLeave={() => (listened ? setListenText('Listened') : null)}
          >
            <MdHearing className="action-icon" />
            <p className="action-label">{listenText}</p>
          </div>

          <div
            className={`action hover ${inBacklog ? 'remove' : 'append'}`}
            onMouseOver={() => (inBacklog ? setBacklogText('Remove') : null)}
            onMouseLeave={() => setBacklogText('Backlog')}
          >
            <MdMoreTime
              className="action-icon"
              onClick={() => (inBacklog ? onRemove() : onAdd())}
            />
            <p className="action-label">{backlogText}</p>
          </div>
        </ActionsRow>
        <ErrorMessages success={message} errors={errors} />
        {/* {message.length > 0 && (
        <div className="success-container">
          <SuccessMessage message={message} />
        </div>
      )}
      <ul className="validation-errors">
        {errors.length > 0 &&
          errors.map((error, i) => (
            <ValidationError key={`error-${i}`} error={error} />
          ))}
      </ul> */}
      </>
    )
  );
};

export default ListenActions;
