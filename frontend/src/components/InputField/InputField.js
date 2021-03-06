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
  hidden,
  checked,
  onFocus,
  onBlur,
}) => {
  return (
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
      hidden={hidden}
      checked={checked}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

InputField.defaultProps = {
  type: 'text',
  placeholder: null,
  error: null,
  min: null,
  max: null,
  hidden: false,
  checked: null,
  onFocus: null,
  onBlur: null,
};

export default InputField;
