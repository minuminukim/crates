import { MdHearing, MdMoreTime } from 'react-icons/md';

export const ListenIcon = ({
  text = '',
  className,
  onClick,
  onMouseOver,
  onMouseLeave,
}) => {
  return (
    <div
      className={className}
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
      className={className}
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
