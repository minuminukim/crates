import { useDemo } from '../../hooks';
import Button from '../../components/Button';
import DescriptionCard, { DESCRIPTIONS } from './DescriptionCard';
import './Landing.css';

const Landing = () => {
  const { handleDemoUser } = useDemo();

  return (
    <>
      <div className="page-container landing-page">
        <div className="backdrop"></div>
        <div className="credit-container">
          <a
            className="credit-link"
            href="https://www.erezavissar.com/"
            rel="noreferrer"
            target="_blank"
          >
            <span className="credit-link">
              † DJ Rashad †, DJ Spinn, Traxman (2013), Photo by{' '}
            </span>
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
        <div>
          <Button
            className="btn-demo-user"
            label="GET STARTED –– DEMO"
            onClick={handleDemoUser}
          />
        </div>
        <section className="descriptions">
          <h2 className="section-heading">CRATES LETS YOU...</h2>
          <ul className="landing-cards">
            {DESCRIPTIONS.map(({ message, action }, i) => (
              <li className="landing-card" key={`description-${message}`}>
                <DescriptionCard
                  key={`description-${message}`}
                  message={message}
                  action={action}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Landing;
