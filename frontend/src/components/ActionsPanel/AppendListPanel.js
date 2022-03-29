import AppendListModal from './AppendListModal';
import ActionsRow from './ActionsRow';

const AppendListPanel = ({ album }) => {
  return (
    <AppendListModal album={album}>
      {(toggleListModal) => (
        <ActionsRow
          label="Add this album to a list..."
          className="hover"
          onClick={toggleListModal}
        />
      )}
    </AppendListModal>
  );
};

export default AppendListPanel;
