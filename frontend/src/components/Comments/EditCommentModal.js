import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { CommentForm } from '.';
import './EditCommentModal.css';

const EditCommentModal = ({ onEdit, body, commentID, children }) => {
  const { showModal, toggleModal } = useModal();

  return (
    <>
      {children(toggleModal)}
      {showModal && (
        <Modal onClose={toggleModal}>
          <CommentForm
            className="edit-comment-modal"
            method="PUT"
            toggle={toggleModal}
            onSuccess={onEdit}
            initialBody={body}
            commentID={commentID}
          />
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;
