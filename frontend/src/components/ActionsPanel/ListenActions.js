import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { MdHearing, MdMoreTime } from 'react-icons/md';
import { fetchUserBacklog } from '../../store/backlogsReducer';
import { getUserAlbums } from '../../store/albumsReducer';
import { ErrorMessages } from '../ValidationError';
import { useListen, useBacklog } from '../../hooks';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listenText, setListenText] = useState('');
  const [backlogText, setBacklogText] = useState('Backlog');
  const { handleListen, setListened, listenSuccess, listenErrors, listened } =
    useListen(album);
  const {
    inBacklog,
    setInBacklog,
    backlogSuccess,
    backlogErrors,
    handleBacklog,
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
    handleListen();
    if (inBacklog) {
      setInBacklog(false);
    }
    return;
  };

  return (
    !loading && (
      <>
        <ActionsRow className="listen-actions">
          <div
            onClick={updateListen}
            className={`icon-container ${listened ? 'listened' : 'listen'}`}
            onMouseOver={() =>
              setListenText(`${listened ? 'Remove' : 'Listen'}`)
            }
            onMouseLeave={() =>
              setListenText(`${listened ? 'Listened' : 'Listen'}`)
            }
          >
            <MdHearing className="action-icon" />
            <p className="action-label">{listenText}</p>
          </div>
          <div
            className={`icon-container ${inBacklog ? 'remove' : 'append'}`}
            onMouseOver={() => setBacklogText(inBacklog ? 'Remove' : 'Backlog')}
            onMouseLeave={() => setBacklogText('Backlog')}
          >
            <MdMoreTime className="action-icon" onClick={handleBacklog} />
            <p className="action-label">{backlogText}</p>
          </div>
        </ActionsRow>
        <ErrorMessages success={listenSuccess} errors={listenErrors} />
        <ErrorMessages success={backlogSuccess} errors={backlogErrors} />
      </>
    )
  );
};

export default ListenActions;
