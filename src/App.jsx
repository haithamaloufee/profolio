import { useEffect, useState } from "react";
import ContactLinks from "./components/ContactLinks";
import ExpandableProjects from "./components/ExpandableProjects";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SectionBlock from "./components/SectionBlock";
import { projects } from "./data/projects";
import { heroContent, identity, seo, siteCopy } from "./data/profile";
import { socialLinks } from "./data/socialLinks";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ensureMetaTag = (selector, content, attribute = "name") => {
  let element = document.head.querySelector(`meta[${attribute}="${selector}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, selector);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const ensureLinkTag = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const ensureJsonLd = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("id", id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("portfolio-theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    const themeColor = theme === "dark" ? "#0f0d0b" : "#f7efe3";
    ensureMetaTag("theme-color", themeColor);
  }, [theme]);

  useEffect(() => {
    const siteOrigin = seo.siteUrl || window.location.origin;
    const canonicalUrl = new URL("/", siteOrigin).toString();
    const socialImageUrl = new URL(seo.imagePath, siteOrigin).toString();
    const sameAs = socialLinks
      .filter((link) => link.id !== "email")
      .map((link) => link.href);

    const profileStructuredData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      mainEntity: {
        "@type": "Person",
        name: identity.fullName,
        alternateName: seo.alternateNames,
        jobTitle: identity.title,
        description: heroContent.bio,
        email: identity.email,
        image: socialImageUrl,
        sameAs,
        homeLocation: {
          "@type": "Place",
          name: identity.location,
        },
        knowsAbout: heroContent.technologies,
      },
    };

    const websiteStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seo.siteName,
      url: canonicalUrl,
      description: seo.description,
      inLanguage: "en",
    };

    document.title = seo.title;
    ensureMetaTag("description", seo.description);
    ensureMetaTag("keywords", seo.keywords.join(", "));
    ensureMetaTag("author", identity.fullName);
    ensureMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    ensureMetaTag("googlebot", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    ensureMetaTag("og:title", seo.title, "property");
    ensureMetaTag("og:description", seo.description, "property");
    ensureMetaTag("og:type", "website", "property");
    ensureMetaTag("og:site_name", seo.siteName, "property");
    ensureMetaTag("og:url", canonicalUrl, "property");
    ensureMetaTag("og:image", socialImageUrl, "property");
    ensureMetaTag("og:image:alt", `${identity.fullName} portfolio preview`, "property");
    ensureMetaTag("og:locale", seo.locale, "property");
    ensureMetaTag("twitter:card", "summary_large_image");
    ensureMetaTag("twitter:title", seo.title);
    ensureMetaTag("twitter:description", seo.description);
    ensureMetaTag("twitter:image", socialImageUrl);
    ensureLinkTag("canonical", canonicalUrl);
    ensureJsonLd("profile-jsonld", profileStructuredData);
    ensureJsonLd("website-jsonld", websiteStructuredData);
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
