import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { useHistory } from 'react-router-dom';
import { MdHearing, MdMoreTime } from 'react-icons/md';
import { appendBacklog } from '../../store/backlogsReducer';
import { fetchUserBacklog } from '../../store/albumsReducer';
import ValidationError from '../ValidationError';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const backlog = useSelector((state) => state.backlogs[sessionUser?.id]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listened, setListened] = useState(null);
  const [isBacklogItem, setIsBacklogItem] = useState(null);
  const [text, setText] = useState('');
  const [backlogText, setBacklogText] = useState('Backlog');

  // TODO: set up dispatch for removing an item
  // depending on state, click event will dispatch one or the other
  useEffect(() => {
    dispatch(fetchUserBacklog(sessionUser?.id))
      .then((items) => items.some((item) => item.spotifyID === album.spotifyID))
      .then((found) => {
        if (found) {
          setIsBacklogItem(true);
          // setListened(true);
          // setText('Listened');
        } else {
          setIsBacklogItem(false);
          // setListened(false);
          // setText('Listen');
        }
        setLoading(false);
      })
      .catch((error) => history.push('/not-found'));
  }, [dispatch, sessionUser?.id]);

  const onAdd = () => {
    setErrors([]);
    dispatch(appendBacklog(album, sessionUser.id))
      .then((response) => console.log('response', response))
      .catch(async (error) => {
        const data = await error.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <ActionsRow className="listen-actions">
        {!loading && (
          <div
            className={`action ${listened ? 'listened' : 'listen'}`}
            onMouseOver={() => (listened ? setText('Remove') : null)}
            onMouseLeave={() => (listened ? setText('Listened') : null)}
          >
            <MdHearing className="action-icon" />
            <p className="action-label">Listen</p>
          </div>
        )}
        <div
          className={`action ${isBacklogItem ? 'remove' : 'append'}`}
          onMouseOver={() => (isBacklogItem ? setBacklogText('Remove') : null)}
          onMouseLeave={() =>
            isBacklogItem ? setBacklogText('Backlog') : null
          }
        >
          <MdMoreTime className="action-icon" onClick={() => onAdd()} />
          <p className="action-label">{backlogText}</p>
        </div>
      </ActionsRow>
      <ul className="validation-errors">
        {errors.length > 0 &&
          errors.map((error, i) => (
            <ValidationError key={`error-${i}`} error={error} />
          ))}
      </ul>
    </>
  );
};

export default ListenActions;
