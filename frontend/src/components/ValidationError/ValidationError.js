import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './ValidationError.css';

const ValidationError = ({ error }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, [setVisible]);
  return (
    visible && (
      <div
        className="validation-error-component"
        onClick={() => setVisible(false)}
      >
        <p className="validation-error-message">{error}</p>
        <AiOutlineClose
          className="validation-error-close"
          onClick={() => setVisible(false)}
        />
      </div>
    )
  );
};

export default ValidationError;
