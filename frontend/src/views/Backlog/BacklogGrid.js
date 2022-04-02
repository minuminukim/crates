import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { useState } from 'react';
import { DeleteIcon } from '../../components/ActionsPanel/ActionIcons';
import { ErrorMessages } from '../../components/ValidationError';
import { useBacklog } from '../../hooks';

const BacklogGrid = () => {
  const { userID } = useParams();
  const albumIDs = useSelector((state) => state.backlogs.items[userID]?.albums);
  const albums = useSelector((state) => state.albums.items);
  const isSessionUser = useSelector(
    (state) => state.session.user?.id === +userID
  );

  const [hoverIndex, setHoverIndex] = useState(null);
  const { onRemove, errors, message } = useBacklog(+userID);

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
                  <DeleteIcon onClick={() => onRemove(albums[albumID])} />
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
