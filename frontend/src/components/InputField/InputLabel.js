import './InputLabel.css';

const InputLabel = ({ label, required = false, children, className = '' }) => {
  return (
    <>
      <label className={`input-label ${className}`}>
        {required && <span className="required">*</span>}
        {label}
        {children}
      </label>
    </>
  );
};

export default InputLabel;
