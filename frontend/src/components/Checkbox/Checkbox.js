import { useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const Checkbox = ({ value, onChange, className, children }) => {
  const hiddenInput = useRef(null);
  
  return (
    <>
      <div
        className={`replace-checkbox ${className}`}
        onClick={() => hiddenInput.current.click()}
      >
        {value && <AiOutlineCheck id="list-form-check" />}
      </div>
      <input
        type="checkbox"
        value={value}
        checked={value}
        ref={hiddenInput}
        onChange={onChange}
        hidden
      />
      {children}
    </>
  );
};

export default Checkbox;
