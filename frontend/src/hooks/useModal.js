import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return {
    showModal,
    toggleModal,
  };
};

export default useModal;
