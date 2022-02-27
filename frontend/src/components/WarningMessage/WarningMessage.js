import { AiOutlineClose } from 'react-icons/ai';
import Button, { DeleteButton } from '../Button';
import './WarningMessage.css';

const WarningMessage = ({ item, toggle, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    toggle();
  };

  return (
    <div className="warning-message-container">
      <section className="message-header">
        <h3 className="modal-heading">PLEASE CONFIRM</h3>
        <AiOutlineClose onClick={toggle} className="close-icon" />
      </section>
      <p className="warning-message">
        Are you sure you want to delete this {item}?
      </p>
      <section className="warning-btns">
        <Button
          className="btn-cancel"
          label="CANCEL"
          size="medium"
          onClick={toggle}
        />
        <DeleteButton onClick={handleDelete} />
      </section>
    </div>
  );
};

export default WarningMessage;
