import { identity, siteCopy } from "../data/profile";

export default function Footer({ navItems, socialLinks }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="brand-mark footer-mark">{siteCopy.logoText}</span>
          <h2>{identity.fullName}</h2>
          <p>{siteCopy.footerLine}</p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <div className="footer-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Connect</h3>
          <div className="footer-links">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Built for a premium, recruiter-friendly first impression.</p>
        <p>
          Copyright {new Date().getFullYear()} {identity.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
