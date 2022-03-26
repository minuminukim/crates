import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useBacklog } from '../../hooks';
import { fetchBacklogByUserID } from '../../store/backlogsReducer';
import { MdMoreTime } from 'react-icons/md';
import { ErrorMessages } from '../ValidationError';

const BacklogIcon = ({ albumID }) => {
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.session.user?.id);
  const backlog = useSelector((state) => state.backlogs.items[userID]);
  const inBacklog = backlog && backlog.albums.some((id) => id === albumID);
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState(inBacklog ? 'Remove' : 'Backlog');
  const action = inBacklog ? 'remove' : 'append';

  const { onAdd, onRemove, message, errors } = useBacklog(albumID);

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

  const onMouseOver = () => setText(inBacklog ? 'Remove' : 'Backlog');
  const onMouseLeave = () => setText('Backlog');

  return (
    !isLoading && (
      <>
        <ErrorMessages success={message} errors={errors} />
        <div
          onClick={inBacklog ? onRemove : onAdd}
          className={`icon-container ${action}`}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          <MdMoreTime className="action-icon" />
          {text && <p className="action-label">{text}</p>}
        </div>
      </>
    )
  );
};

export default BacklogIcon;
