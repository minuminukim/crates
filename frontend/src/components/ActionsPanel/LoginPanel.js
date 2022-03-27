import LoginFormModal from '../LoginFormModal';
import ActionsRow from './ActionsRow';

const LoginPanel = () => {
  return (
    <LoginFormModal>
      {(toggleModal) => (
        <ActionsRow
          className="solo logged-off hover"
          label="Sign in to log, rate or review"
          onClick={toggleModal}
        />
      )}
    </LoginFormModal>
  );
};

export default LoginPanel;
