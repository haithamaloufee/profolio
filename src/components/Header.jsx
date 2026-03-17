import { useState } from "react";
import { identity, siteCopy } from "../data/profile";

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">{isDark ? "☾" : "☀"}</span>
      </span>
    </button>
  );
}

export default function Header({ navItems, theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={handleNavClick}>
          <span className="brand-mark">{siteCopy.logoText}</span>
          <span className="brand-text">
            <strong>{identity.fullName}</strong>
            <span>{identity.title}</span>
          </span>
        </a>

        <div className="header-actions">
          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={handleNavClick}>
                {item.label}
              </a>
            ))}
          </nav>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="primary-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="primary-menu" className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={handleNavClick}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
