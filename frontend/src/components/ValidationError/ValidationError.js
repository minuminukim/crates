import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './ValidationError.css';

const ValidationError = ({ error, index = 0 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000 + index * 5000);
    return () => clearTimeout(timer);
  }, [setVisible, index]);

  return (
    visible && (
      <li
        className="validation-error-component"
        onClick={() => setVisible(false)}
      >
        <p className="validation-error-message">{error}</p>
        <AiOutlineClose
          className="validation-error-close"
          onClick={() => setVisible(false)}
        />
      </li>
    )
  );
};

export default ValidationError;
