import { useModal } from '../../hooks';
import { EditReviewForm } from '.';
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
            toggleModal={toggleEditModal}
          />
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;
