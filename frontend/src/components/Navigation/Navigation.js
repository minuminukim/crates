import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LogButton from './LogButton';
import { Modal } from '../../context/Modal';
import SearchModal from '../SearchModal';
import NavLogo from '../../images/decal-dots.png';
import UnauthenticatedLinks from './UnauthenticatedLinks';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showSearch, setShowSearch] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const navigationType = sessionUser ? 'main' : 'landing';

  return (
    <nav className={`nav ${navigationType}`}>
      <div className="nav-wrap">
        <div className="nav-logo">
          <img src={NavLogo} alt="Logo" />
          <NavLink className="nav-logo" exact to="/">
            CRATES
          </NavLink>
        </div>
        <ul className="nav-links">
          {isLoaded &&
            (sessionUser ? <ProfileButton /> : <UnauthenticatedLinks />)}
          <li className="nav-link">
            <NavLink className="nav-label" exact to="/albums">
              ALBUMS
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink className="nav-label" exact to="/lists">
              LISTS
            </NavLink>
          </li>
          {sessionUser && (
            <li className="nav-link">
              <LogButton handleLogClick={() => setShowSearch(true)} />
              {isLoaded && showSearch && (
                <Modal onClose={() => setShowSearch(false)}>
                  <SearchModal closeSearch={() => setShowSearch(false)} />
                </Modal>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
