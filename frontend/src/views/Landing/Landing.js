import { useDemo } from '../../hooks';
import Button from '../../components/Button';
import DescriptionPanel from './DescriptionPanel';
import { DESCRIPTIONS } from '../../constants';
import './Landing.css';

const Landing = () => {
  const { handleDemoUser } = useDemo();

  return (
    <>
      <div className="backdrop">
        <a
          className="credit-link"
          href="https://www.erezavissar.com/"
          rel="noreferrer"
          target="_blank"
        >
          <span className="details">
            † DJ Rashad †, DJ Spinn, Traxman (2013), Photo by{' '}
          </span>
          Erez Avissar.
        </a>
      </div>
      <div className="page-container landing-page">
        <div className="hero">
          <h1 className="hero-heading">
            Track albums you've listened to.
            <br /> Save those you want to hear.
            <br /> Tell your friends what's good.
          </h1>
        </div>
        <div>
          <Button
            className="btn-demo-user"
            label="GET STARTED –– DEMO"
            onClick={handleDemoUser}
          />
        </div>
        <section className="descriptions">
          <h2 className="section-heading">CRATES LETS YOU...</h2>
          <ul className="landing-panels">
            {DESCRIPTIONS.map(({ message, action, color }) => (
              <DescriptionPanel
                key={`description-${message}`}
                message={message}
                action={action}
                color={color}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Landing;
