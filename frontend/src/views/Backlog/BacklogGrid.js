import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { ArtWithOverlay } from '../../components/AlbumArt';
import { useState } from 'react';
import HoverInfo from '../../components/HoverInfo';

const BacklogGrid = ({ albums, onDelete }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { userID } = useParams();
  const [showHover, setShowHover] = useState(false);

  return (
    <ul className="backlog-grid">
      {albums.map((album, i) => (
        <li key={`backlog-item-${i}`} className="album-grid-item">
          <ArtWithOverlay album={album} className="backlog">
            {sessionUser && +userID === sessionUser?.id && (
              <FaTrash
                className="remove icon"
                onClick={() => onDelete(album)}
                onMouseOver={() => setShowHover(true)}
                onMouseLeave={() => setShowHover(false)}
              />
            )}
            {/* {showHover && <HoverInfo text="Remove album" />} */}
          </ArtWithOverlay>
        </li>
      ))}
    </ul>
  );
};

export default BacklogGrid;
