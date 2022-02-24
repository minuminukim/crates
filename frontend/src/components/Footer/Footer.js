import { FaLinkedin, FaGithub } from 'react-icons/fa';
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
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            className="footer-icon"
            href="https://www.linkedin.com/in/minu-kim-911bbb192/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
