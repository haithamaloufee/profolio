import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";
import { localizedPath } from "./content.js";
import { personal, siteUrl, socialLinks } from "./data/profile.js";
import { contentByLanguage, languages, notFoundRoute, resolveRoute, routes } from "./routes.js";

export { routes };

const homeUrl = siteUrl + "/";
const personId = homeUrl + "#haitham";

function profileSchema(route) {
  const { profile } = contentByLanguage[route.language];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person", "@id": personId,
        name: personal.name, alternateName: contentByLanguage.ar.copy.name, url: homeUrl,
        jobTitle: profile.title, description: profile.bio,
        image: siteUrl + "/media/haitham-960.jpg",
        sameAs: [socialLinks.github, socialLinks.linkedin],
      },
      {
        "@type": "WebSite", "@id": homeUrl + "#website",
        name: personal.name, alternateName: contentByLanguage.ar.copy.name, url: homeUrl, inLanguage: languages,
        publisher: { "@id": personId },
      },
    ],
  };
}

function alternateUrls(basePath) {
  return [
    ...languages.map(language => [language, siteUrl + localizedPath(basePath, language)]),
    ["x-default", siteUrl + basePath],
  ];
}

function Metadata({ route, review }) {
  const ar = route.language === "ar";
  const canonical = route.path && siteUrl + route.path;
  const indexable = canonical && !review;
  const image = siteUrl + (ar ? "/og-image-ar.png" : "/og-image.png");
  const imageAlt = ar ? "صورة هيثم العوفي بجانب اسم موقعه" : "Haitham Aloufee’s portrait alongside his portfolio wordmark";
  return (
    <>
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      {!indexable && <meta name="robots" content="noindex, nofollow" />}
      {indexable && <>
        <link rel="canonical" href={canonical} />
        {alternateUrls(route.basePath).map(([language, url]) => <link key={language} rel="alternate" hrefLang={language} href={url} />)}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={contentByLanguage[route.language].copy.name} />
        <meta property="og:locale" content={ar ? "ar_JO" : "en_US"} />
        <meta property="og:locale:alternate" content={ar ? "en_US" : "ar_JO"} />
        <meta property="og:title" content={route.title} />
        <meta property="og:description" content={route.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={imageAlt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={route.title} />
        <meta name="twitter:description" content={route.description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={imageAlt} />
        {route.page === "home" && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema(route)).replaceAll("<", "\\u003c") }} />}
      </>}
    </>
  );
}

export function renderPage(template, pathname, review, globalFallback = false) {
  const route = resolveRoute(pathname) ?? notFoundRoute(pathname);
  const ar = route.language === "ar";
  const body = renderToStaticMarkup(<App route={route} content={contentByLanguage[route.language]} review={review} />);
  const arabicMissing = notFoundRoute("/ar/404");
  const fallback = globalFallback ? renderToStaticMarkup(
    <template id="arabic-missing"><App route={arabicMissing} content={contentByLanguage.ar} /></template>
  ) : "";
  const fallbackScript = globalFallback
    ? '<script>if(location.pathname.startsWith("/ar/")){document.documentElement.lang="ar";document.documentElement.dir="rtl";document.title="الصفحة غير موجودة | هيثم العوفي";document.getElementById("fallback-content").replaceWith(document.getElementById("arabic-missing").content);}</script>'
    : "";
  return {
    status: route.page === "not-found" ? 404 : 200,
    html: template
      .replace('lang="en" dir="ltr"', ar ? 'lang="ar" dir="rtl"' : 'lang="en" dir="ltr"')
      .replace("/fonts/manrope.woff2", ar ? "/fonts/plex-arabic-700.woff2" : "/fonts/manrope.woff2")
      .replace("<!--page-head-->", () => renderToStaticMarkup(<Metadata route={route} review={review} />))
      .replace("<!--page-body-->", () => globalFallback ? '<div id="fallback-content">' + body + "</div>" + fallback + fallbackScript : body),
  };
}

export function searchFiles() {
  const urls = routes.map(route => {
    const alternates = alternateUrls(route.basePath).map(([language, url]) =>
      '<xhtml:link rel="alternate" hreflang="' + language + '" href="' + url + '"/>');
    return "<url><loc>" + siteUrl + route.path + "</loc>" + alternates.join("") + "</url>";
  });
  return {
    "robots.txt": "User-agent: *\nAllow: /\n\nSitemap: " + siteUrl + "/sitemap.xml\n",
    "sitemap.xml": '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + urls.join("\n") + "\n</urlset>\n",
  };
}
