import { useState } from 'react';
import { useListen } from '../../hooks';
import { ErrorMessages } from '../ValidationError';
import { MdHearing } from 'react-icons/md';

const ListenIcon = ({ albumID }) => {
  const { onListen, onUnlisten, message, errors, isListened, isLoading } =
    useListen(albumID);
  const [text, setText] = useState(isListened ? 'Listened' : 'Listen');
  const onMouseOver = () => setText(isListened ? 'Remove' : 'Listen');
  const onMouseLeave = () => setText(isListened ? 'Listened' : 'Listen');

  const handleClick = () => {
    if (isLoading) return;
    return isListened ? onUnlisten() : onListen();
  };

  return (
    !isLoading && (
      <>
        <ErrorMessages success={message} errors={errors} />
        <div
          onClick={handleClick}
          className={`icon-container ${isListened ? 'listened' : 'listen'}`}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          <MdHearing className="action-icon" />
          {text && <p className="action-label">{text}</p>}
        </div>
      </>
    )
  );
};

export default ListenIcon;
