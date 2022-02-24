import './Button.css';

const Button = ({ className, type, label, size, color, onClick, disabled }) => {
  return (
    <button
      className={`btn-${size} btn-${color} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  type: 'button',
  label: null,
  size: 'medium',
  color: '',
  onClick: null,
  disabled: false,
};

export default Button;
