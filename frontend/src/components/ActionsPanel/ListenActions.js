import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { fetchBacklogByUserID } from '../../store/backlogsReducer';
import { getUserAlbums } from '../../store/albumsReducer';
import { ErrorMessages } from '../ValidationError';
import { useListen, useBacklog } from '../../hooks';
import { ListenIcon } from './ActionIcons';
import BacklogIcon from './BacklogIcon';


const ListenActions = ({ albumID }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.items[albumID]);
  const user = useSelector((state) => {
    const sessionUser = state.session.user;
    return sessionUser ? state.users[sessionUser.id] : null;
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listenText, setListenText] = useState('');

  const {
    onListen,
    onUnlisten,
    setListened,
    listenSuccess,
    listenErrors,
    listened,
  } = useListen(album);

  // const {
  //   inBacklog,
  //   setInBacklog,
  //   backlogSuccess,
  //   backlogErrors,
  //   onAdd,
  //   onRemove,
  // } = useBacklog(album);

  useEffect(() => {
    // if (backlog) {
    //   setLoading(false);
    //   return;
    // }

    (async () => {
      try {
        const [backlogAlbums, userAlbums] = await Promise.all([
          dispatch(fetchBacklogByUserID(sessionUser?.id)),
          dispatch(getUserAlbums(sessionUser?.id)),
        ]);

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

      // if (inBacklog) {
      //   onRemove();
      // }
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
            // text={backlogText}
            albumID={albumID}
            // className={inBacklog ? 'remove' : 'append'}
            // onMouseOver={() => setBacklogText(inBacklog ? 'Remove' : 'Backlog')}
            // onMouseLeave={() => setBacklogText('Backlog')}
            // onClick={() => (inBacklog ? onRemove() : onAdd())}
          />
        </ActionsRow>
        <ErrorMessages success={listenSuccess} errors={listenErrors} />
        {/* <ErrorMessages success={backlogSuccess} errors={backlogErrors} /> */}
      </>
    )
  );
};

export default ListenActions;
