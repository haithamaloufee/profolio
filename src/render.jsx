import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";
import { personal, siteUrl, socialLinks } from "./data/profile.js";
import { notFound, resolveRoute, routes } from "./routes.js";

export { routes };

const image = siteUrl + "/og-image.png";
const homeUrl = siteUrl + "/";
const personId = homeUrl + "#haitham";
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": personId,
      name: personal.name, url: homeUrl,
      image: siteUrl + "/media/haitham-960.jpg",
      sameAs: [socialLinks.github, socialLinks.linkedin],
    },
    {
      "@type": "WebSite", "@id": homeUrl + "#website",
      name: "Haitham Aloufee", url: homeUrl, inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

function Metadata({ route, review }) {
  const canonical = route.path && siteUrl + route.path;
  const indexable = canonical && !review;
  return (
    <>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      {!indexable && <meta name="robots" content="noindex, nofollow" />}
      {indexable && <>
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Haitham Aloufee" />
        <meta property="og:title" content={route.title} />
        <meta property="og:description" content={route.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Haitham Aloufee’s portrait alongside his portfolio wordmark" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={route.title} />
        <meta name="twitter:description" content={route.description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content="Haitham Aloufee’s portrait alongside his portfolio wordmark" />
        {route.page === "home" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replaceAll("<", "\\u003c") }} />}
      </>}
    </>
  );
}

export function renderPage(template, pathname, review) {
  const route = resolveRoute(pathname) ?? notFound;
  return {
    status: route === notFound ? 404 : 200,
    html: template
      .replace("<!--page-head-->", () => renderToStaticMarkup(<Metadata route={route} review={review} />))
      .replace("<!--page-body-->", () => renderToStaticMarkup(<App route={route} review={review} />)),
  };
}

export function searchFiles() {
  const urls = routes.map(route => "<url><loc>" + siteUrl + route.path + "</loc></url>");
  return {
    "robots.txt": "User-agent: *\nAllow: /\n\nSitemap: " + siteUrl + "/sitemap.xml\n",
    "sitemap.xml": '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.join("\n") + "\n</urlset>\n",
  };
}
