import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginDemo } from '../../store/session';
import Button from '../Button/Button';

import './LandingView.css';

const LandingView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleDemoUser = () =>
    dispatch(loginDemo()).then(() => history.push('/home'));
  return (
    <div>
      <Button
        className="btn-demo-user"
        label="DEMO"
        size="medium"
        onClick={handleDemoUser}
      />
    </div>
  );
};

export default LandingView;
