import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { useState } from 'react';
import { DeleteIcon } from '../../components/ActionsPanel/ActionIcons';

const BacklogGrid = ({ onDelete }) => {
  const { userID } = useParams();
  const albumIDs = useSelector((state) => state.backlogs.items[userID]?.albums);
  const albums = useSelector((state) => state.albums.items);
  const sessionUser = useSelector((state) => state.session.user);
  const [hoverIndex, setHoverIndex] = useState(null);
  const handleDelete = (album) => {
    onDelete(album);
    setHoverIndex(null);
  };

  return (
    <ul className="backlog-grid">
      {albumIDs.map((albumID, i) => (
        <li
          key={`backlog-item-${i}`}
          className="album-grid-item"
          onMouseOver={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <ArtWithOverlay albumID={albumID} className="backlog">
            {sessionUser &&
              +userID === sessionUser?.id &&
              hoverIndex !== null &&
              hoverIndex === i && (
                <div className="hover-actions">
                  <DeleteIcon onClick={() => handleDelete(albums[albumID])} />
                </div>
              )}
          </ArtWithOverlay>
        </li>
      ))}
    </ul>
  );
};

export default BacklogGrid;
