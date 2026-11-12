export function Arrow({ direction = "right", className = "" }) {
  const character = { right: "→", up: "↗", down: "↓", left: "←", top: "↑" }[direction];
  return <span className={"arrow arrow-" + direction + " " + className} aria-hidden="true">{character}</span>;
}

export function TextLink({ href, children, direction = "right", className = "" }) {
  return <a className={"text-link " + className} href={href}>{children}<Arrow direction={direction} /></a>;
}

export function Picture({ image, sizes, eager = false }) {
  const prefix = "/media/" + image.name + "-";
  const srcset = format => image.variants.map(width => prefix + width + "." + format + " " + width + "w").join(", ");
  return (
    <picture style={{ "--image-ratio": image.width + " / " + image.height }}>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img src={prefix + image.variants.at(-1) + ".jpg"} srcSet={srcset("jpg")} sizes={sizes}
        alt={image.alt} width={image.width} height={image.height}
        loading={eager ? "eager" : "lazy"} fetchpriority={eager ? "high" : "auto"} decoding={eager ? undefined : "async"} />
    </picture>
  );
}

export function SectionHeading({ label, title, children, id }) {
  return (
    <header className="section-heading" data-reveal>
      <div><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2></div>
      {children && <div className="section-aside">{children}</div>}
    </header>
  );
}

export function StoryPhoto({ media, caption }) {
  if (!media) return null;
  return (
    <figure className="story-photo">
      <img {...media} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
