import { MdHearing, MDMoreTime } from 'react-icons/md';
import { useState } from 'react';

// decouple buisness (listened) from UI (text & color)
const ListenIcon = ({ text, onClick, onMouseOver, onMouseLeave }) => {
  return (
    <div
      onClick={onClick}
      className={className}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <MdHearing className="action-icon" />
      <p className="action-label">{text}</p>
    </div>
  );
};

const ActionIconContainer = ({
  onClick,
  onMouseOver,
  onMouseLeave,
  className,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={className}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

const ListenIcon = (text = '') => {
  <div>
    <MdHearing className="action-icon" />
    {text && <p className="action-label">{text}</p>}
  </div>;
};

const BacklogIcon = 

export default ListenIcon;
