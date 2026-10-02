import { personalInfo } from '../data/resumeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [textRef, textVisible] = useScrollAnimation(0.1);
  const [gridRef, gridVisible] = useScrollAnimation(0.1);

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="about-content">
          <div
            ref={textRef}
            className={`about-text reveal ${textVisible ? 'reveal-visible fade-up' : ''}`}
          >
            <p className="about-intro">{personalInfo.summary}</p>
            <p className="about-description">
              I am passionate about building robust backend systems and creating seamless user experiences.
              With a strong foundation in Java and Spring Boot, I enjoy designing efficient REST APIs
              and implementing secure authentication mechanisms. I am constantly exploring new technologies
              and best practices to deliver high-quality, scalable solutions.
            </p>
            <p className="about-description">
              During my academic journey and internships, I have developed excellent problem-solving skills
              and a collaborative mindset. I thrive in team environments and take pride in writing clean,
              maintainable code. I am excited to contribute my skills to challenging projects and grow
              as a professional developer.
            </p>
          </div>

          <div
            ref={gridRef}
            className={`about-info-grid reveal ${gridVisible ? 'reveal-visible fade-up' : ''}`}
          >
            <div className="about-info-item hover-lift">
              <span className="info-label">Name:</span>
              <span className="info-value">{personalInfo.name}</span>
            </div>
            <div className="about-info-item hover-lift" style={{ transitionDelay: '100ms' }}>
              <span className="info-label">Email:</span>
              <span className="info-value">{personalInfo.email}</span>
            </div>
            <div className="about-info-item hover-lift" style={{ transitionDelay: '200ms' }}>
              <span className="info-label">Phone:</span>
              <span className="info-value">{personalInfo.phone}</span>
            </div>
            <div className="about-info-item hover-lift" style={{ transitionDelay: '300ms' }}>
              <span className="info-label">Location:</span>
              <span className="info-value">{personalInfo.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
