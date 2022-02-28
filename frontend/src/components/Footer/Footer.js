import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a
            className="footer-icon"
            href="https://github.com/minuminukim/"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            className="footer-icon"
            href="https://www.linkedin.com/in/minu-kim-911bbb192/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a className="footer-icon" href="mailto:minumoseskim@gmail.com">
            <AiOutlineMail />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
