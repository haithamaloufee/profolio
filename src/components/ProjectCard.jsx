export default function ProjectCard({
  label = "Project",
  title,
  description,
  tags = [],
  year,
  imageUrl,
  imageAlt,
  videoUrl,
  liveUrl,
  repoUrl,
  primaryActionLabel = "View Live",
  secondaryActionLabel = "Source Code",
  accent = "gold",
  index = 0,
}) {
  return (
    <article
      className="project-card"
      data-accent={accent}
      style={{ "--card-delay": `${index * 80}ms` }}
    >
      <div className="project-media">
        {videoUrl ? (
          <video
            className="project-preview"
            src={videoUrl}
            poster={imageUrl || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : imageUrl ? (
          <img className="project-preview" src={imageUrl} alt={imageAlt || `${title} preview`} />
        ) : (
          <div className="project-placeholder">
            <span>{label} Preview</span>
            <strong>{title}</strong>
            <p>Add an image or video later in the data file.</p>
          </div>
        )}
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span>{label}</span>
          <span>{year}</span>
        </div>

        <h3>{title}</h3>
        <p>{description}</p>

        <ul className="project-tags" aria-label={`${title} technologies`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-actions">
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noreferrer">
              {primaryActionLabel}
            </a>
          ) : (
            <span className="project-note">Add a live link when this item is ready.</span>
          )}

          {repoUrl ? (
            <a href={repoUrl} target="_blank" rel="noreferrer">
              {secondaryActionLabel}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
