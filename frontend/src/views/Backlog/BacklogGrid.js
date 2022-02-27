import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { useState } from 'react';
import { DeleteIcon } from '../../components/ActionsPanel/ActionIcons';

const BacklogGrid = ({ albums, onDelete }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { userID } = useParams();
  const [hoverIndex, setHoverIndex] = useState(null);
  const handleDelete = (album) => {
    onDelete(album);
    setHoverIndex(null);
  };

  return (
    <ul className="backlog-grid">
      {albums.map((album, i) => (
        <li
          key={`backlog-item-${i}`}
          className="album-grid-item"
          onMouseOver={() => setHoverIndex(i)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <ArtWithOverlay album={album} className="backlog">
            {sessionUser &&
              +userID === sessionUser?.id &&
              hoverIndex !== null &&
              hoverIndex === i && (
                <div className="hover-actions">
                  <DeleteIcon onClick={() => handleDelete(album)} />
                </div>
              )}
          </ArtWithOverlay>
        </li>
      ))}
    </ul>
  );
};

export default BacklogGrid;
