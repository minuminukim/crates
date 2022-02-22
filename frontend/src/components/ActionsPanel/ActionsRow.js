import { Link } from 'react-router-dom';
import './ActionsRow.css';

const ActionsRow = ({
  label = "",
  onClick,
  className,
  link = null,
  children = null,
}) => {
  return (
    <li className={`actions-row ${className}`} onClick={onClick}>
      {link ? <Link to={link}>{label}</Link> : <p>{label}</p>}
      {children}
    </li>
  );
};

export default ActionsRow;
