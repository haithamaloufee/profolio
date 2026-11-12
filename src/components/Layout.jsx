import { localizedPath } from "../content.js";
import { socialLinks } from "../data/profile.js";
import { Arrow, TextLink } from "./UI.jsx";

export function Header({ route, content, review }) {
  const { copy: c, language } = content;
  const home = localizedPath("/", language);
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const navigation = [
    { label: c.work, href: home + "#work", section: "work", page: "project" },
    { label: c.about, href: home + "#about", section: "about" },
    { label: c.credentials, href: localizedPath("/credentials", language), page: "credentials" },
    { label: c.beyond, href: home + "#beyond", section: "beyond" },
    { label: c.contact, href: home + "#contact", section: "contact", className: "nav-contact" },
  ];
  return (
    <>
      {review && <div className="review-banner">{c.review}</div>}
      <a className="skip-link" href="#main-content">{c.skip}</a>
      <header className="site-header">
        <div className="wrap nav-inner">
          <a className="wordmark" href={home}>
            <span className="brand-mark" aria-hidden="true">H</span><span>{c.name}</span>
          </a>
          <div className="nav-tools">
            <a className="locale-link" lang={alternateLanguage} hrefLang={alternateLanguage} dir={alternateLanguage === "ar" ? "rtl" : "ltr"}
              href={localizedPath(route.basePath ?? "/", alternateLanguage)} data-language={alternateLanguage}
              aria-label={alternateLanguage === "ar" ? "العربية" : "English"}>{alternateLanguage === "ar" ? "العربية" : "EN"}</a>
            <button className="theme-toggle" type="button" aria-label={c.darkMode} aria-pressed="false" title={c.darkMode}>
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M20.4 14.7A8.8 8.8 0 0 1 9.3 3.6a8.8 8.8 0 1 0 11.1 11.1Z" /></svg>
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19" /></svg>
            </button>
            <button className="menu-toggle" type="button" aria-label={c.menu} aria-expanded="false" aria-controls="site-nav"><span aria-hidden="true"></span></button>
          </div>
          <nav aria-label={c.main} id="site-nav">
            {navigation.map(item => <a key={item.href} className={item.className} href={item.href} data-section={item.section}
              aria-current={item.page === route.page ? (route.page === "project" ? "location" : "page") : undefined}>
              {item.label}{item.className && <Arrow direction="up" />}
            </a>)}
          </nav>
        </div>
      </header>
    </>
  );
}

export function SocialLinks({ copy: c, includeEmail = false }) {
  return (
    <ul className="social-links">
      <li><TextLink href={socialLinks.github} direction="up"><bdi lang="en">GitHub</bdi></TextLink></li>
      <li><TextLink href={socialLinks.linkedin} direction="up"><bdi lang="en">LinkedIn</bdi></TextLink></li>
      {includeEmail && <li><TextLink href={socialLinks.email} direction="up">{c.email}</TextLink></li>}
    </ul>
  );
}

export function Footer({ content }) {
  const { copy: c, language } = content;
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <a className="wordmark" href={localizedPath("/", language)}><span className="brand-mark" aria-hidden="true">H</span>{c.name}</a>
        <span className="footer-place">{c.jordan}</span>
        <SocialLinks copy={c} includeEmail />
        <TextLink className="back-top" href="#top" direction="top">{c.top}</TextLink>
      </div>
    </footer>
  );
}
