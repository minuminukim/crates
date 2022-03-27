import { useModal } from '../../hooks';
import { EditReviewForm } from '.';
import { Modal } from '../../context/Modal';

const EditReviewModal = ({ review, album, reviewID, albumID, children }) => {
  const { showModal: showEditModal, toggleModal: toggleEditModal } = useModal();

  return (
    <>
      {children(toggleEditModal)}
      {showEditModal && (
        <Modal onClose={toggleEditModal}>
          <EditReviewForm
            reviewID={reviewID}
            albumID={albumID}
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
