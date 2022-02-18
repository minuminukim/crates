import './InputField.css';

const InputField = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  error,
  min,
  max,
}) => {
  return (
    <div className="input-field-container">
      <input
        type={type}
        name={id}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-field` + (error ? 'error-field' : '')}
        min={min}
        max={max}
      />
      {error && <p className="validation-error">{error}</p>}
    </div>
  );
};

InputField.defaultProps = {
  type: 'text',
  placeholder: null,
  error: null,
  min: null,
  max: null,
};

export default InputField;
