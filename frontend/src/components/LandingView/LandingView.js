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
    <div className="page-container landing-page">
      {/* <div className="backdrop-container"> */}
        <div className="backdrop"></div>
      {/* </div> */}
      <div className="credit-container">
        <span className="credit-link">
          DJ Rashad, DJ Spinn, Traxman (2013), Photo by{' '}
        </span>
        <a
          className="credit-link"
          href="https://www.erezavissar.com/"
          target="_blank"
        >
          Erez Avissar.
        </a>
      </div>
      <div className="hero">
        <h1 className="hero-heading">
          Track albums you've listened to.
          <br /> Save those you want to hear.
          <br /> Tell your friends what's good.
        </h1>
      </div>
      <Button
        className="btn-demo-user"
        label="GET STARTED –– DEMO"
        // size="medium"
        onClick={handleDemoUser}
      />
    </div>
  );
};

export default LandingView;
