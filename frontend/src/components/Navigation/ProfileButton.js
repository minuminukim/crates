import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineDown } from 'react-icons/ai';
import ProfileDropdown from '../ProfileDropdown';

function ProfileButton() {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  return (
    <>
      <li>
        <div
          className={`profile-button ${showMenu ? 'active' : 'inactive'}`}
          onMouseOver={openMenu}
          onMouseLeave={() => toggleMenu()}
        >
          <div className="dropdown-button-row">
            <button className="profile-button">
              <FaUserCircle className="profile-button-icon" />
            </button>
            <div className="nav-label">
              <span className="nav-username">{user.username}</span>
              <AiOutlineDown className="caret-down-icon" />
            </div>
          </div>
          {showMenu && <ProfileDropdown user={user} toggle={toggleMenu} />}
        </div>
      </li>
    </>
  );
}

export default ProfileButton;
