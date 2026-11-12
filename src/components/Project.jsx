import { projects } from "../data/projects.js";
import { Picture, TextLink } from "./UI.jsx";

export function Project({ project }) {
  const related = projects.filter(item => item.slug !== project.slug);
  return (
    <>
      <article className={"wrap project-detail project-" + project.image.name}>
        <header className="subpage-head detail-head">
          <TextLink className="back-link" href="/#work" direction="left">Selected work</TextLink>
          <div className="detail-layout">
            <div>
              <p className="eyebrow">{project.kind}</p>
              <h1>{project.title}</h1>
              <p className="detail-subtitle">{project.subtitle}</p>
            </div>
            <div className="detail-meta">
              <p className="lede">{project.intro}</p>
              <ul className="stack" aria-label="Technologies">
                {project.stack.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className="project-links">
                {project.demo && <TextLink href={project.demo} direction="up">Open public demo</TextLink>}
                <TextLink href={project.repository} direction="up">View source on GitHub</TextLink>
              </div>
            </div>
          </div>
        </header>
        <figure className="project-figure">
          <div className="project-art"><div className="project-screen"><Picture image={project.image} sizes="(max-width: 700px) 92vw, (max-width: 1240px) 86vw, 1050px" eager /></div></div>
          <figcaption>{project.title} · application screenshot</figcaption>
        </figure>
        <div className="case-sections">
          {project.sections.map(section => (
            <section key={section.title} data-reveal><h2>{section.title}</h2><p>{section.body}</p></section>
          ))}
        </div>
      </article>
      <section className="wrap section related" aria-labelledby="related-title">
        <h2 id="related-title">More selected work</h2>
        <ul>{related.map(item => <li key={item.slug}><TextLink href={"/work/" + item.slug}>{item.title}</TextLink></li>)}</ul>
      </section>
    </>
  );
}
