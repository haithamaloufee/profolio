import { identity, heroContent } from "../data/profile";

export default function Hero({ socialLinks }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="section-eyebrow">{heroContent.eyebrow}</p>
          <h1>
            {identity.fullName}
            <span>{identity.title}</span>
          </h1>
          <p className="hero-bio">{heroContent.bio}</p>

          <div className="hero-meta">
            <span>{identity.location}</span>
            <span>{heroContent.availability}</span>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View Projects
            </a>
            <a className="button button-secondary" href="#contact">
              Contact Me
            </a>
          </div>

          <ul className="tech-list" aria-label="Highlighted technologies">
            {heroContent.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>

          <div className="hero-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                className="social-chip"
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                <span>{link.label}</span>
                <small>{link.description}</small>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual reveal">
          <div className="portrait-shell">
            <div className="portrait-glow" />
            <img
              className="portrait-image"
              src={identity.profileImage}
              alt={`Portrait of ${identity.fullName}`}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="hero-highlight-card">
            <span className="highlight-label">{heroContent.highlightLabel}</span>
            <ul>
              {heroContent.highlightPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>{heroContent.highlightText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
