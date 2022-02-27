import HoverInfo from '../HoverInfo';
import { FaTrash } from 'react-icons/fa';
import { MdModeEditOutline } from 'react-icons/md';

const CommentIcon = ({
  text,
  onClick,
  onMouseOver,
  onMouseOut,
  showInfo,
  type,
}) => {
  return (
    <div className="comment-icon-wrapped" style={{ position: 'relative' }}>
      {showInfo && <HoverInfo text={text} className="comment-info" />}
      {type === 'edit' ? (
        <MdModeEditOutline
          className="comment-icon edit"
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        />
      ) : (
        <FaTrash
          className="comment-icon delete"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default CommentIcon;
