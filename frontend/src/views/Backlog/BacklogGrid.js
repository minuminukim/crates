import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { useState } from 'react';
import { DeleteIcon } from '../../components/ActionsPanel/ActionIcons';
import { removeFromBacklog } from '../../store/backlogsReducer';
import { ErrorMessages } from '../../components/ValidationError';

const BacklogGrid = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const albumIDs = useSelector((state) => state.backlogs.items[userID]?.albums);
  const albums = useSelector((state) => state.albums.items);
  const sessionUser = useSelector((state) => state.session.user);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [hoverIndex, setHoverIndex] = useState(null);
  const isSessionUser = sessionUser?.id === +userID;

  const onDelete = (album) => {
    setStatus('pending');
    setMessage('');
    setErrors([]);

    dispatch(removeFromBacklog(album?.id, +userID))
      .then(() => {
        setStatus('fulfilled');
        setMessage(`You have removed '${album.title}' from your backlog.`);
      })
      .catch(async (res) => {
        setStatus('rejected');
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
      .finally(() => {
        setStatus('idle');
        setHoverIndex(null);
      });
  };
  
  return (
    <>
      <ErrorMessages success={message} errors={errors} />
      <ul className="backlog-grid">
        {albumIDs.map((albumID, i) => (
          <li
            key={`backlog-item-${i}`}
            className="album-grid-item"
            onMouseOver={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <ArtWithOverlay albumID={albumID} className="backlog">
              {isSessionUser && hoverIndex === i && (
                <div className="hover-actions">
                  <DeleteIcon onClick={() => onDelete(albums[albumID])} />
                </div>
              )}
            </ArtWithOverlay>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BacklogGrid;
