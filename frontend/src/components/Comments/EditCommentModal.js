import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { CommentForm } from '.';
import CommentIcon from './CommentIcon';
import './EditCommentModal.css';

const EditCommentModal = ({ commentID }) => {
  const body = useSelector((state) => state.comments[commentID]?.body);
  const { showModal, toggleModal } = useModal();
  const [isHovering, setHovering] = useState(false);

  return (
    <>
      <CommentIcon
        text="Edit Comment"
        type="edit"
        onClick={toggleModal}
        onMouseOver={() => setHovering(true)}
        onMouseOut={() => setHovering(false)}
        showInfo={isHovering}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <CommentForm
            className="edit-comment-modal"
            isPost={false}
            toggle={toggleModal}
            initialBody={body}
            commentID={commentID}
          />
        </Modal>
      )}
    </>
  );
};

export default EditCommentModal;
