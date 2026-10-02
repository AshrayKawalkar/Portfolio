import { technicalSkills } from '../data/resumeData';
import {
  FiCode, FiMonitor, FiServer, FiShield, FiDatabase, FiCloud, FiTool, FiUsers
} from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { asArray } from '../utils/dataGuard';

const skillCategories = [
  { key: 'languages', title: 'Programming Languages', icon: FiCode },
  { key: 'frontend', title: 'Frontend', icon: FiMonitor },
  { key: 'frameworks', title: 'Frameworks', icon: FiServer },
  { key: 'security', title: 'Security & Authentication', icon: FiShield },
  { key: 'databases', title: 'Databases', icon: FiDatabase },
  { key: 'cloud', title: 'Cloud & DevOps', icon: FiCloud },
  { key: 'tools', title: 'Tools & Version Control', icon: FiTool },
  { key: 'softSkills', title: 'Soft Skills', icon: FiUsers }
];

const skillLevels = {
  languages: { 'Java': 90, 'JavaScript': 75 },
  frontend: { 'HTML5': 85, 'CSS3': 82, 'JavaScript (ES6+)': 78 },
  frameworks: { 'Spring Boot': 88, 'Spring MVC': 78, 'Hibernate': 75 },
  security: { 'Spring Security': 82, 'JWT Authentication': 85 },
  databases: { 'MySQL': 83, 'PostgreSQL': 80 },
  cloud: { 'AWS (S3, RDS, Elastic Beanstalk)': 72, 'Docker': 65 },
  tools: { 'Git': 85, 'Postman': 88, 'VS Code': 92, 'Cursor': 78 },
  softSkills: { 'Problem Solving': 88, 'Team Collaboration': 90, 'Debugging & Logging': 85, 'Project Leadership': 78 }
};

const Skills = () => {
  const [headerRef, headerVisible] = useScrollAnimation();
  const [gridRef, gridVisible] = useScrollAnimation();

  return (
    <section id="skills" className="skills section-padding alt-bg">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-title-underline"></div>
        </div>

        <div
          ref={gridRef}
          className={`skills-grid reveal ${gridVisible ? 'reveal-visible fade-up' : ''}`}
        >
          {skillCategories.map(({ key, title, icon: Icon }, cardIndex) => (
            <div
              key={key}
              className="skill-card card-tilt"
              style={{ transitionDelay: `${cardIndex * 80}ms` }}
            >
              <div className="card-3d-inner">
                <div className="skill-card-header">
                  <div className="skill-icon icon-pulse">
                    <Icon size={28} />
                  </div>
                  <h3 className="skill-category-title">{title}</h3>
                </div>
                <div className="skill-items">
                  {asArray(technicalSkills[key]).map((skill, index) => {
                    const level = skillLevels[key]?.[skill] || 70;
                    return (
                      <div key={index} className="skill-progress-item">
                        <div className="skill-progress-label">
                          <span className="skill-tag-in-progress">{skill}</span>
                          <span className="skill-percent">{level}%</span>
                        </div>
                        <div className="skill-progress-bar">
                          <div
                            className="skill-progress-fill"
                            style={{
                              width: gridVisible ? `${level}%` : '0%',
                              transitionDelay: `${cardIndex * 80 + index * 100}ms`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
