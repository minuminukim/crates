import { useModal } from '../../hooks';
import { ReviewForm } from '.';
import { Modal } from '../../context/Modal';

const PostReviewModal = ({ album, children }) => {
  const { showModal: showPostModal, toggleModal: togglePostModal } = useModal();

  return (
    <>
      {children(togglePostModal)}
      {showPostModal && (
        <Modal onClose={togglePostModal}>
          <ReviewForm album={album} onSuccess={togglePostModal} />
        </Modal>
      )}
    </>
  );
};

export default PostReviewModal;
