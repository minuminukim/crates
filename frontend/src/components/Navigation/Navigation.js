import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LogButton from './LogButton';
import { Modal } from '../../context/Modal';
import LoginFormModal from '../LoginFormModal';
import SearchModal from '../SearchModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
      <ProfileButton user={sessionUser} />
      <LogButton handleLogClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SearchModal />
        </Modal>
      )}
    </>
  ) : (
    <>
      <LoginFormModal />
      <NavLink to="/signup">Sign Up</NavLink>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
