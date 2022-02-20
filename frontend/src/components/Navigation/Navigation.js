import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiSearchAlt } from 'react-icons/bi';
import ProfileButton from './ProfileButton';
import LogButton from './LogButton';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SearchModal from '../SearchModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showSearch, setShowSearch] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      {/* <LogButton handleLogClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SearchModal />
        </Modal>
      )} */}
    </>
  ) : (
    <>
      <LoginFormModal />
      <NavLink to="/signup">Sign Up</NavLink>
    </>
  );

  return (
    <nav className="nav">
      <div className="nav-logo">
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
          <NavLink className="nav-label" exact to="#">
            LISTS
          </NavLink>
        </li>
        <li>
          <BiSearchAlt className="nav-label search-icon" />
        </li>
        <li>
          <LogButton handleLogClick={() => setShowSearch(true)} />
          {isLoaded && showSearch && (
            <Modal onClose={() => setShowSearch(false)}>
              <SearchModal closeSearch={() => setShowSearch(false)} />
            </Modal>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
