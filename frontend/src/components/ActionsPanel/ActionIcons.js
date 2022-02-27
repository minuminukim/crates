import { MdHearing, MdMoreTime } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import HoverInfo from '../HoverInfo';

export const ListenIcon = ({
  text = '',
  className,
  onClick,
  onMouseOver,
  onMouseLeave,
}) => {
  return (
    <div
      onClick={onClick}
      className={`icon-container ${className}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <MdHearing className="action-icon" />
      {text && <p className="action-label">{text}</p>}
    </div>
  );
};

export const BacklogIcon = ({
  text = '',
  className,
  onClick,
  onMouseOver,
  onMouseLeave,
}) => {
  return (
    <div
      onClick={onClick}
      className={`icon-container ${className}`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <MdMoreTime className="action-icon" />
      {text && <p className="action-label">{text}</p>}
    </div>
  );
};

export const DeleteIcon = ({ onClick }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <>
      <FaTrash
        className="action-icon remove"
        onClick={onClick}
        onMouseOver={() => setShowHover(true)}
        onMouseLeave={() => setShowHover(false)}
      />
      {showHover && <HoverInfo className="hover-remove" text="Remove album" />}
    </>
  );
};
