import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { MdHearing, MdMoreTime } from 'react-icons/md';
import { appendBacklog } from '../../store/backlogsReducer';
import { fetchUserBacklog } from '../../store/albumsReducer';
import ValidationError from '../ValidationError';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const backlog = useSelector((state) => state.backlogs[sessionUser?.id]);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listened, setListened] = useState(null);

  // TODO: set up dispatch for removing an item
  // depending on state, click event will dispatch one or the other
  useEffect(() => {
    dispatch(fetchUserBacklog(sessionUser?.id))
      .then((items) => items.some((item) => item.spotifyID === album.spotifyID))
      .then((found) => (found ? setListened(true) : setListened(false)))
      .then(() => setLoading(false));
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
          <div className="action-icon">
            <MdHearing className="action-icon" />
            {listened ? (
              <p className="action-label">already listened</p>
            ) : (
              <p className="action-label">Listen</p>
            )}
          </div>
        )}
        <div className="action-icon">
          <MdMoreTime className="action-icon" onClick={() => onAdd()} />
          <p className="action-label">Backlog</p>
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
