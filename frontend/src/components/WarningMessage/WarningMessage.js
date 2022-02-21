import { useModal } from '../../hooks';
import { Modal } from '../../context/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import Button, { DeleteButton } from '../Button';

const WarningMessage = ({ item, toggle, onDelete }) => {
  return (
    <div className="warning-message">
      <h3>PLEASE CONFIRM</h3>
      <AiOutlineClose onClick={toggle} />
      <p>Are you sure you want to delete this {item}?</p>
      <Button
        className="btn-cancel"
        label="CANCEL"
        size="medium"
        onClick={toggle}
      />
      <DeleteButton onClick={onDelete} />
    </div>
  );
};

export default WarningMessage;
