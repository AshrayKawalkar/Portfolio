import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Education', to: 'education' },
    { name: 'Contact', to: 'contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled navbar-slide' : ''}`}>
      <div className="nav-container">
        <Link to="hero" spy smooth duration={500} className="nav-logo logo-glow">
          AK
        </Link>

        <ul className="nav-menu">
          {navLinks.map((link, index) => (
            <li
              key={link.to}
              className="nav-item"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                to={link.to}
                spy
                smooth
                duration={500}
                offset={-70}
                activeClass="active-link"
                className="nav-link nav-link-underline"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${isOpen ? 'toggle-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger hamburger-top"></span>
          <span className="hamburger hamburger-mid"></span>
          <span className="hamburger hamburger-bot"></span>
        </button>

        <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
          <ul className="mobile-nav-menu">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                className={`mobile-item ${isOpen ? 'mobile-item-visible' : ''}`}
                style={{ transitionDelay: `${index * 50 + 100}ms` }}
              >
                <Link
                  to={link.to}
                  spy
                  smooth
                  duration={500}
                  offset={-70}
                  activeClass="active-link"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
