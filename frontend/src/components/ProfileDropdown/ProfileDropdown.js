import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './ProfileDropdown.css';

const DropdownItem = ({ label, link, onClick = null }) => {
  return (
    <li className="dropdown-item">
      <NavLink className="dropdown-link" exact to={link} onClick={onClick}>
        {label}
      </NavLink>
    </li>
  );
};

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <ul className="profile-dropdown">
      <DropdownItem label="Home" link="/" />
      <DropdownItem label="Profile" link="#" />
      <DropdownItem label="Albums" link="#" />
      <DropdownItem label="Diary" link="#" />
      <DropdownItem label="Reviews" link={`/users/${user.id}/reviews`} />
      <DropdownItem label="Backlog" link="#" />
      <DropdownItem label="Lists" link={`/users/${user.id}/lists`} />
      {/* <DropdownItem label="Logout" link="{`/users/`} onClick={handleLogout} /> */}
      <li>
        <button onClick={handleLogout}>Log Out</button>
      </li>
    </ul>
  );
};

export default ProfileDropdown;
