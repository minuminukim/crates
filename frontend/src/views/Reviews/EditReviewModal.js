import { useModal } from '../../hooks';
import { EditReviewForm } from '.';
import { Modal } from '../../context/Modal';

const EditReviewModal = ({ review, album, children }) => {
  const { showModal: showEditModal, toggleModal: toggleEditModal } = useModal();

  return (
    <>
      {children(toggleEditModal)}
      {showEditModal && (
        <Modal onClose={toggleEditModal}>
          <EditReviewForm
            review={review}
            album={album}
            onClose={toggleEditModal}
            onSuccess={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
