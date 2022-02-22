import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <span
        className="nav-label"
        style={{ cursor: 'pointer' }}
        onClick={() => setShowModal(true)}
      >
        SIGN IN
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm handleModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
