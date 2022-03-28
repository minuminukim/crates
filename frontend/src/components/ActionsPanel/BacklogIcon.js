import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useBacklog } from '../../hooks';
import { MdMoreTime } from 'react-icons/md';
import { ErrorMessages } from '../ValidationError';

const BacklogIcon = ({ albumID }) => {
  const album = useSelector((state) => state.albums.items[albumID]);
  const userID = useSelector((state) => state.session.user?.id);
  const { onAdd, onRemove, message, errors, isLoading, findAlbum } =
    useBacklog(userID);
  const inBacklog = findAlbum(albumID);
  const [text, setText] = useState(inBacklog ? 'Remove' : 'Backlog');

  const onMouseOver = () => setText(inBacklog ? 'Remove' : 'Backlog');
  const onMouseLeave = () => setText('Backlog');

  const handleClick = () => {
    if (isLoading) return;
    return inBacklog ? onRemove(album) : onAdd(album);
  };

  return (
    !isLoading && (
      <>
        <ErrorMessages success={message} errors={errors} />
        <div
          onClick={handleClick}
          className={`icon-container ${inBacklog ? 'remove' : 'append'}`}
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
