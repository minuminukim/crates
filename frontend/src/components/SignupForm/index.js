import { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

const SignupModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span className="nav-label" onClick={() => setShowModal(true)}>
        CREATE ACCOUNT
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default SignupModal;
