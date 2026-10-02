import { education, certifications } from '../data/resumeData';
import { FiBook, FiAward, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { asArray, withEmptyFallback } from '../utils/dataGuard';

const Education = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [eduRef, eduVisible] = useScrollAnimation();
  const [certRef, certVisible] = useScrollAnimation(0.1);

  return (
    <section id="education" className="education section-padding">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">Education & Certifications</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="education-content">
          <div
            ref={eduRef}
            className={`education-section reveal ${eduVisible ? 'reveal-visible fade-up' : ''}`}
          >
            <h3 className="subsection-title">
              <FiBook size={22} />
              Education
            </h3>

            <div className="education-list">
              {withEmptyFallback(asArray(education), (edu, index) => (
                <div
                  key={index}
                  className="education-item education-item-hover content-hover-lift"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="education-item-header">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <span className="education-score score-pop">{edu.score}</span>
                  </div>
                  <h5 className="education-institution">{edu.institution}</h5>
                  <div className="education-meta">
                    <span className="education-meta-item">
                      <FiCalendar size={14} />
                      {edu.duration}
                    </span>
                    <span className="education-meta-item">
                      <FiMapPin size={14} />
                      {edu.location}
                    </span>
                  </div>
                </div>
              ), 'No education entries to display yet.')}
            </div>
          </div>

          <div
            ref={certRef}
            className={`certifications-section reveal ${certVisible ? 'reveal-visible fade-up' : ''}`}
          >
            <h3 className="subsection-title">
              <FiAward size={22} />
              Certifications
            </h3>

            <ul className="certifications-list">
              {withEmptyFallback(asArray(certifications), (cert, index) => (
                <li
                  key={index}
                  className="certification-item cert-hover content-hover-lift"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <FiAward size={16} className="certification-icon award-spin" />
                  <span>{cert}</span>
                </li>
              ), 'No certifications to display yet.')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
