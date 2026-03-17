export default function SectionBlock({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="section-block reveal">
      <div className="section-surface">
        <div className="section-heading">
          <p className="section-eyebrow">{eyebrow}</p>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
