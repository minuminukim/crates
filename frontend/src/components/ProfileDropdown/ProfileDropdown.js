import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';
import './ProfileDropdown.css';

const DropdownItem = ({ label, link, onClick = null }) => {
  return (
    <NavLink className="dropdown-link" exact to={link} onClick={onClick}>
      <li className="dropdown-item">{label}</li>
    </NavLink>
  );
};

const ProfileDropdown = ({ toggle }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="dropdown-wrap" onMouseLeave={() => toggle()}>
      <ul className="profile-dropdown" onMouseLeave={() => toggle()}>
        <DropdownItem label="Home" link="/" onClick={() => toggle()} />
        <DropdownItem
          label="Profile"
          link={`/users/${user.id}`}
          onClick={() => toggle()}
        />
        <DropdownItem
          label="Albums"
          link={`/users/${user.id}/albums`}
          onClick={() => toggle()}
        />
        <DropdownItem
          label="Diary"
          link={`/users/${user.id}/diary`}
          onClick={() => toggle()}
        />
        <DropdownItem
          label="Reviews"
          link={`/users/${user.id}/reviews`}
          onClick={() => toggle()}
        />
        <DropdownItem
          label="Backlog"
          link={`/users/${user.id}/backlog`}
          onClick={() => toggle()}
        />
        <DropdownItem
          label="Lists"
          link={`/users/${user.id}/lists`}
          onClick={() => toggle()}
        />
        <DropdownItem label="Logout" link={`/`} onClick={handleLogout} />
      </ul>
    </div>
  );
};

export default ProfileDropdown;
