import { useEffect, useState } from "react";
import ContactLinks from "./components/ContactLinks";
import ExpandableProjects from "./components/ExpandableProjects";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionBlock from "./components/SectionBlock";
import { projects } from "./data/projects";
import { identity, seo, siteCopy } from "./data/profile";
import { socialLinks } from "./data/socialLinks";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const updateMetaTag = (selector, content, attribute = "name") => {
  const element = document.head.querySelector(`meta[${attribute}="${selector}"]`);

  if (element) {
    element.setAttribute("content", content);
  }
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    const themeColor = theme === "dark" ? "#0f0d0b" : "#f7efe3";
    updateMetaTag("theme-color", themeColor);
  }, [theme]);

  useEffect(() => {
    document.title = seo.title;
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", seo.keywords.join(", "));
    updateMetaTag("author", identity.fullName);
    updateMetaTag("og:title", seo.title, "property");
    updateMetaTag("og:description", seo.description, "property");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 },
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="page-shell">
        <Header
          navItems={navItems}
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        />

        <main id="main-content">
          <Hero socialLinks={socialLinks} />

          <SectionBlock
            id="projects"
            eyebrow="Featured Work"
            title="Projects"
            description={siteCopy.projectIntro}
          >
            <ExpandableProjects
              items={projects}
              initialCount={3}
              emptyMessage="Projects will appear here once you add them in the data file."
            />
          </SectionBlock>

          <SectionBlock
            id="contact"
            eyebrow="Contact / Connect With Me"
            title="Let's Talk Directly"
            description={siteCopy.contactIntro}
          >
            <ContactLinks socialLinks={socialLinks} />
          </SectionBlock>
        </main>

        <Footer navItems={navItems} socialLinks={socialLinks} />
      </div>
    </>
  );
}
