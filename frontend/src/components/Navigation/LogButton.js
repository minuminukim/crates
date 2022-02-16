import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai';
import './LogButton.css';

const LogButton = ({ handleLogClick, handleToggleClick }) => {
  return (
    <button className="log-button">
      <div className="log-button-left" onClick={handleLogClick}>
        <AiOutlinePlus />
        <p>LOG</p>
      </div>
      <span className="log-button-toggle" onClick={handleToggleClick}>
        <AiOutlineDown />
      </span>
    </button>
  );
};

export default LogButton;
