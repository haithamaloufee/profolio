import { categories, credentials, formatDate } from "../data/credentials.js";
import { credentialMedia } from "../data/credential-media.js";
import { Arrow, TextLink } from "./UI.jsx";

function Credential({ item, localPreview }) {
  const published = credentialMedia[item.id];
  const preview = localPreview ?? (published && {
    src: published.src,
    width: published.width,
    height: published.height,
    alt: "Certificate excerpt for " + item.title,
  });
  const thumb = published?.thumb ?? localPreview?.src;
  const srcSet = published
    ? published.thumb + " " + published.thumbWidth + "w, " + published.src + " " + published.width + "w"
    : undefined;

  return (
    <li className="credential" id={item.id} data-category={item.category}>
      <details>
        <summary>
          <span className="credential-cover" aria-hidden="true">
            {thumb
              ? <img src={thumb} srcSet={srcSet} sizes="(max-width: 500px) 78px, (max-width: 780px) 40vw, 340px"
                alt="" width={360} height={175} loading="lazy" decoding="async" />
              : <span>{item.category}</span>}
          </span>
          <span className="credential-main">
            <span className="credential-title">{item.title}</span>
            <span className="credential-issuer">{item.issuer}</span>
          </span>
          <span className="credential-foot">
            <span className="credential-date">{item.issued && <time dateTime={item.issued}>{formatDate(item.issued)}</time>}</span>
            <span className="credential-cta">{preview ? "Preview" : "Details"} <Arrow direction="up" /></span>
          </span>
        </summary>
        <div className="credential-detail">
          <dl>
            <div><dt>Issuer</dt><dd>{item.issuer}</dd></div>
            <div><dt>Type</dt><dd>{item.kind}</dd></div>
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Issued</dt><dd>{item.issued ? <time dateTime={item.issued}>{formatDate(item.issued, true)}</time> : "Date unavailable"}</dd></div>
            {item.expires && <div><dt>Valid until</dt><dd><time dateTime={item.expires}>{formatDate(item.expires, true)}</time></dd></div>}
          </dl>
          {item.description && <p>{item.description}</p>}
          {preview && <figure className="certificate-preview">
            <img {...preview} alt={"Certificate excerpt for " + item.title} loading="lazy" decoding="async" />
            <figcaption>{localPreview ? "Certificate crop · local review" : "Certificate excerpt"}</figcaption>
          </figure>}
          {item.verification && <TextLink href={item.verification} direction="up">Verify with the issuer</TextLink>}
          {item.evidence && !item.verification && <TextLink href={item.evidence} direction="up">See public LinkedIn profile</TextLink>}
          {!preview && !item.evidence && !item.verification && <p className="muted">Reviewed against the original certificate.</p>}
        </div>
      </details>
    </li>
  );
}

export function Credentials({ review }) {
  return (
    <div className="wrap credential-page">
      <header className="subpage-head credential-head">
        <TextLink className="back-link" href="/" direction="left">Home</TextLink>
        <p className="eyebrow">Learning &amp; training</p>
        <h1>Credentials<span className="brand-dot">.</span></h1>
        <p className="lede">Certifications, course completions and workshop recognition.</p>
      </header>
      <section className="catalog" aria-label="Credential catalog">
        <form id="credential-filters" className="credential-filters">
          <label htmlFor="credential-search">Search credentials</label>
          <input id="credential-search" type="search" name="q" placeholder="Try Oracle, React or Python" />
          <fieldset>
            <legend className="sr-only">Category</legend>
            {["All", ...categories].map((category, index) => (
              <label className="filter-option" key={category}>
                <input className="sr-only" type="radio" name="category" value={category} defaultChecked={index === 0} />
                <span>{category}</span>
              </label>
            ))}
          </fieldset>
        </form>
        <p className="result-count" id="result-count" role="status">{credentials.length} credentials</p>
        <ul className="credential-list">
          {credentials.map(item => <Credential key={item.id} item={item} localPreview={review?.certificates?.[item.id]} />)}
        </ul>
        <div className="empty-state" id="empty-state" hidden>
          <p>No credentials match your search.</p>
          <button className="button" type="reset" form="credential-filters">Clear filters <Arrow /></button>
        </div>
      </section>
      <dialog className="credential-dialog" aria-labelledby="credential-dialog-title">
        <header>
          <h2 id="credential-dialog-title"></h2>
          <form method="dialog"><button type="submit" autoFocus>Close</button></form>
        </header>
        <div className="dialog-content"></div>
      </dialog>
    </div>
  );
}
