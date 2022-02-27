import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import ProfileDropdown from '../ProfileDropdown';

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  return (
    <>
      <div
        className={`profile-button ${showMenu ? 'active' : 'inactive'}`}
        onMouseOver={openMenu}
        onMouseLeave={() => toggleMenu()}
      >
        <button className="profile-button">
          <FaUserCircle className="profile-button-icon" />
        </button>
        <div className="nav-label">
          <span className="nav-username">{user.username}</span>
          <AiOutlineDown className="caret-down-icon" />
        </div>
        {showMenu && <ProfileDropdown user={user} toggle={toggleMenu} />}
      </div>
    </>
  );
}

export default ProfileButton;
