import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm';
import './ReviewActions.css';

const ActionsRow = ({ label, onClick }) => {
  return (
    <li className="actions-row" onClick={onClick}>
      {label}
    </li>
  );
};

const ReviewActions = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ul className="review-actions">
      <li className="actions-row"></li>
      <li className="actions-row"></li>
      <ActionsRow
        label="Edit or delete this review..."
        onClick={() => setShowModal(true)}
      />
      <ActionsRow label="Review or log again..." />
      <ActionsRow label="Add this album to lists..." />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm />
        </Modal>
      )}
    </ul>
  );
};

export default ReviewActions;
