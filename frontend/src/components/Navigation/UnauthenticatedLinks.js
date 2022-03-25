import LoginFormModal from '../LoginFormModal';
import SignupModal from '../SignupForm';
import { useDemo } from '../../hooks';

const UnauthenticatedLinks = () => {
  const { handleDemoUser } = useDemo();

  return (
    <>
      <li className="nav-link">
        <LoginFormModal />
      </li>
      <li className="nav-link">
        <SignupModal />
      </li>
      <li className="nav-link">
        <span className="nav-label" onClick={handleDemoUser}>
          TRY DEMO
        </span>
      </li>
    </>
  );
};

export default UnauthenticatedLinks;
