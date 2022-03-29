import { useModal } from '../../hooks';
import { EditReviewForm } from '.';
import { ActionsRow } from '../../components/ActionsPanel';
import { Modal } from '../../context/Modal';

const EditReviewModal = ({ reviewID, albumID, children }) => {
  const { showModal: showEditModal, toggleModal: toggleEditModal } = useModal();

  return (
    <>
      {children(toggleEditModal)}
      {showEditModal && (
        <Modal onClose={toggleEditModal}>
          <EditReviewForm
            reviewID={reviewID}
            albumID={albumID}
            onClose={toggleEditModal}
            onSuccess={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
