import { categories, formatDate } from "../data/credentials.js";
import { credentialMedia } from "../data/credential-media.js";
import { Arrow, TextLink } from "./UI.jsx";
import { localizedPath } from "../content.js";
import { credentialCount } from "../locale-format.js";

function Credential({ item, localPreview, copy: c, language }) {
  const published = credentialMedia[item.id];
  const preview = localPreview ?? (published && {
    src: published.src,
    width: published.width,
    height: published.height,
  });
  const thumb = published?.thumb ?? localPreview?.src;
  const srcSet = published
    ? published.thumb + " " + published.thumbWidth + "w, " + published.src + " " + published.width + "w"
    : undefined;

  return (
    <li className="credential" id={item.id} data-category={item.category} data-search={item.originalIssuer}>
      <details>
        <summary>
          <span className={"credential-cover" + (thumb ? " has-thumb" : "")} aria-hidden="true">
            {thumb
              ? <img src={thumb} srcSet={srcSet} sizes="(max-width: 500px) 78px, (max-width: 780px) 40vw, 340px"
                alt="" width={360} height={175} loading="lazy" decoding="async" />
              : <span>{c.categories[item.category]}</span>}
          </span>
          <span className="credential-main">
            <span className="credential-title">{item.title}</span>
            <span className="credential-issuer">{item.issuer}</span>
          </span>
          <span className="credential-foot">
            <span className="credential-date">{item.issued && <time dateTime={item.issued}>{formatDate(item.issued, false, language)}</time>}</span>
            <span className="credential-cta">{preview ? c.preview : c.details} <Arrow direction="up" /></span>
          </span>
        </summary>
        <div className="credential-detail">
          <dl>
            <div><dt>{c.issuer}</dt><dd>{item.issuer}</dd></div>
            <div><dt>{c.type}</dt><dd>{item.kind}</dd></div>
            <div><dt>{c.category}</dt><dd>{c.categories[item.category]}</dd></div>
            <div><dt>{c.issued}</dt><dd>{item.issued ? <time dateTime={item.issued}>{formatDate(item.issued, true, language)}</time> : c.unknownDate}</dd></div>
            {item.expires && <div><dt>{c.expiry}</dt><dd><time dateTime={item.expires}>{formatDate(item.expires, true, language)}</time></dd></div>}
          </dl>
          {item.officialTitle && <p className="official-title">{c.officialTitle} <bdi lang="en">{item.officialTitle}</bdi></p>}
          {item.description && <p>{item.description}</p>}
          {preview && <figure className="certificate-preview">
            <img {...preview} alt={c.excerptAlt(item.title)} loading="lazy" decoding="async" />
            <figcaption>{localPreview ? c.localExcerpt : c.excerpt}</figcaption>
          </figure>}
          {item.verification && <TextLink href={item.verification} direction="up">{c.verify}</TextLink>}
          {item.evidence && !item.verification && <TextLink href={item.evidence} direction="up">{c.linkedIn}</TextLink>}
          {!preview && !item.evidence && !item.verification && <p className="muted">{c.reviewed}</p>}
        </div>
      </details>
    </li>
  );
}

export function Credentials({ content, review }) {
  const { copy: c, language, credentials } = content;
  return (
    <div className="wrap credential-page">
      <header className="subpage-head credential-head">
        <TextLink className="back-link" href={localizedPath("/", language)} direction="left">{c.home}</TextLink>
        <p className="eyebrow">{c.catalogLabel}</p>
        <h1>{c.credentials}</h1>
        <p className="lede">{c.catalogIntro}</p>
      </header>
      <section className="catalog" aria-label={c.catalog}>
        <form id="credential-filters" className="credential-filters">
          <label htmlFor="credential-search">{c.search}</label>
          <input id="credential-search" type="search" dir="auto" name="q" placeholder={c.placeholder} />
          <fieldset>
            <legend className="sr-only">{c.category}</legend>
            {["All", ...categories].map((category, index) => (
              <label className="filter-option" key={category}>
                <input className="sr-only" type="radio" name="category" value={category} defaultChecked={index === 0} />
                <span>{index === 0 ? c.all : c.categories[category]}</span>
              </label>
            ))}
          </fieldset>
        </form>
        <p className="result-count" id="result-count" role="status">{credentialCount(credentials.length, language)}</p>
        <ul className="credential-list">
          {credentials.map(item => <Credential key={item.id} item={item} copy={c} language={language} localPreview={review?.certificates?.[item.id]} />)}
        </ul>
        <div className="empty-state" id="empty-state" hidden>
          <p>{c.empty}</p>
          <button className="button" type="reset" form="credential-filters">{c.clear} <Arrow /></button>
        </div>
      </section>
      <dialog className="credential-dialog" aria-labelledby="credential-dialog-title">
        <header>
          <h2 id="credential-dialog-title"></h2>
          <form method="dialog"><button type="submit" autoFocus>{c.close}</button></form>
        </header>
        <div className="dialog-content"></div>
      </dialog>
    </div>
  );
}
