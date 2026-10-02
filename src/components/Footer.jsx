import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { Link } from 'react-scroll';
import { personalInfo } from '../data/resumeData';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-name">{personalInfo.name}</h3>
            <p className="footer-tagline">{personalInfo.title} | Building Scalable Applications</p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav">
              <li><Link to="hero" spy smooth duration={500}>Home</Link></li>
              <li><Link to="about" spy smooth duration={500}>About</Link></li>
              <li><Link to="projects" spy smooth duration={500}>Projects</Link></li>
              <li><Link to="contact" spy smooth duration={500}>Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-contact-item">
              <FiMail size={14} />
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </p>
            <p className="footer-contact-item">
              <FiLinkedin size={14} />
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">{personalInfo.linkedin}</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="footer-socials">
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email">
              <FiMail size={18} />
            </a>
          </div>

          <Link to="hero" spy smooth duration={500} className="back-to-top" aria-label="Back to top">
            <FiArrowUp size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
