import { FaUserCircle } from 'react-icons/fa';

const ProfileHeader = ({ username }) => {
  return (
    <>
      <FaUserCircle className="user-avatar" />
      <h1>{username}</h1>
    </>
  );
};

export default ProfileHeader;
