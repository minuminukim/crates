import Button from './Button';
import './Button.css';

export const SaveButton = ({ onClick, disabled = false }) => {
  return (
    <Button
      className="btn-save"
      type="submit"
      label="SAVE"
      size="medium"
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export const DeleteButton = ({ onClick = null }) => {
  return (
    <Button
      className="btn-delete"
      type="submit"
      label="DELETE"
      size="medium"
      onClick={onClick}
    />
  );
};
