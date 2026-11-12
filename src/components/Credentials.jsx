import { categories, credentials, formatDate } from "../data/credentials.js";
import { Arrow, TextLink } from "./UI.jsx";

const categoriesWithAll = ["All", ...categories];

function Credential({ item, preview }) {
  return (
    <li className="credential" id={item.id} data-category={item.category}>
      <details>
        <summary>
          <span className="credential-main">
            <span className="credential-title">{item.title}</span>
            <span className="credential-issuer">{item.issuer}</span>
          </span>
          <span className="credential-date">{item.issued && <time dateTime={item.issued}>{formatDate(item.issued)}</time>}</span>
          <span className="credential-category">{item.category}</span>
          <span className="expand-icon" aria-hidden="true"></span>
        </summary>
        <div className="credential-detail">
          <dl>
            <div><dt>Type</dt><dd>{item.kind}</dd></div>
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Issued</dt><dd>{item.issued ? <time dateTime={item.issued}>{formatDate(item.issued, true)}</time> : "Date unavailable"}</dd></div>
            {item.expires && <div><dt>Valid until</dt><dd><time dateTime={item.expires}>{formatDate(item.expires, true)}</time></dd></div>}
          </dl>
          {item.description && <p>{item.description}</p>}
          {preview && <figure className="certificate-preview">
            <img {...preview} loading="lazy" decoding="async" />
            <figcaption>Certificate crop · local review</figcaption>
          </figure>}
          {item.evidence && <TextLink href={item.evidence} direction="up">See public LinkedIn profile</TextLink>}
          {!preview && !item.evidence && <p className="muted">Reviewed against the original certificate. Public preview unavailable.</p>}
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
        <p className="lede">Certifications, course completions and workshop recognition across cloud, AI, software development and more.</p>
      </header>
      <section className="catalog" aria-label="Credential catalog">
        <form id="credential-filters" className="credential-filters" hidden>
          <label htmlFor="credential-search">Search credentials</label>
          <input id="credential-search" type="search" name="q" placeholder="Try Oracle, React or Python" />
          <fieldset>
            <legend className="sr-only">Category</legend>
            {categoriesWithAll.map((category, index) => (
              <label className="filter-option" key={category}>
                <input className="sr-only" type="radio" name="category" value={category} defaultChecked={index === 0} />
                <span>{category}</span>
              </label>
            ))}
          </fieldset>
        </form>
        <p className="result-count" id="result-count" role="status">{credentials.length} credentials</p>
        <ul className="credential-list">
          {credentials.map(item => <Credential key={item.id} item={item} preview={review?.certificates?.[item.id]} />)}
        </ul>
        <div className="empty-state" id="empty-state" hidden>
          <p>No credentials match your search.</p>
          <button className="button" type="reset" form="credential-filters">Clear filters <Arrow /></button>
        </div>
      </section>
    </div>
  );
}
