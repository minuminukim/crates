import { AppendList } from '.';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';

const AppendListModal = ({ album, children }) => {
  const { showModal: showListModal, toggleModal: toggleListModal } = useModal();

  return (
    <>
      {children(toggleListModal)}
      {showListModal && (
        <Modal onClose={toggleListModal}>
          <AppendList album={album} onClose={toggleListModal} />
        </Modal>
      )}
    </>
  );
};

export default AppendListModal;
