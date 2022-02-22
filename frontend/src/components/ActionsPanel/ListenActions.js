import { useSelector } from 'react-redux';
import { ActionsRow } from '.';
import { MdHearing, MdMoreTime } from 'react-icons/md';

const ListenActions = () => {
  const sessionUser = useSelector((state) => state.session.user);
  
  return (
    <ActionsRow className="listen-actions">
      <div className="action-icon">
        <MdHearing className="action-icon" />
        <p className="action-label">Listen</p>
      </div>
      <div className="action-icon">
        <MdMoreTime className="action-icon" />
        <p className="action-label">Backlog</p>
      </div>
    </ActionsRow>
  );
};

export default ListenActions;
