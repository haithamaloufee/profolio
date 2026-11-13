import { localizedPath } from "../content.js";
import { socialLinks } from "../data/profile.js";
import { ContactLink, SocialLinks } from "./Layout.jsx";
import { Arrow, Picture, StoryPhoto, SectionHeading, TextLink } from "./UI.jsx";

function Hero({ content }) {
  const { copy: c, portrait } = content;
  return (
    <section className="hero-stage" id="home" aria-labelledby="hero-title">
      <div className="wrap hero">
        <div className="hero-copy">
          <h1 id="hero-title">{c.greeting}<em>{c.heroLine[0]}<br /> {c.heroLine[1]}</em></h1>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-actions">
            <a className="button" href="#work">{c.explore} <Arrow direction="down" /></a>
            <TextLink href="#contact" direction="up">{c.connect}</TextLink>
          </div>
          <SocialLinks copy={c} />
        </div>
        <figure className="portrait" data-portrait>
          <div className="portrait-stage">
            <span className="portrait-light" aria-hidden="true"></span>
            <div className="orbit orbit-outer" aria-hidden="true"></div>
            <div className="orbit orbit-track" aria-hidden="true"><i></i><i></i></div>
            <div className="orbit orbit-inner" aria-hidden="true"></div>
            <div className="portrait-frame"><Picture image={portrait} sizes="(max-width: 700px) min(60vw, 328px), (max-width: 1100px) 32vw, 390px" eager /></div>
            <span className="frame-point frame-point-start" aria-hidden="true"></span>
            <span className="frame-point frame-point-end" aria-hidden="true"></span>
          </div>
          <figcaption><span>{c.based}</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Work({ content }) {
  const { copy: c, language, projects, practice } = content;
  const [nashmi, trainers, ...supporting] = projects;
  return (
    <section className="wrap section work" id="work" aria-labelledby="work-title">
      <span className="legacy-anchor" id="projects" aria-hidden="true"></span>
      <SectionHeading label={c.portfolio} title={c.selected} id="work-title" />
      <div className="flagships">
        {[nashmi, trainers].map(project => (
          <article className={"flagship project-" + project.image.name} key={project.slug} data-reveal>
            <div className="flagship-copy">
              <p className="eyebrow">{project.kind}</p>
              <h3>{project.title}{project.slug === "nashmi" && language === "en" && <small lang="ar" dir="rtl">نشمي</small>}</h3>
              <p>{project.intro}</p>
              <ul className="stack" aria-label={c.tech}>
                {project.stack.filter(tech => tech !== "React").slice(0, 4).map(tech => <li key={tech}><bdi lang="en">{tech}</bdi></li>)}
              </ul>
              <TextLink href={localizedPath("/work/" + project.slug, language)}>{c.caseStudy(project.title)}</TextLink>
            </div>
            <div className="project-art" data-project-motion>
              <span className="project-light" aria-hidden="true"></span>
              <div className="project-screen" data-drift>
                <Picture image={project.image} sizes="(max-width: 700px) 84vw, (max-width: 1200px) 49vw, 680px" />
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="archive" aria-labelledby="archive-title" data-reveal>
        <h3 id="archive-title">{c.more}</h3>
        <ul className="archive-grid">
          {supporting.map(project => (
            <li key={project.slug}>
              <TextLink href={localizedPath("/work/" + project.slug, language)}>{project.title}</TextLink>
              <p>{project.subtitle}</p>
            </li>
          ))}
          {practice.map(project => (
            <li key={project.title}>
              <TextLink href={project.demo ?? project.href} direction="up">{project.title}</TextLink>
              <p>{project.subtitle}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
function About({ content }) {
  const { copy: c, experience, language, projects } = content;
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading label={c.about} title={c.aboutTitle} id="about-title" />
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            {c.aboutCopy.map(text => <p key={text}>{text}</p>)}
          </div>
          <section aria-labelledby="experience-title">
            <h3 id="experience-title" className="experience-title">{c.experience}</h3>
            <ol className="timeline">
              {experience.map(item => {
                const project = item.projectSlug && projects.find(project => project.slug === item.projectSlug);
                return (
                  <li key={item.title} data-reveal>
                    <p className="eyebrow">{item.type} <span aria-hidden="true">/</span> {item.period}</p>
                    <h4>{item.title}</h4>
                    <p className="organization">{item.organization}</p>
                    <p>{item.description}</p>
                    {project && <TextLink href={localizedPath("/work/" + project.slug, language)}>{c.caseStudy(project.title)}</TextLink>}
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}

function Leadership({ content }) {
  const { copy: c, ycs } = content;
  return (
    <section className="wrap section leadership" id="leadership" aria-labelledby="leadership-title">
      <div className="leadership-panel" data-reveal>
        <div className="leadership-art"><img src="/media/ycs-mark.webp" alt={c.ycsLogo} width="480" height="480" loading="lazy" decoding="async" /></div>
        <div className="leadership-copy">
          <p className="eyebrow">{c.leadership} · {ycs.role}</p>
          <h2 id="leadership-title">{ycs.title}</h2>
          <blockquote>“{ycs.philosophy}”</blockquote>
          <p>{ycs.summary}</p>
          <p>{ycs.planned}</p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCredentials({ content }) {
  const { copy: c, language, credentials } = content;
  const catalog = localizedPath("/credentials", language);
  return (
    <section className="wrap section featured" id="certifications" aria-labelledby="featured-title">
      <SectionHeading label={c.credentials} title={c.learning} id="featured-title">
        <TextLink href={catalog}>{c.browse(credentials.length)}</TextLink>
      </SectionHeading>
      <div className="featured-grid">
        {credentials.filter(item => item.priority < 5).map(item => (
          <article key={item.id} className="featured-item" data-reveal>
            <p className="eyebrow">{c.categories[item.category]}</p>
            <h3><a href={catalog + "#" + item.id}>{item.title}</a></h3>
            <p className="organization">{item.issuer}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Beyond({ content }) {
  const { copy: c, community, volunteering } = content;
  return (
    <section className="wrap section beyond" id="beyond" aria-labelledby="beyond-title">
      <SectionHeading label={c.community} title={c.beyondTitle} id="beyond-title" />
      <div className="beyond-grid">
        {community.map(({ photo: { caption, ...media }, ...item }) => (
          <article key={item.id} data-reveal>
            <StoryPhoto media={media} caption={caption} />
            <p className="eyebrow">{item.type}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <TextLink href={item.link.href} direction="up">{item.link.label}</TextLink>
          </article>
        ))}
        <article className="community-event" data-reveal>
          <p className="eyebrow">{c.upcomingVolunteering}</p>
          <h3>{volunteering.title}</h3>
          <p>{volunteering.body}</p>
          <TextLink href={volunteering.href} direction="up">{c.eventDetails}</TextLink>
        </article>
      </div>
    </section>
  );
}

function Contact({ content }) {
  const { copy: c } = content;
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <div data-reveal><p className="eyebrow">{c.contactLabel}</p><h2 id="contact-title">{c.contactHeading[0]} <em>{c.contactHeading[1]}</em></h2></div>
        <div className="contact-actions">
          <p>{c.contactCopy}</p>
          <ul className="contact-links">
            <li><ContactLink kind="email" className="button">{c.send}</ContactLink></li>
            <li><ContactLink kind="phone">{c.phone} <bdi dir="ltr">{socialLinks.phoneNumber}</bdi></ContactLink></li>
            <li><ContactLink kind="whatsapp">{c.whatsapp}</ContactLink></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Home({ content }) {
  return <><Hero content={content} /><Work content={content} /><About content={content} /><Leadership content={content} /><FeaturedCredentials content={content} /><Beyond content={content} /><Contact content={content} /></>;
}
