import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LogButton from './LogButton';
import { Modal } from '../../context/Modal';
import { useDemo } from '../../hooks';
import LoginFormModal from '../LoginFormModal';
import SignupModal from '../SignupForm';
import SearchModal from '../SearchModal';
import navLogo from '../../images/decal-dots.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showSearch, setShowSearch] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const { handleDemoUser } = useDemo();

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
      <LoginFormModal />
      <SignupModal />
      <span className="nav-label" onClick={handleDemoUser}>
        TRY DEMO
      </span>
    </>
  );

  return (
    <nav className="nav">
      <div className="nav-wrap">
        <div className="nav-logo">
          <img src={navLogo} alt="Logo" />
          <NavLink className="nav-logo" exact to="/">
            CRATES
          </NavLink>
        </div>
        <ul className="nav-links">
          {isLoaded && sessionLinks}
          <li>
            <NavLink className="nav-label" exact to="/albums">
              ALBUMS
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-label" exact to="/lists">
              LISTS
            </NavLink>
          </li>
          <li>
            {sessionUser && (
              <LogButton handleLogClick={() => setShowSearch(true)} />
            )}
            {isLoaded && showSearch && (
              <Modal onClose={() => setShowSearch(false)}>
                <SearchModal closeSearch={() => setShowSearch(false)} />
              </Modal>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
