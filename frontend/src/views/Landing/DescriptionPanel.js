import { MdHearing, MdMoreTime } from 'react-icons/md';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoGridSharp } from 'react-icons/io5';

const buttonReducer = (action) => {
  switch (action) {
    case 'TRACK':
      return <MdHearing />;
    case 'REVIEW':
      return <BiMenuAltLeft />;
    case 'LIST':
      return <IoGridSharp />;
    default:
      return null;
    case 'BACKLOG':
      return <MdMoreTime />;
    case 'RATE':
      return <FaStar />;
    case 'DIARY':
      return <BsFillCalendarFill />;
  }
};

const DescriptionPanel = ({ message, action, color }) => {
  const icon = buttonReducer(action);
  return (
    <li className={`description-panel hover-${color}`}>
      <div className="card-icon">{icon}</div>
      <p>{message}</p>
    </li>
  );
};

export default DescriptionPanel;
