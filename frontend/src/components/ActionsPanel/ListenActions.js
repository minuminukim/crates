import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { fetchUserBacklog } from '../../store/backlogsReducer';
import { getUserAlbums } from '../../store/albumsReducer';
import { ErrorMessages } from '../ValidationError';
import { useListen, useBacklog } from '../../hooks';
import { ListenIcon, BacklogIcon } from './ActionIcons';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listenText, setListenText] = useState('');
  const [backlogText, setBacklogText] = useState('Backlog');

  const {
    onListen,
    onUnlisten,
    setListened,
    listenSuccess,
    listenErrors,
    listened,
  } = useListen(album);

  const {
    inBacklog,
    setInBacklog,
    backlogSuccess,
    backlogErrors,
    onAdd,
    onRemove,
  } = useBacklog(album);

  useEffect(() => {
    (async () => {
      try {
        const [backlogAlbums, userAlbums] = await Promise.all([
          dispatch(fetchUserBacklog(sessionUser?.id)),
          dispatch(getUserAlbums(sessionUser?.id)),
        ]);

        setInBacklog(
          backlogAlbums.some((item) => item.spotifyID === album.spotifyID)
        );

        const inUserAlbums = userAlbums.some(
          (item) => item.spotifyID === album.spotifyID
        );

        setListened(inUserAlbums);
        setListenText(inUserAlbums ? 'Listened' : 'Listen');
        setLoading(false);
      } catch (response) {
        const data = await response.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }
    })();
  }, [dispatch, sessionUser.id]);

  const updateListen = () => {
    if (listened) {
      onUnlisten();
    } else {
      onListen();

      if (inBacklog) {
        onRemove();
      }
    }
  };

  return (
    !loading && (
      <>
        <ActionsRow className="listen-actions">
          <ListenIcon
            text={listenText}
            onClick={updateListen}
            className={listened ? 'listened' : 'listen'}
            onMouseOver={() => setListenText(listened ? 'Remove' : 'Listen')}
            onMouseLeave={() => setListenText(listened ? 'Listened' : 'Listen')}
          />
          <BacklogIcon
            text={backlogText}
            className={inBacklog ? 'remove' : 'append'}
            onMouseOver={() => setBacklogText(inBacklog ? 'Remove' : 'Backlog')}
            onMouseLeave={() => setBacklogText('Backlog')}
            onClick={() => (inBacklog ? onRemove() : onAdd())}
          />
        </ActionsRow>
        <ErrorMessages success={listenSuccess} errors={listenErrors} />
        <ErrorMessages success={backlogSuccess} errors={backlogErrors} />
      </>
    )
  );
};

export default ListenActions;
