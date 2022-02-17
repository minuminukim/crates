import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditReviewForm from '../ReviewForm/EditReviewForm';
import './ReviewActions.css';

const ActionsRow = ({ label, onClick }) => {
  return (
    <li className="actions-row" onClick={onClick}>
      {label}
    </li>
  );
};

const ReviewActions = ({onClick}) => {

  return (
    <ul className="review-actions">
      <li className="actions-row"></li>
      <li className="actions-row"></li>
      <ActionsRow
        label="Edit or delete this review..."
        onClick={onClick}
      />
      <ActionsRow label="Review or log again..." />
      <ActionsRow label="Add this album to lists..." />
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm review={review} />
        </Modal>
      )} */}
    </ul>
  );
};

export default ReviewActions;
