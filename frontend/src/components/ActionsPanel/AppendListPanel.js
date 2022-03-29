import ActionsRow from './ActionsRow';
import { AppendList } from '.';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';

const AppendListPanel = ({ album }) => {
  const { showModal, toggleModal } = useModal();

  return (
    <>
      <ActionsRow
        label="Add this album to a list..."
        className="hover"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <AppendList album={album} onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default AppendListPanel;
