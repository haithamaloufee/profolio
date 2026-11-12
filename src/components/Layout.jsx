import { personal, socialLinks } from "../data/profile.js";
import { Arrow, TextLink } from "./UI.jsx";

const navigation = [
  { label: "Work", href: "/#work", page: "project" },
  { label: "About", href: "/#about" },
  { label: "Credentials", href: "/credentials", page: "credentials" },
  { label: "Beyond Code", href: "/#beyond" },
];

export function Header({ route, review }) {
  return (
    <>
      {review && <div className="review-banner">Local review · Additional certificate crops</div>}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="wrap nav-inner">
          <a className="wordmark" href="/">
            <span className="brand-mark" aria-hidden="true">H</span><span>HAITHAM<span className="brand-dot">.</span></span>
          </a>
          <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu <span aria-hidden="true">+</span></button>
          <nav aria-label="Main" id="site-nav">
            {navigation.map(item => <a key={item.href} href={item.href}
              aria-current={item.page === route.page ? (route.page === "project" ? "location" : "page") : undefined}>{item.label}</a>)}
            <a className="nav-contact" href="/#contact">Get in touch <Arrow direction="up" /></a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SocialLinks({ includeEmail = false }) {
  return (
    <ul className="social-links">
      <li><TextLink href={socialLinks.github} direction="up">GitHub</TextLink></li>
      <li><TextLink href={socialLinks.linkedin} direction="up">LinkedIn</TextLink></li>
      {includeEmail && <li><TextLink href={socialLinks.email} direction="up">Email</TextLink></li>}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <a className="wordmark" href="/"><span className="brand-mark" aria-hidden="true">H</span>{personal.name}</a>
        <span className="footer-place">Jordan</span>
        <SocialLinks includeEmail />
      </div>
    </footer>
  );
}
