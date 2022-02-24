import { MdHearing, MdMoreTime } from 'react-icons/md';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoGridSharp } from 'react-icons/io5';
import { DESCRIPTIONS } from './descriptions';

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

const DescriptionCard = ({ message, action }) => {
  const icon = buttonReducer(action);
  return (
    <div className="description-card">
      <div className="card-icon">{icon}</div>
      <p>{message}</p>
    </div>
  );
};

export { DESCRIPTIONS };
export default DescriptionCard;
