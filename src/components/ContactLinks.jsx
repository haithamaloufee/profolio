import { identity } from "../data/profile";

export default function ContactLinks({ socialLinks }) {
  const platformLinks = socialLinks.filter((link) => link.id !== "email");

  return (
    <div className="contact-layout">
      <div className="contact-card contact-primary-card">
        <span className="contact-label">Direct Email</span>
        <a className="contact-email" href={`mailto:${identity.email}`}>
          {identity.email}
        </a>
        <p>
          For job opportunities, collaborations, freelance work, or client inquiries, email is
          the fastest direct channel.
        </p>
      </div>

      <div className="contact-platform-grid">
        {platformLinks.map((link) => (
          <a
            key={link.id}
            className="contact-card contact-link-card"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-label">{link.label}</span>
            <strong>{link.handle || link.label}</strong>
            <p>{link.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
