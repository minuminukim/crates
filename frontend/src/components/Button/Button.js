import './Button.css';

const Button = ({ className, type, label, size, color, onClick }) => {
  return (
    <button
      className={`btn-${size} btn-${color} ${className}`}
      onClick={onClick}
      type={type}
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
};

export default Button;
