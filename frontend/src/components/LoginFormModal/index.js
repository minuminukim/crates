import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { useModal } from '../../hooks';

function LoginFormModal({ children }) {
  // const [showModal, setShowModal] = useState(false);
  const { showModal, toggleModal } = useModal();

  return (
    <>
      {!children && (
        <span
          className="nav-label"
          style={{ cursor: 'pointer' }}
          onClick={toggleModal}
        >
          SIGN IN
        </span>
      )}
      {children && children(toggleModal)}
      {showModal && (
        <Modal onClose={toggleModal}>
          <LoginForm handleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
