import { credentials } from "../data/credentials.js";
import { community, experience, portrait, socialLinks, ycs } from "../data/profile.js";
import { practiceProjects, projects } from "../data/projects.js";
import { SocialLinks } from "./Layout.jsx";
import { Arrow, Picture, StoryPhoto, SectionHeading, TextLink } from "./UI.jsx";

function Hero() {
  return (
    <section className="hero-stage" id="home" aria-labelledby="hero-title">
      <div className="wrap hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Full-stack developer <span aria-hidden="true">·</span> CIS student</p>
          <h1 id="hero-title">Hi, I’m Haitham.<br /><em>I build for the<br /> real world.</em></h1>
          <p className="hero-intro">I build web apps for practical problems, from making civic information easier to find to helping young trainers share their work.</p>
          <div className="hero-actions">
            <a className="button" href="#work">Explore my work <Arrow direction="down" /></a>
            <TextLink href="#contact" direction="up">Let’s connect</TextLink>
          </div>
          <SocialLinks />
        </div>
        <figure className="portrait" data-portrait>
          <div className="portrait-stage">
            <div className="orbit orbit-outer" aria-hidden="true"></div>
            <div className="orbit orbit-track" aria-hidden="true"><i></i><i></i></div>
            <div className="orbit orbit-inner" aria-hidden="true"></div>
            <div className="portrait-frame"><Picture image={portrait} sizes="(max-width: 700px) min(60vw, 328px), (max-width: 1100px) 32vw, 390px" eager /></div>
            <span className="frame-point frame-point-start" aria-hidden="true"></span>
            <span className="frame-point frame-point-end" aria-hidden="true"></span>
          </div>
          <figcaption><span>Haitham Aloufee</span><span>Based in Jordan</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Work() {
  const [nashmi, trainers, ...supporting] = projects;
  return (
    <section className="wrap section work" id="work" aria-labelledby="work-title">
      <span className="legacy-anchor" id="projects" aria-hidden="true"></span>
      <SectionHeading label="Portfolio" title="Selected work" id="work-title" />
      <div className="flagships">
        {[nashmi, trainers].map(project => (
          <article className={"flagship project-" + project.image.name} key={project.slug} data-reveal>
            <div className="flagship-copy">
              <p className="eyebrow">{project.kind}</p>
              <h3>{project.title}{project.slug === "nashmi" && <small lang="ar" dir="rtl">نشمي</small>}</h3>
              <p>{project.intro}</p>
              <ul className="stack" aria-label="Technologies">
                {project.stack.filter(tech => tech !== "React").slice(0, 4).map(tech => <li key={tech}>{tech}</li>)}
              </ul>
              <TextLink href={"/work/" + project.slug}>Read the {project.title} case study</TextLink>
            </div>
            <div className="project-art">
              <div className="project-screen" data-drift>
                <Picture image={project.image} sizes="(max-width: 700px) 84vw, (max-width: 1200px) 49vw, 680px" />
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="archive" aria-labelledby="archive-title" data-reveal>
        <h3 id="archive-title">More projects</h3>
        <ul className="archive-grid">
          {supporting.map(project => (
            <li key={project.slug}>
              <TextLink href={"/work/" + project.slug}>{project.title}</TextLink>
              <p>{project.subtitle}</p>
            </li>
          ))}
          {practiceProjects.map(project => (
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
function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading label="About" title="How I got here" id="about-title" />
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>I study Computer Information Systems at Tafila Technical University. I started with front-end development and now work across interfaces, APIs and data.</p>
            <p>I like projects with a clear task for the person using them. That might be finding a piece of legislation, getting dinner from a handful of ingredients or working through a chess position together.</p>
            <StoryPhoto media={{ src: "/media/student-event.webp", width: 900, height: 600, alt: "Haitham and fellow participants at a student event" }} caption="With fellow participants at a student event" />
          </div>
          <ol className="timeline" aria-label="Experience and education">
            {experience.map(item => (
              <li key={item.title} data-reveal>
                <p className="eyebrow">{item.type} <span aria-hidden="true">/</span> {item.period}</p>
                <h3>{item.title}</h3>
                <p className="organization">{item.organization}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="wrap section leadership" id="leadership" aria-labelledby="leadership-title">
      <div className="leadership-panel" data-reveal>
        <div className="leadership-art"><img src="/media/ycs-mark.webp" alt="Youth Computer Scientists logo" width="480" height="480" loading="lazy" decoding="async" /></div>
        <div className="leadership-copy">
          <p className="eyebrow">Leadership · {ycs.role}</p>
          <h2 id="leadership-title">{ycs.title}</h2>
          <blockquote>“{ycs.philosophy}”</blockquote>
          <p>{ycs.summary}</p>
          <p>{ycs.planned}</p>
        </div>
      </div>
    </section>
  );
}

function FeaturedCredentials() {
  return (
    <section className="wrap section featured" aria-labelledby="featured-title">
      <SectionHeading label="Credentials" title="What I’ve studied" id="featured-title">
        <TextLink href="/credentials">Browse all {credentials.length} credentials</TextLink>
      </SectionHeading>
      <div className="featured-grid">
        {credentials.filter(item => item.priority < 5).map(item => (
          <article key={item.id} className="featured-item" data-reveal>
            <p className="eyebrow">{item.category}</p>
            <h3><a href={"/credentials#" + item.id}>{item.title}</a></h3>
            <p className="organization">{item.issuer}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Beyond() {
  return (
    <section className="wrap section beyond" id="beyond" aria-labelledby="beyond-title">
      <SectionHeading label="Community" title="Beyond the code" id="beyond-title" />
      <div className="beyond-grid">
        {community.map(item => (
          <article key={item.id} data-reveal>
            {item.id === "chess" && <StoryPhoto media={{ src: "/media/chess-event.webp", width: 900, height: 600, alt: "Haitham seated beside a chessboard in a tournament hall" }} caption="At the chessboard" />}
            <p className="eyebrow">{item.type}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <TextLink href={item.link.href} direction="up">{item.link.label}</TextLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-inner">
        <div data-reveal><p className="eyebrow">Contact</p><h2 id="contact-title">Let’s <em>talk.</em></h2></div>
        <div className="contact-actions">
          <p>Have a project in mind or a question about my work? I’d like to hear from you.</p>
          <a className="button" href={socialLinks.email}>Send an email <Arrow direction="up" /></a>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return <><Hero /><Work /><About /><Leadership /><FeaturedCredentials /><Beyond /><Contact /></>;
}
