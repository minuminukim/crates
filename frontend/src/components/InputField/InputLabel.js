import './InputLabel.css';

const InputLabel = ({ label, required = false }) => {
  return (
    <>
      <label className="input-label">
        {required && <span className="required">*</span>}
        {label}
      </label>
    </>
  );
};

export default InputLabel;
