import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './ValidationError.css';

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [setVisible]);

  return (
    visible && (
      <li className="success-message-alert" onClick={() => setVisible(false)}>
        <p className="success-message">{message}</p>
        <AiOutlineClose
          className="success-message-close"
          onClick={() => setVisible(false)}
        />
      </li>
    )
  );
};

export default SuccessMessage;
