import './ActionsRow.css';

const ActionsRow = ({ label, onClick, children = null, className }) => {
  return (
    <li className={`actions-row ${className}`} onClick={onClick}>
      <p>{label}</p>
      {children}
    </li>
  );
};

export default ActionsRow;
