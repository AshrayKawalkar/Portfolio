import { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { personalInfo, technicalSkills } from '../data/resumeData';

const titles = ['Java Developer', 'Spring Boot Specialist', 'Backend Engineer', 'Full Stack Developer', 'Problem Solver'];

// All skills from resumeData, shown as floating badges around the avatar.
// Long cloud/security labels are shortened to stay readable in the ring.
const shortenSkill = (skill) => {
  if (skill.startsWith('AWS')) return 'AWS';
  if (skill.startsWith('JavaScript')) return 'JavaScript';
  return skill;
};

const floatSkills = [...new Set(Object.values(technicalSkills ?? {}).flat().map(shortenSkill))];

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Pause typing animations when hero is off-screen or tab inactive
  const heroRef = useRef(null);
  const isActiveRef = useRef(true);
  const typingTimeoutRef = useRef(null);
  const cursorIntervalRef = useRef(null);

  // Memoize particles: generate ONCE on mount, not every render
  const particles = useMemo(() => (
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 20 + Math.random() * 25,
      delay: Math.random() * 12,
      opacity: 0.2 + Math.random() * 0.3
    }))
  ), []);

  // Track hero visibility — pause animations when scrolled out of view
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      isActiveRef.current = entry.intersectionRatio > 0.05;
    }, { threshold: [0, 0.05, 1] });
    io.observe(el);

    // Also pause when browser tab is hidden (saves CPU + battery)
    const handleVisibility = () => {
      isActiveRef.current = !document.hidden && isActiveRef.current;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Position the skill badges around the avatar in a full ring. They stay
  // hidden until the user hovers the logo, then "pop out" around it.
  const floatingBadges = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
    // Radii pushed outside the avatar edge so badges are fully visible.
    const base = isMobile ? 148 : 192;   // inner ring radius
    const outer = isMobile ? 188 : 242;  // outer ring radius
    const count = floatSkills.length;
    return floatSkills.map((skill, i) => {
      const angle = (360 / count) * i;   // even spread around the circle
      const radius = i % 2 === 0 ? base : outer;
      return {
        skill,
        angle,
        radius,
        // Small stagger so badges pop out one after another.
        delay: isMobile ? i * 0.05 : i * 0.035
      };
    });
  }, []);

  // Typing effect — respects isActiveRef to save CPU
  useEffect(() => {
    const runTick = () => {
      if (!isActiveRef.current) {
        typingTimeoutRef.current = setTimeout(runTick, 500);
        return;
      }
      const currentTitle = titles[titleIndex];
      const typeSpeed = isDeleting ? 30 : 55;
      const pauseAfterType = 1100;
      const pauseAfterDelete = 300;

      if (!isDeleting && displayText.length < currentTitle.length) {
        setDisplayText(currentTitle.slice(0, displayText.length + 1));
        typingTimeoutRef.current = setTimeout(runTick, typeSpeed);
      } else if (!isDeleting && displayText.length === currentTitle.length) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          runTick();
        }, pauseAfterType);
      } else if (isDeleting && displayText.length > 0) {
        setDisplayText(currentTitle.slice(0, displayText.length - 1));
        typingTimeoutRef.current = setTimeout(runTick, typeSpeed);
      } else if (isDeleting && displayText.length === 0) {
        typingTimeoutRef.current = setTimeout(() => {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          runTick();
        }, pauseAfterDelete);
      }
    };

    typingTimeoutRef.current = setTimeout(runTick, 400);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [displayText, isDeleting, titleIndex]);

  // Cursor blink — pause when hero off-screen
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      if (isActiveRef.current) setShowCursor((s) => !s);
    }, 530);
    return () => clearInterval(cursorIntervalRef.current);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="floating-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity
            }}
          />
        ))}
      </div>

      <div className="hero-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting animate-fade-up animate-delay-1">Hello, I'm</p>
          <h1 className="hero-name animate-fade-up animate-delay-2">{personalInfo.name}</h1>
          <h2 className="hero-title animate-fade-up animate-delay-3">
            {displayText}
            <span className={`typing-cursor ${showCursor ? 'cursor-visible' : 'cursor-hidden'}`}>|</span>
          </h2>
          <p className="hero-summary animate-fade-up animate-delay-4">{personalInfo.summary}</p>

          <div className="hero-buttons animate-fade-up animate-delay-5">
            <Link to="projects" spy smooth duration={500} className="btn btn-primary ripple-btn">
              View Projects
            </Link>
            <Link to="contact" spy smooth duration={500} className="btn btn-secondary ripple-btn">
              Contact Me
            </Link>
            <a href={personalInfo.resume} className="btn btn-outline ripple-btn" download target="_blank" rel="noopener noreferrer">
              <FiDownload size={16} />
              Resume
            </a>
          </div>

          <div className="hero-socials animate-fade-up animate-delay-6">
            <a href={`mailto:${personalInfo.email}`} className="social-link social-hover" aria-label="Email">
              <FiMail size={20} />
            </a>
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-link social-hover" aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
            <a href={`tel:${personalInfo.phone}`} className="social-link social-hover" aria-label="Phone">
              <FiPhone size={20} />
            </a>
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="social-link social-hover" aria-label="GitHub">
              <FiGithub size={20} />
            </a>
          </div>
        </div>

        <div className="hero-image animate-float">
          <div className="hero-image-wrapper">
            <div className="hero-image-placeholder">
              <span className="hero-initials">AK</span>
              <div className="hero-image-glow"></div>
            </div>
            <div className="hero-image-decoration"></div>
            <div className="hero-image-ring ring-1"></div>
            <div className="hero-image-ring ring-2"></div>
            {floatingBadges.map(({ skill, angle, radius, ring, delay }) => (
              <div
                key={skill}
                className={`hero-badge-slot ${ring === 0 ? 'orbit-inner' : 'orbit-outer'}`}
                style={{
                  '--orbit-angle': `${angle}deg`,
                  '--orbit-radius': `${radius}px`,
                  '--badge-delay': `${delay}s`
                }}
              >
                <span className="hero-floating-badge orbit-glow">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <Link to="about" spy smooth duration={500} className="scroll-indicator">
          <span></span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
