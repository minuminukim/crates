import { NavLink, useRouteMatch } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const UserNavigation = ({ user }) => {
  const { url } = useRouteMatch();

  return (
    <nav className="user-nav">
      <ul className="nav-links">
        <li>
          <NavLink exact to={`${url}`} className="nav-label">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/albums`} className="nav-label">
            Albums
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/diary`} className="nav-label">
            Diary
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`} className="nav-label">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/backlog`} className="nav-label">
            Backlog
          </NavLink>
        </li>
        <li>
          <NavLink to={`${url}/lists`} className="nav-label">
            Lists
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavigation;
