import './InputLabel.css';

const InputLabel = ({ label, required = false, children }) => {
  return (
    <>
      <label className="input-label">
        {required && <span className="required">*</span>}
        {label}
        {children}
      </label>
    </>
  );
};

export default InputLabel;
