import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDown, AiOutlinePlus } from 'react-icons/ai';
import './LogButton.css';

const LogButton = ({ handleLogClick, handleToggleClick }) => {
  const [showButton, setShowButton] = useState(false);

  const openButton = () => {
    if (showButton) return;
    setShowButton(true);
  };

  useEffect(() => {
    if (!showButton) return;

    const closeButton = () => {
      setShowButton(false);
    };

    document.addEventListener('click', closeButton);

    return () => document.removeEventListener('click', closeButton);
  }, [showButton]);

  return (
    <div className="log-button-container">
      <button className="log-button">
        <div className="log-button-left" onClick={handleLogClick}>
          <AiOutlinePlus />
          <p>LOG</p>
        </div>
        <span className="log-button-toggle" onClick={openButton}>
          <AiOutlineDown />
        </span>
      </button>
      {showButton && (
        // <div className="btn-link">
        <Link className="btn-link" to="/lists/new">
          Start a new list...
        </Link>
        // </div>
      )}
    </div>
  );
};

export default LogButton;
