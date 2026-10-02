import { internships } from '../data/resumeData';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { asArray, withEmptyFallback } from '../utils/dataGuard';

const Experience = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [timelineRef, timelineVisible] = useScrollAnimation(0.1);

  return (
    <section id="experience" className="experience section-padding alt-bg">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">Internships & Training</h2>
          <div className="section-title-underline"></div>
        </div>

        <div
          ref={timelineRef}
          className={`experience-timeline reveal ${timelineVisible ? 'reveal-visible' : ''}`}
        >
          {withEmptyFallback(asArray(internships), (exp, index) => (
            <div
              key={index}
              className={`experience-item timeline-item ${timelineVisible ? 'timeline-item-visible' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="experience-marker marker-pulse">
                <FiBriefcase size={20} />
              </div>

              <div className="experience-content content-hover-lift">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <h4 className="experience-organization">{exp.organization}</h4>
                </div>

                <div className="experience-meta">
                  <span className="experience-meta-item">
                    <FiCalendar size={14} />
                    {exp.date}
                  </span>
                  <span className="experience-meta-item">
                    <FiMapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <ul className="experience-points">
                  {asArray(exp.points).map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className={timelineVisible ? 'reveal-visible slide-left' : ''}
                      style={{ transitionDelay: `${index * 200 + pointIndex * 100 + 300}ms` }}
                    >
                      {point}
                    </li>
                  ))}
                  {asArray(exp.points).length === 0 && (
                    <li>Details not available.</li>
                  )}
                </ul>
              </div>
            </div>
          ), 'No experience to display yet.')}
        </div>
      </div>
    </section>
  );
};

export default Experience;
