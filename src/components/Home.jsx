import { credentials } from "../data/credentials.js";
import { community, experience, personal, portrait, socialLinks } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { SocialLinks } from "./Layout.jsx";
import { Arrow, Picture, ReviewPhoto, SectionHeading, TextLink } from "./UI.jsx";

function Hero() {
  return (
    <section className="wrap hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">Haitham Aloufee <span aria-hidden="true">/</span> Full-stack developer</p>
        <h1 id="hero-title">Building useful things.<br /><em>Keeping them human.</em></h1>
        <p className="hero-intro">{personal.bio}</p>
        <div className="hero-actions">
          <a className="button" href="#work">Explore selected work <Arrow direction="down" /></a>
          <TextLink href="#contact" direction="up">Let’s connect</TextLink>
        </div>
        <SocialLinks />
      </div>
      <figure className="portrait">
        <div className="portrait-frame"><Picture image={portrait} sizes="(max-width: 700px) calc(100vw - 44px), (max-width: 1050px) 40vw, 422px" eager /></div>
        <figcaption><span>Haitham Aloufee</span><span>Based in Jordan</span></figcaption>
      </figure>
    </section>
  );
}

function Work() {
  return (
    <section className="wrap section work" id="work" aria-labelledby="work-title">
      <span className="legacy-anchor" id="projects" aria-hidden="true"></span>
      <SectionHeading label="Portfolio" title="Selected work" id="work-title">
        <p>A civic platform, an AI recipe experiment and a public services prototype.</p>
      </SectionHeading>
      <div className="work-grid">
        {projects.map((project, index) => (
          <article className={"project-card project-" + project.image.name} key={project.slug} data-reveal>
            <a href={"/work/" + project.slug} aria-labelledby={"project-" + project.slug}>
              <div className="project-art">
                <div className="project-screen" data-drift>
                  <Picture image={project.image} sizes={index === 0 ? "(max-width: 700px) 90vw, (max-width: 1200px) 66vw, 810px" : "(max-width: 700px) 86vw, 500px"} />
                </div>
              </div>
              <div className="project-card-copy">
                <p className="eyebrow">{project.kind}</p>
                <h3 id={"project-" + project.slug}>{project.title}</h3>
                <p>{project.subtitle}</p>
                <span className="circle-arrow"><Arrow direction="up" /></span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function About({ review }) {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading label="About" title={<>From the classroom<br /><em>to the web.</em></>} id="about-title" />
        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>I study Computer Information Systems at Tafila Technical University. I started with front-end development and now work across interfaces, APIs and data.</p>
            <p>I like projects with a clear task for the person using them. That might be finding a piece of legislation, getting dinner from a handful of ingredients or working through a chess position together.</p>
            <ReviewPhoto media={review?.professional} caption="Student event photo · candidate crop" />
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

function Beyond({ review }) {
  return (
    <section className="wrap section beyond" id="beyond" aria-labelledby="beyond-title">
      <SectionHeading label="Community" title="Beyond the code" id="beyond-title" />
      <div className="beyond-grid">
        {community.map(item => (
          <article key={item.id} data-reveal>
            {item.id === "chess" && <ReviewPhoto media={review?.activity} caption="At the chessboard · candidate crop" />}
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

export function Home({ review }) {
  return <><Hero /><Work /><About review={review} /><FeaturedCredentials /><Beyond review={review} /><Contact /></>;
}
