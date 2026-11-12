import { localizedPath } from "../content.js";
import { Picture, TextLink } from "./UI.jsx";

export function Project({ project, content }) {
  const { copy: c, language, projects } = content;
  const related = projects.filter(item => item.slug !== project.slug);
  return (
    <>
      <article className={"wrap project-detail project-" + project.image.name}>
        <header className="subpage-head detail-head">
          <TextLink className="back-link" href={localizedPath("/", language) + "#work"} direction="left">{c.selected}</TextLink>
          <div className="detail-layout">
            <div>
              <p className="eyebrow">{project.kind}</p>
              <h1>{project.title}</h1>
              <p className="detail-subtitle">{project.subtitle}</p>
            </div>
            <div className="detail-meta">
              <p className="lede">{project.intro}</p>
              <ul className="stack" aria-label={c.tech}>
                {project.stack.map(item => <li key={item}><bdi lang="en">{item}</bdi></li>)}
              </ul>
              <div className="project-links">
                {project.demo && <TextLink href={project.demo} direction="up">{project.demoLabel ?? c.demo}</TextLink>}
                {project.repository && <TextLink href={project.repository} direction="up">{c.source}</TextLink>}
              </div>
            </div>
          </div>
        </header>
        <figure className="project-figure">
          <div className="project-art"><div className="project-screen"><Picture image={project.image} sizes="(max-width: 700px) 92vw, (max-width: 1240px) 86vw, 1050px" eager /></div></div>
          <figcaption>{project.title} · {c.screenshot}</figcaption>
        </figure>
        <div className="case-sections">
          {project.sections.map(section => (
            <section key={section.title} data-reveal><h2>{section.title}</h2><p>{section.body}</p></section>
          ))}
        </div>
      </article>
      <section className="wrap section related" aria-labelledby="related-title">
        <h2 id="related-title">{c.moreSelected}</h2>
        <ul>{related.map(item => <li key={item.slug}><TextLink href={localizedPath("/work/" + item.slug, language)}>{item.title}</TextLink></li>)}</ul>
      </section>
    </>
  );
}
