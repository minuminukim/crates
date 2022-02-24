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
      <DropdownItem label="Profile" link={`/users/${user.id}`} />
      <DropdownItem label="Albums" link={`/users/${user.id}/albums`} />
      <DropdownItem label="Diary" link={`/users/${user.id}/diary`} />
      <DropdownItem label="Reviews" link={`/users/${user.id}/reviews`} />
      <DropdownItem label="Backlog" link={`/users/${user.id}/backlog`} />
      <DropdownItem label="Lists" link={`/users/${user.id}/lists`} />
      {/* <DropdownItem label="Logout" link="{`/users/`} onClick={handleLogout} /> */}
      <li>
        <button onClick={handleLogout}>Log Out</button>
      </li>
    </ul>
  );
};

export default ProfileDropdown;
