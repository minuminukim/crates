import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { CommentForm } from '.';

const EditCommentModal = ({ onEdit, body, commentID, children }) => {
  const { showModal, toggleModal } = useModal();

  return (
    <>
      {children(toggleModal)}
      {showModal && (
        <Modal onClose={toggleModal}>
          <CommentForm
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
