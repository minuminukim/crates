import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginDemo } from '../store/session';

const useDemo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDemoUser = () => {
    dispatch(loginDemo()).then(() => history.push('/'));
  };

  return { handleDemoUser };
};

export default useDemo;
