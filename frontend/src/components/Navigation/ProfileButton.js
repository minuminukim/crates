import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import ProfileDropdown from '../ProfileDropdown';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profile-button">
        <FaUserCircle className="profile-button-icon" />
      </button>
      <div className="profile-button" onClick={openMenu}>
        <div className="nav-label">
          <span className="nav-username">{user.username}</span>
          <AiOutlineDown className="caret-down-icon" />
        </div>
      </div>
      {showMenu && <ProfileDropdown user={user} />}
    </>
  );
}

export default ProfileButton;
