import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheckCircle } from 'react-icons/fi';
import { personalInfo } from '../data/resumeData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});

  const [headerRef, headerVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation(0.1);
  const [formRef, formVisible] = useScrollAnimation(0.1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleFocus = (field) => setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field) => setFocused((prev) => ({ ...prev, [field]: false }));

  return (
    <section id="contact" className="contact section-padding alt-bg">
      <div className="container">
        <div
          ref={headerRef}
          className={`section-header reveal ${headerVisible ? 'reveal-visible fade-up' : ''}`}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-title-underline"></div>
        </div>

        <div className="contact-content">
          <div
            ref={infoRef}
            className={`contact-info reveal ${infoVisible ? 'reveal-visible slide-left' : ''}`}
          >
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-description">
              Feel free to reach out for opportunities, collaborations, or just a friendly chat about technology.
              I'm always open to discussing new projects and ideas!
            </p>

            <div className="contact-details">
              {[
                { icon: FiMail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, isLink: true, delay: '0ms' },
                { icon: FiPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, isLink: true, delay: '100ms' },
                { icon: FiMapPin, label: 'Location', value: personalInfo.location, href: null, isLink: false, delay: '200ms' }
              ].map(({ icon: Icon, label, value, href, isLink, delay }) => (
                <div
                  key={label}
                  className="contact-detail-item detail-hover content-hover-lift"
                  style={{ transitionDelay: delay }}
                >
                  <div className="contact-detail-icon icon-bounce">
                    <Icon size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <span className="detail-label">{label}</span>
                    {isLink ? (
                      <a href={href} className="detail-value">{value}</a>
                    ) : (
                      <span className="detail-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-socials">
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link social-hover"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={22} />
              </a>
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-link social-hover" aria-label="GitHub">
                <FiGithub size={22} />
              </a>
            </div>
          </div>

          <div
            ref={formRef}
            className={`contact-form-container reveal ${formVisible ? 'reveal-visible slide-right' : ''}`}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              {[
                { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
                { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Opportunity / Collaboration' }
              ].map((field, index) => (
                <div
                  key={field.id}
                  className={`form-group ${focused[field.id] ? 'form-group-focused' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <label htmlFor={field.id} className="form-label">{field.label}</label>
                  <div className="form-input-wrapper">
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.id)}
                      onBlur={() => handleBlur(field.id)}
                      required
                      className="form-input"
                      placeholder={field.placeholder}
                    />
                    <span className="form-input-underline"></span>
                  </div>
                </div>
              ))}

              <div
                className={`form-group ${focused.message ? 'form-group-focused' : ''}`}
                style={{ transitionDelay: '300ms' }}
              >
                <label htmlFor="message" className="form-label">Message</label>
                <div className="form-input-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={5}
                    className="form-input form-textarea"
                    placeholder="Your message here..."
                  ></textarea>
                  <span className="form-input-underline"></span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-submit ripple-btn" style={{ transitionDelay: '400ms' }}>
                <span>Send Message</span>
                <FiSend size={16} className="send-icon" />
              </button>

              {submitted && (
                <div className="form-success-message success-pop">
                  <FiCheckCircle size={20} />
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
