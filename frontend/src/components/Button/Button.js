import './Button.css';

const Button = ({ className, type, label, size, onClick }) => {
  return (
    <button
      className={`btn-${size} ${className}`}
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
  onClick: null,
};

export default Button;
