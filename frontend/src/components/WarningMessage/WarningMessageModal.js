import { useModal } from '../../hooks';
import WarningMessage from '.';
import { Modal } from '../../context/Modal';

const WarningMessageModal = ({ item, onDelete, children }) => {
  const { showModal: showWarning, toggleModal: toggleWarning } = useModal();

  return (
    <>
      {children(toggleWarning)}
      {showWarning && (
        <Modal onClose={toggleWarning}>
          <WarningMessage item={item} onDelete={onDelete} />
        </Modal>
      )}
    </>
  );
};

export default WarningMessageModal;
