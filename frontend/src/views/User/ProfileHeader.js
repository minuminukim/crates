import { FaUserCircle } from 'react-icons/fa';

const ProfileHeader = ({ username }) => {
  return (
    <>
      <FaUserCircle />
      <h1>{username}</h1>
    </>
  );
};

export default ProfileHeader;
