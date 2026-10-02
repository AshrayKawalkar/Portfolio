import { projects } from '../data/resumeData';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { asArray, withEmptyFallback } from '../utils/dataGuard';

const Projects = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">Projects</h2>
          <div className="section-title-underline"></div>
        </div>

        <div
          ref={gridRef}
          className={`projects-grid reveal ${gridVisible ? 'reveal-visible' : ''}`}
        >
          {withEmptyFallback(asArray(projects), (project, index) => (
            <div
              key={index}
              className={`project-card project-tilt ${gridVisible ? 'card-scale-in' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-3d-inner">
                <div className="project-shine"></div>
                <div className="project-header">
                  <h3 className="project-title">{project.title || 'Untitled Project'}</h3>
                  <span className="project-year">{project.year || ''}</span>
                </div>

                <div className="project-technologies">
                  {asArray(project.technologies).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="project-tech-tag tech-pop"
                      style={{ animationDelay: `${index * 150 + techIndex * 80}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="project-description">
                  {asArray(project.description).map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className={gridVisible ? 'reveal-visible slide-left' : ''}
                      style={{ transitionDelay: `${index * 150 + pointIndex * 100 + 300}ms` }}
                    >
                      {point}
                    </li>
                  ))}
                  {asArray(project.description).length === 0 && (
                    <li>No description available.</li>
                  )}
                </ul>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link ripple-btn" aria-label="GitHub">
                      <FiGithub size={18} />
                      <span>GitHub</span>
                    </a>
                  )}
                  <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="project-link ripple-btn" aria-label="Live Demo">
                    <FiExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ), 'No projects to display yet.')}
        </div>
      </div>
    </section>
  );
};

export default Projects;
