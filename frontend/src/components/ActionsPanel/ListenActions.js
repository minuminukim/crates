import { ActionsRow } from '.';
import ListenIcon from './ListenIcon';
import BacklogIcon from './BacklogIcon';

const ListenActions = ({ albumID }) => {
  return (
    <ActionsRow className="listen-actions">
      <ListenIcon albumID={albumID} />
      <BacklogIcon albumID={albumID} />
    </ActionsRow>
  );
};

export default ListenActions;
